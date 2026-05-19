import { parseJsonBody, requireAdmin } from '../_adminAuth.js'
import { uploadImage } from '../_cmsStore.js'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024

function parseDataUrl(dataUrl) {
  const match = /^data:(?<contentType>image\/[a-zA-Z0-9.+-]+);base64,(?<payload>.+)$/.exec(dataUrl)

  if (!match?.groups) {
    throw new Error('Image invalide.')
  }

  return {
    contentType: match.groups.contentType,
    buffer: Buffer.from(match.groups.payload, 'base64'),
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Méthode non autorisée.' })
  }

  if (!requireAdmin(req, res)) return

  try {
    const body = parseJsonBody(req)
    const { contentType, buffer } = parseDataUrl(String(body.dataUrl ?? ''))

    if (buffer.byteLength > MAX_IMAGE_BYTES) {
      return res.status(413).json({ message: 'Image trop lourde. Maximum : 5 Mo.' })
    }

    const url = await uploadImage({
      folder: body.folder,
      fileName: String(body.fileName ?? 'image.jpg'),
      contentType: String(body.contentType ?? contentType),
      buffer,
    })

    return res.status(200).json({ url })
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error ? error.message : 'Impossible d’envoyer cette image.',
    })
  }
}
