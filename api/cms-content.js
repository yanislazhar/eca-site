import { parseJsonBody, requireAdmin } from './_adminAuth.js'
import { readCmsContent, writeCmsContent } from './_cmsStore.js'

function getPublishedContent(content) {
  if (!content) return null

  return {
    ...content,
    newsPosts: content.newsPosts
      .filter((post) => post.isPublished)
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const content = await readCmsContent()
    const isAdminRequest = req.query?.admin === '1'

    if (isAdminRequest) {
      if (!requireAdmin(req, res)) return
      return res.status(200).json({ content })
    }

    return res.status(200).json({ content: getPublishedContent(content) })
  }

  if (req.method === 'PUT') {
    if (!requireAdmin(req, res)) return

    try {
      const body = parseJsonBody(req)
      const content = await writeCmsContent(body.content)
      return res.status(200).json({ content })
    } catch (error) {
      return res.status(500).json({
        message:
          error instanceof Error ? error.message : 'Impossible d’enregistrer le contenu du site.',
      })
    }
  }

  res.setHeader('Allow', 'GET, PUT')
  return res.status(405).json({ message: 'Méthode non autorisée.' })
}
