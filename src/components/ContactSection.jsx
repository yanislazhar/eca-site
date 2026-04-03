import { Globe, Send } from 'lucide-react'

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#2E7032] overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#4CAF50] rounded-l-full opacity-10 transform translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F5A623] rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              Construisons ensemble.
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-xl leading-relaxed font-light">
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

          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} noValidate>
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
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-[#4CAF50] focus:ring-4 focus:ring-[#4CAF50]/10 transition-all text-[#111111] resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#4CAF50] hover:bg-[#2E7032] text-white py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#4CAF50]/20"
              >
                Envoyer le message <Send size={20} aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
