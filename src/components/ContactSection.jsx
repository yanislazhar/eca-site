import { useState } from 'react'
import { Globe, Send } from 'lucide-react'

export function ContactSection() {
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const isSubmitting = status === 'submitting'

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('submitting')
    setFeedback('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(result.message || 'Impossible d’envoyer le message.')
      }

      form.reset()
      setStatus('success')
      setFeedback(result.message || 'Message envoyé avec succès.')
    } catch (error) {
      setStatus('error')
      setFeedback(
        error instanceof Error
          ? error.message
          : 'Impossible d’envoyer le message pour le moment.',
      )
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#2E7032] py-16 md:py-24 lg:py-32">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4CAF50] rounded-l-full opacity-10 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623] rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p id="contact" className="section-anchor eca-kicker eca-kicker--accent">
              Contact
            </p>
            <h2 className="eca-section-title eca-section-title--light mb-6 md:mb-8">
              Construisons ensemble.
            </h2>
            <div className="eca-title-bar eca-title-bar--accent mb-6 md:mb-8" />
            <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-white/80 md:mb-12 md:text-lg lg:text-xl">
              Vous avez un projet pour votre collectivité ou souhaitez rejoindre notre réseau ?
              Envoyez-nous un message et notre équipe vous recontactera dans les plus brefs délais.
            </p>
            <div className="flex flex-col gap-6 text-white/90">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Globe className="text-[#F5A623]" size={24} aria-hidden />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#F5A623]">
                    Bureau National
                  </p>
                  <p className="text-lg">Alger, Algérie</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Entreprise</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-bold text-[#111111] uppercase tracking-wider ml-1"
                  >
                    Nom Complet
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Votre nom"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all text-[#111111]"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-bold text-[#111111] uppercase tracking-wider ml-1"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="votre@email.com"
                    required
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all text-[#111111]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-bold text-[#111111] uppercase tracking-wider ml-1"
                >
                  Sujet
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  placeholder="Objet de votre message"
                  required
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all text-[#111111]"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-bold text-[#111111] uppercase tracking-wider ml-1"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Comment pouvons-nous vous accompagner ?"
                  required
                  minLength={20}
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all text-[#111111] resize-none"
                />
              </div>
              {feedback && (
                <p
                  className={`rounded-2xl px-5 py-4 text-sm font-semibold ${
                    status === 'success'
                      ? 'bg-green-50 text-[#2E7032]'
                      : 'bg-red-50 text-red-700'
                  }`}
                  role="status"
                  aria-live="polite"
                >
                  {feedback}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#4CAF50] hover:bg-[#2E7032] disabled:cursor-not-allowed disabled:opacity-70 text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#4CAF50]/20"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}{' '}
                <Send size={20} aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
