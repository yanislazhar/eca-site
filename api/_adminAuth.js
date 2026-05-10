import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'eca_admin_session'
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD
}

function sign(value) {
  const secret = getSecret()
  if (!secret) return ''

  return createHmac('sha256', secret).update(value).digest('hex')
}

function safeCompare(a, b) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)

  if (aBuffer.length !== bBuffer.length) {
    return false
  }

  return timingSafeEqual(aBuffer, bBuffer)
}

function getCookie(req, name) {
  const cookieHeader = req.headers.cookie
  if (!cookieHeader) return ''

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim())
  const cookie = cookies.find((item) => item.startsWith(`${name}=`))

  return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : ''
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret())
}

export function verifyPassword(password) {
  const expectedPassword = process.env.ADMIN_PASSWORD
  if (!expectedPassword) return false

  return safeCompare(sign(password), sign(expectedPassword))
}

export function createSessionCookie() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS
  const nonce = randomBytes(12).toString('hex')
  const payload = `${expiresAt}.${nonce}`
  const token = `${payload}.${sign(payload)}`
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''

  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DURATION_SECONDS}${secure}`
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

export function isAuthenticated(req) {
  if (!isAdminConfigured()) return false

  const token = getCookie(req, COOKIE_NAME)
  const [expiresAt, nonce, signature] = token.split('.')

  if (!expiresAt || !nonce || !signature) {
    return false
  }

  if (Number(expiresAt) < Math.floor(Date.now() / 1000)) {
    return false
  }

  return safeCompare(sign(`${expiresAt}.${nonce}`), signature)
}

export function requireAdmin(req, res) {
  if (isAuthenticated(req)) {
    return true
  }

  res.status(401).json({ message: 'Connexion administrateur requise.' })
  return false
}

export function parseJsonBody(req) {
  if (!req.body) return {}
  if (typeof req.body === 'string') return JSON.parse(req.body)
  return req.body
}
