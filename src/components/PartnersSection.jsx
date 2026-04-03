import { partners } from '../data/siteContent'

const duplicated = [...partners, ...partners, ...partners, ...partners]

export function PartnersSection() {
  return (
    <section className="border-t border-gray-100 bg-white py-16 md:py-24">
      <header className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 md:mb-20 md:px-12">
        <p id="partenaires" className="section-anchor eca-kicker">
          Réseau
        </p>
        <h2 className="eca-section-title">Nos partenaires</h2>
        <div className="eca-title-bar" />
      </header>

      <div className="w-full overflow-hidden bg-[#f9f9f9] py-16 border-y border-gray-100">
        <div className="animate-scroll items-center" role="list" aria-label="Partenaires">
          {duplicated.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              role="listitem"
              className="mx-10 flex h-16 min-w-[140px] items-center justify-center md:mx-20 md:h-20 md:min-w-[180px]"
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="max-h-14 md:max-h-16 w-auto max-w-[200px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
