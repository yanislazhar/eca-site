import { defaultNewsPosts, images } from '../data/siteContent'

export function getDefaultCmsContent() {
  return {
    siteImages: images,
    newsPosts: defaultNewsPosts,
  }
}

async function fetchJson(url, options) {
  const response = await fetch(url, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue.')
  }

  return data
}

export async function getPublicCmsContent() {
  const fallback = getDefaultCmsContent()

  try {
    const data = await fetchJson('/api/cms-content')
    return data.content ?? fallback
  } catch {
    return fallback
  }
}

export async function getAdminCmsContent() {
  const data = await fetchJson('/api/cms-content?admin=1', {
    credentials: 'include',
  })

  return data.content ?? getDefaultCmsContent()
}

export async function uploadCmsImage(file, folder) {
  if (!file.type.startsWith('image/')) {
    throw new Error('Merci de sélectionner une image.')
  }

  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', () => reject(new Error('Impossible de lire cette image.')))
    reader.readAsDataURL(file)
  })

  const data = await fetchJson('/api/admin/upload-image', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      folder,
      fileName: file.name,
      contentType: file.type,
      dataUrl,
    }),
  })

  return data.url
}

export async function saveCmsContent(content) {
  const data = await fetchJson('/api/cms-content', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })

  return data.content
}

export function upsertNewsPost(posts, post) {
  const nextPost = {
    ...post,
    id: post.id || crypto.randomUUID(),
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    body: post.body.trim(),
    isPublished: Boolean(post.isPublished),
  }

  const existingIndex = posts.findIndex((item) => item.id === nextPost.id)

  if (existingIndex === -1) {
    return [nextPost, ...posts]
  }

  return posts.map((item) => (item.id === nextPost.id ? nextPost : item))
}

export function removeNewsPost(posts, id) {
  return posts.filter((item) => item.id !== id)
}
