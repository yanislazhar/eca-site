import { brand } from '../data/siteContent'

const footerLinks = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'apropos', label: 'À propos' },
  { id: 'projets', label: 'Réalisations' },
  { id: 'partenaires', label: 'Partenaires' },
]

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
