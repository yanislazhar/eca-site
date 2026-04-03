import { scrollingPartners } from '../data/siteContent'

const duplicated = [...scrollingPartners, ...scrollingPartners, ...scrollingPartners, ...scrollingPartners]

export function PartnersSection() {
  return (
    <section id="partenaires" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-[#4CAF50] font-bold tracking-widest uppercase mb-4 text-sm">Réseau</h2>
        <h3 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight">
          Nos partenaires engagés
        </h3>
      </div>

      <div className="w-full overflow-hidden bg-[#f9f9f9] py-16 border-y border-gray-100">
        <div className="animate-scroll" role="list" aria-label="Partenaires">
          {duplicated.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              role="listitem"
              className="mx-12 md:mx-24 text-4xl md:text-6xl font-black text-gray-300 hover:text-[#4CAF50] transition-colors cursor-default uppercase tracking-tighter italic whitespace-nowrap"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
