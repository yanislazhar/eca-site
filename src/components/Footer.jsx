import { brand, socialLinks } from '../data/siteContent'

const footerLinks = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'apropos', label: 'À propos' },
  { id: 'projets', label: 'Réalisations' },
  { id: 'actualites', label: 'Actualités' },
  { id: 'partenaires', label: 'Partenaires' },
]

const socialIconPaths = {
  YouTube:
    'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z',
  LinkedIn:
    'M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.68H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.55V9h3.56v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z',
  Facebook:
    'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.4c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.88v2.27h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z',
}

function SocialIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d={socialIconPaths[name]} />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#111111] pb-10 pt-16 text-white md:pt-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 border-b border-white/10 px-4 pb-12 sm:px-6 md:grid-cols-4 md:gap-12 md:px-12 md:pb-16">
        <div className="flex flex-col items-center gap-6 text-center md:col-span-2 md:items-start md:text-left">
          <img
            src={brand.logo}
            alt={brand.logoAlt}
            className="h-14 w-auto max-w-[220px] object-contain object-center md:h-16 md:object-left"
            decoding="async"
          />
          <p className="mx-auto max-w-sm text-base leading-relaxed text-gray-400 md:mx-0 md:text-lg">
            Energy Cities Algeria. La référence nationale de la transition énergétique locale et du
            développement durable des territoires.
          </p>
          <div className="flex items-center justify-center gap-3 md:justify-start">
            {socialLinks.map(({ name, href }) => {
              return (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Suivre Energy Cities Algeria sur ${name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-300 transition-colors hover:border-[#4CAF50]/60 hover:bg-[#4CAF50]/15 hover:text-white"
                >
                  <SocialIcon name={name} />
                </a>
              )
            })}
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-6">Menu</h4>
          <ul className="space-y-4 text-gray-500">
            {footerLinks.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="hover:text-[#4CAF50] transition-colors font-medium">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6 text-[#F5A623]">Cibles</h4>
          <ul className="space-y-2 text-gray-500 text-sm font-light">
            <li>Collectivités locales</li>
            <li>Décideurs politiques</li>
            <li>Bailleurs internationaux</li>
          </ul>
        </div>
      </div>
      <div className="px-4 pt-8 text-center text-[10px] font-medium uppercase tracking-widest text-gray-600 md:pt-10 md:text-xs">
        Copyright © 2026 Energy Cities Algeria — Tous droits réservés | Réalisation{' '}
        <a
          href="https://daytaii.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 no-underline transition-colors hover:text-[#4CAF50]"
        >
          DAYTAII
        </a>
      </div>
    </footer>
  )
}
