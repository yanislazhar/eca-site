import { clearSessionCookie } from '../_adminAuth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Méthode non autorisée.' })
  }

  res.setHeader('Set-Cookie', clearSessionCookie())
  return res.status(200).json({ authenticated: false })
}
