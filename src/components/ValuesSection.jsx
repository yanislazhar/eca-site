import { values } from '../data/siteContent'

export function ValuesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-20 gap-8">
          <h4 className="text-[#81C784] font-bold tracking-widest uppercase mb-4 text-sm">
            Nos Valeurs
          </h4>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            Engagement, innovation et collaboration.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
