import { Resend } from 'resend'
import { randomUUID } from 'node:crypto'

const MAX_FIELD_LENGTHS = {
  name: 120,
  email: 254,
  subject: 160,
  message: 4000,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizeField(value, maxLength) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string') {
    return forwardedFor.split(',')[0]?.trim()
  }

  return req.socket?.remoteAddress
}

function validatePayload(body) {
  const payload = {
    name: normalizeField(body.name, MAX_FIELD_LENGTHS.name),
    email: normalizeField(body.email, MAX_FIELD_LENGTHS.email).toLowerCase(),
    subject: normalizeField(body.subject, MAX_FIELD_LENGTHS.subject),
    message: normalizeField(body.message, MAX_FIELD_LENGTHS.message),
    company: normalizeField(body.company, 120),
  }

  if (payload.company) {
    return { payload, error: 'Votre message n’a pas pu être envoyé.' }
  }

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return { payload, error: 'Merci de remplir tous les champs obligatoires.' }
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return { payload, error: 'Merci de saisir une adresse email valide.' }
  }

  if (payload.message.length < 20) {
    return { payload, error: 'Merci de détailler votre message en quelques mots.' }
  }

  return { payload, error: null }
}

function buildEmailHtml({ name, email, subject, message }, req) {
  const submittedAt = new Date().toLocaleString('fr-DZ', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Africa/Algiers',
  })

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    subject: escapeHtml(subject),
    message: escapeHtml(message).replaceAll('\n', '<br />'),
    submittedAt: escapeHtml(submittedAt),
    ip: escapeHtml(getClientIp(req) ?? 'Non disponible'),
  }

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.6;">
      <h1 style="color: #2E7032;">Nouveau message depuis le site Energy Cities Algeria</h1>
      <p><strong>Date :</strong> ${safe.submittedAt}</p>
      <p><strong>Nom :</strong> ${safe.name}</p>
      <p><strong>Email :</strong> ${safe.email}</p>
      <p><strong>Sujet :</strong> ${safe.subject}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
      <p><strong>Message :</strong></p>
      <p>${safe.message}</p>
      <hr style="border: 0; border-top: 1px solid #e5e7eb;" />
      <p style="font-size: 12px; color: #6b7280;">IP détectée : ${safe.ip}</p>
    </div>
  `
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Méthode non autorisée.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL || 'energycitiesalgeria@gmail.com'

  if (!apiKey || !fromEmail) {
    return res.status(500).json({
      message: 'Le service de contact n’est pas encore configuré.',
    })
  }

  const { payload, error: validationError } = validatePayload(req.body ?? {})

  if (validationError) {
    return res.status(400).json({ message: validationError })
  }

  const resend = new Resend(apiKey)
  const idempotencyKey = `contact/${Date.now()}/${randomUUID()}`

  const { error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    replyTo: payload.email,
    subject: `[ECA] ${payload.subject}`,
    html: buildEmailHtml(payload, req),
    text: [
      'Nouveau message depuis le site Energy Cities Algeria',
      '',
      `Nom: ${payload.name}`,
      `Email: ${payload.email}`,
      `Sujet: ${payload.subject}`,
      '',
      payload.message,
    ].join('\n'),
    idempotencyKey,
  })

  if (error) {
    return res.status(502).json({
      message: 'Impossible d’envoyer le message pour le moment.',
    })
  }

  return res.status(200).json({ message: 'Message envoyé avec succès.' })
}
