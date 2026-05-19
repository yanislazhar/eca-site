import {
  createSessionCookie,
  isAdminConfigured,
  parseJsonBody,
  verifyPassword,
} from '../_adminAuth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Méthode non autorisée.' })
  }

  if (!isAdminConfigured()) {
    return res.status(500).json({
      message: 'ADMIN_PASSWORD doit être configuré dans Vercel.',
    })
  }

  const body = parseJsonBody(req)

  if (!verifyPassword(String(body.password ?? ''))) {
    return res.status(401).json({ message: 'Mot de passe incorrect.' })
  }

  res.setHeader('Set-Cookie', createSessionCookie())
  return res.status(200).json({ authenticated: true })
}
