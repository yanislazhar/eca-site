import { useEffect, useState } from 'react'
import { LogOut, Plus, Trash2, Upload } from 'lucide-react'
import { editableImageSlots } from '../data/siteContent'
import {
  getAdminCmsContent,
  removeNewsPost,
  saveCmsContent,
  uploadCmsImage,
  upsertNewsPost,
} from '../lib/cmsContent'

const inputClass =
  'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-[#111111] transition-all focus:border-[#4CAF50] focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10'

const emptyPost = {
  id: '',
  title: '',
  excerpt: '',
  body: '',
  image: '',
  publishedAt: new Date().toISOString().slice(0, 10),
  isPublished: true,
}

export function AdminDashboard() {
  const [sessionReady, setSessionReady] = useState(false)
  const [content, setContent] = useState({ siteImages: {}, newsPosts: [] })
  const [post, setPost] = useState(emptyPost)
  const [postImageFile, setPostImageFile] = useState(null)
  const [busy, setBusy] = useState('')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (!data.authenticated) {
          window.location.assign('/admin/login')
          return
        }

        setSessionReady(true)
        loadContent()
      })
      .catch(() => {
        window.location.assign('/admin/login')
      })
  }, [])

  async function loadContent() {
    try {
      setBusy('loading')
      const nextContent = await getAdminCmsContent()
      setContent(nextContent)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Impossible de charger le contenu.')
    } finally {
      setBusy('')
    }
  }

  async function handleMediaUpload(slot, file) {
    if (!file) return

    try {
      setBusy(slot.key)
      setFeedback('')
      const url = await uploadCmsImage(file, 'site-media')
      const nextContent = {
        ...content,
        siteImages: { ...content.siteImages, [slot.key]: url },
      }
      const savedContent = await saveCmsContent(nextContent)
      setContent(savedContent)
      setFeedback(`${slot.label} mise à jour.`)
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Impossible de modifier cette photo.')
    } finally {
      setBusy('')
    }
  }

  async function handlePostSubmit(event) {
    event.preventDefault()

    try {
      setBusy('news')
      setFeedback('')
      const image = postImageFile ? await uploadCmsImage(postImageFile, 'news') : post.image

      if (!image) {
        throw new Error('Merci d’ajouter une image pour cette actualité.')
      }

      const nextContent = {
        ...content,
        newsPosts: upsertNewsPost(content.newsPosts, { ...post, image }),
      }
      const savedContent = await saveCmsContent(nextContent)
      setPost(emptyPost)
      setPostImageFile(null)
      setContent(savedContent)
      setFeedback('Actualité enregistrée.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Impossible d’enregistrer l’actualité.')
    } finally {
      setBusy('')
    }
  }

  async function handleDeletePost(id) {
    if (!window.confirm('Supprimer cette actualité ?')) return

    try {
      setBusy(id)
      setFeedback('')
      const nextContent = {
        ...content,
        newsPosts: removeNewsPost(content.newsPosts, id),
      }
      const savedContent = await saveCmsContent(nextContent)
      setContent(savedContent)
      setFeedback('Actualité supprimée.')
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'Impossible de supprimer l’actualité.')
    } finally {
      setBusy('')
    }
  }

  async function handleSignOut() {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'include',
    })
    window.location.assign('/admin/login')
  }

  if (!sessionReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f9f9f9] px-4">
        <p className="font-semibold text-gray-600">Chargement de l’administration...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f9f9f9] px-4 py-8 text-[#111111] sm:px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 rounded-[2rem] bg-[#111111] p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5A623]">
              Administration ECA
            </p>
            <h1 className="text-3xl font-bold">Photos & actualités</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition-colors hover:bg-white/10"
            >
              Voir le site
            </a>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#111111] transition-colors hover:bg-gray-100"
            >
              <LogOut size={16} aria-hidden /> Déconnexion
            </button>
          </div>
        </header>

        {feedback && (
          <p className="mb-8 rounded-2xl bg-white p-4 text-sm font-semibold text-[#2E7032] shadow-sm">
            {feedback}
          </p>
        )}

        <section className="mb-10 rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
          <p className="eca-kicker">Photos du site</p>
          <h2 className="mb-8 text-2xl font-bold">Images principales</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {editableImageSlots.map((slot) => (
              <article key={slot.key} className="rounded-3xl border border-gray-100 p-4">
                <img
                  src={content.siteImages[slot.key]}
                  alt={slot.label}
                  className="mb-4 aspect-video w-full rounded-2xl object-cover"
                />
                <h3 className="mb-1 font-bold">{slot.label}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{slot.description}</p>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#4CAF50] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2E7032]">
                  <Upload size={16} aria-hidden />
                  {busy === slot.key ? 'Envoi...' : 'Remplacer'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={busy === slot.key}
                    onChange={(event) => handleMediaUpload(slot, event.target.files?.[0])}
                  />
                </label>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8">
            <p className="eca-kicker">Actualités</p>
            <h2 className="mb-8 text-2xl font-bold">Articles publiés</h2>
            <div className="space-y-5">
              {content.newsPosts.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col gap-4 rounded-3xl border border-gray-100 p-4 md:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-video w-full rounded-2xl object-cover md:w-52"
                  />
                  <div className="flex-1">
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4CAF50]">
                      {item.isPublished ? 'Publié' : 'Brouillon'} · {item.publishedAt}
                    </p>
                    <h3 className="mb-2 font-bold">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.excerpt}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPost(item)
                          setPostImageFile(null)
                        }}
                        className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold transition-colors hover:bg-gray-200"
                      >
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(item.id)}
                        disabled={busy === item.id}
                        className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60"
                      >
                        <Trash2 size={14} aria-hidden /> Supprimer
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <form
            className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8"
            onSubmit={handlePostSubmit}
          >
            <p className="eca-kicker">{post.id ? 'Modifier' : 'Ajouter'}</p>
            <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">
              <Plus size={22} aria-hidden /> Actualité
            </h2>
            <div className="space-y-5">
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider">Titre</span>
                <input
                  className={inputClass}
                  value={post.title}
                  onChange={(event) => setPost({ ...post, title: event.target.value })}
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider">Résumé</span>
                <textarea
                  className={inputClass}
                  rows={3}
                  value={post.excerpt}
                  onChange={(event) => setPost({ ...post, excerpt: event.target.value })}
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider">Texte</span>
                <textarea
                  className={inputClass}
                  rows={5}
                  value={post.body}
                  onChange={(event) => setPost({ ...post, body: event.target.value })}
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider">Date</span>
                <input
                  type="date"
                  className={inputClass}
                  value={post.publishedAt}
                  onChange={(event) => setPost({ ...post, publishedAt: event.target.value })}
                  required
                />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider">Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className={inputClass}
                  onChange={(event) => setPostImageFile(event.target.files?.[0] ?? null)}
                />
              </label>
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={post.isPublished}
                  onChange={(event) => setPost({ ...post, isPublished: event.target.checked })}
                  className="h-5 w-5 accent-[#4CAF50]"
                />
                Publier sur le site
              </label>
              <button
                type="submit"
                disabled={busy === 'news'}
                className="w-full rounded-2xl bg-[#4CAF50] px-6 py-4 font-bold text-white transition-colors hover:bg-[#2E7032] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {busy === 'news' ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              {post.id && (
                <button
                  type="button"
                  onClick={() => {
                    setPost(emptyPost)
                    setPostImageFile(null)
                  }}
                  className="w-full rounded-2xl bg-gray-100 px-6 py-4 font-bold text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Annuler la modification
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
