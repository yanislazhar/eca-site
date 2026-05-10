import { list, put } from '@vercel/blob'
import { randomUUID } from 'node:crypto'

const CONTENT_PATH = 'cms/content.json'

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

  const { blobs } = await list({
    prefix: CONTENT_PATH,
    limit: 1,
  })

  const contentBlob = blobs.find((blob) => blob.pathname === CONTENT_PATH)
  if (!contentBlob) {
    return null
  }

  const response = await fetch(`${contentBlob.url}?v=${Date.now()}`)
  if (!response.ok) {
    return null
  }

  return normalizeContent(await response.json())
}

export async function writeCmsContent(content) {
  if (!isBlobConfigured()) {
    throw new Error('Vercel Blob n’est pas configuré.')
  }

  const normalizedContent = normalizeContent(content)

  await put(CONTENT_PATH, JSON.stringify(normalizedContent, null, 2), {
    access: 'public',
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
    access: 'public',
    contentType,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  })

  return blob.url
}
