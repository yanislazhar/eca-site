const footerLinks = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'apropos', label: 'À propos' },
  { id: 'projets', label: 'Réalisations' },
  { id: 'partenaires', label: 'Partenaires' },
]

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
        <div className="md:col-span-2 text-center md:text-left">
          <p className="text-gray-400 max-w-sm text-lg leading-relaxed mx-auto md:mx-0">
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
      <div className="text-center pt-10 text-gray-600 text-[10px] md:text-xs uppercase tracking-widest font-medium px-4">
        Copyright © 2026 Energy Cities Algeria All rights reserved | Created by Daytaii
      </div>
    </footer>
  )
}
