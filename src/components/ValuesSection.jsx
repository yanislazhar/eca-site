import { values } from '../data/siteContent'

export function ValuesSection() {
  return (
    <section className="bg-[#111111] py-16 text-white md:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <header className="mb-12 md:mb-20">
          <p className="eca-kicker eca-kicker--on-dark">Valeurs</p>
          <h2 className="eca-section-title eca-section-title--light max-w-4xl">
            Engagement, innovation et collaboration.
          </h2>
          <div className="eca-title-bar eca-title-bar--on-dark" />
        </header>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {values.map((v) => {
            const Icon = v.icon
            return (
              <div
                key={v.title}
                className="border-t border-white/20 pt-8 hover:border-[#4CAF50] transition-all group"
              >
                <div className="mb-6 p-4 bg-[#1A1A1A] inline-block rounded-2xl group-hover:bg-white/5 transition-colors">
                  <Icon style={{ color: v.color }} className="w-8 h-8" aria-hidden />
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-[#B0BEC5] leading-relaxed text-base font-light">{v.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
