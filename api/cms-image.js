import { get } from '@vercel/blob'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ message: 'Méthode non autorisée.' })
  }

  const pathname = String(req.query?.path ?? '')

  if (!pathname.startsWith('cms/images/')) {
    return res.status(400).json({ message: 'Image invalide.' })
  }

  const blob = await get(pathname, {
    access: 'private',
  })

  if (!blob?.stream) {
    return res.status(404).json({ message: 'Image introuvable.' })
  }

  const arrayBuffer = await new Response(blob.stream).arrayBuffer()

  res.setHeader('Content-Type', blob.contentType || 'application/octet-stream')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  return res.status(200).send(Buffer.from(arrayBuffer))
}
