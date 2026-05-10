import { get, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'

const CONTENT_PATH = 'cms/content.json'
const BLOB_ACCESS = 'private'

function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN)
}

function normalizeContent(content) {
  return {
    siteImages: content?.siteImages && typeof content.siteImages === 'object' ? content.siteImages : {},
    newsPosts: Array.isArray(content?.newsPosts) ? content.newsPosts : [],
    updatedAt: new Date().toISOString(),
  }
}

export async function readCmsContent() {
  if (!isBlobConfigured()) {
    return null
  }

  const contentBlob = await get(CONTENT_PATH, {
    access: BLOB_ACCESS,
  })

  if (!contentBlob?.stream) {
    return null
  }

  const text = await new Response(contentBlob.stream).text()
  return normalizeContent(JSON.parse(text))
}

export async function writeCmsContent(content) {
  if (!isBlobConfigured()) {
    throw new Error('Vercel Blob n’est pas configuré.')
  }

  const normalizedContent = normalizeContent(content)

  await put(CONTENT_PATH, JSON.stringify(normalizedContent, null, 2), {
    access: BLOB_ACCESS,
    allowOverwrite: true,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
  })

  return normalizedContent
}

export async function uploadImage({ folder, fileName, contentType, buffer }) {
  if (!isBlobConfigured()) {
    throw new Error('Vercel Blob n’est pas configuré.')
  }

  const extension = fileName.split('.').pop()?.toLowerCase() || 'jpg'
  const safeFolder = folder === 'news' ? 'news' : 'site-media'
  const pathname = `cms/images/${safeFolder}/${randomUUID()}.${extension}`
  const blob = await put(pathname, buffer, {
    access: BLOB_ACCESS,
    contentType,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  })

  return `/api/cms-image?path=${encodeURIComponent(blob.pathname)}`
}
