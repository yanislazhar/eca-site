import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'

export function AdminLogin() {
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((response) => response.json())
      .then((data) => {
        if (data.authenticated) {
          window.location.assign('/admin')
        }
      })
      .catch(() => {
        // L'admin reste accessible pour tenter une connexion.
      })
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const result = await response.json().catch(() => ({}))
        throw new Error(result.message || 'Connexion impossible.')
      }

      window.location.assign('/admin')
    } catch (loginError) {
      setStatus('error')
      setError(loginError instanceof Error ? loginError.message : 'Connexion impossible.')
    }
  }

  return (
    <main className="min-h-screen bg-[#111111] px-4 py-12 text-white sm:px-6 md:px-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center">
        <section className="w-full rounded-[2rem] border border-white/10 bg-white p-8 text-[#111111] shadow-2xl">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#4CAF50]/10 text-[#2E7032]">
            <Lock size={26} aria-hidden />
          </div>
          <p className="eca-kicker">Administration</p>
          <h1 className="mb-4 text-3xl font-bold">Connexion</h1>
          <p className="mb-8 text-sm leading-relaxed text-gray-600">
            Accès réservé à l’équipe ECA pour modifier les photos principales et les actualités.
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="admin-password"
                className="text-sm font-bold uppercase tracking-wider"
              >
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-[#111111] transition-all focus:border-[#4CAF50] focus:outline-none focus:ring-4 focus:ring-[#4CAF50]/10"
              />
            </div>
            {error && (
              <p className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full rounded-2xl bg-[#4CAF50] px-6 py-4 font-bold text-white transition-colors hover:bg-[#2E7032] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'submitting' ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
