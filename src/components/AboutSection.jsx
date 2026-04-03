import { Quote, History } from 'lucide-react'
import { images, roadmapSteps } from '../data/siteContent'

export function AboutSection() {
  return (
    <section id="apropos" className="py-24 md:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-[#4CAF50] font-bold tracking-widest uppercase mb-4 text-sm">
            À propos de l&apos;association ECA
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold text-[#111111] tracking-tight leading-tight max-w-4xl">
            L&apos;expertise humaine au cœur de la transition.
          </h3>
          <div className="w-20 h-1 bg-[#4CAF50] mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              Fondée en 2018, <strong>Energy Cities Algeria (ECA)</strong> est devenue le pilier
              national pour l&apos;accompagnement des collectivités locales algériennes vers un
              développement durable.
            </p>

            <div className="relative p-8 md:p-10 bg-[#f9f9f9] rounded-3xl border-l-8 border-[#F5A623] shadow-sm">
              <Quote className="absolute top-4 right-6 text-gray-200 w-12 h-12 opacity-50" />
              <h4 className="font-bold text-[#111111] mb-4 text-xl flex items-center gap-3 relative z-10">
                Le mot du Président
              </h4>
              <p className="text-gray-600 text-lg italic leading-relaxed relative z-10">
                « Notre engagement est de bâtir un avenir où l&apos;essor de nos cités algériennes
                s&apos;harmonise avec la préservation de la planète. Nous agissons comme un pont
                international pour infuser le changement énergétique au cœur de nos territoires. »
              </p>
              <div className="mt-6 font-bold text-[#111111]">Hasni Sid Ali</div>
            </div>
          </div>

          <div className="lg:col-span-7 relative group">
            <div className="overflow-hidden rounded-3xl shadow-2xl relative aspect-video md:aspect-auto">
              <img
                src={images.aboutTeam}
                alt={"L'équipe Energy Cities Algeria"}
                className="w-full h-full object-cover min-h-[280px] md:min-h-[400px] transition-transform duration-1000 group-hover:scale-105"
                onError={(e) => {
                  const el = e.currentTarget
                  if (!el.dataset.fallback) {
                    el.dataset.fallback = '1'
                    el.src = images.aboutTeamFallback
                  }
                }}
              />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-2xl shadow-xl border border-white/20">
                  <p className="text-[#111111] font-bold text-lg mb-1">Le collectif ECA</p>
                  <p className="text-gray-600 text-sm">
                    Des experts dédiés à la transition énergétique des territoires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-20 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-16 flex items-center gap-4">
              <History className="text-[#4CAF50]" aria-hidden />
              Notre parcours
            </h3>
            <div className="relative border-l-2 border-[#F5A623]/30 ml-4 space-y-12">
              {roadmapSteps.map((step) => (
                <div key={step.year + step.title} className="relative pl-12 group">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-white border-4 border-[#F5A623] group-hover:bg-[#F5A623] transition-colors duration-300" />
                  <div className="text-[#F5A623] font-bold text-xl mb-1">{step.year}</div>
                  <h4 className="text-xl font-bold text-[#111111] mb-3">{step.title}</h4>
                  <p className="text-gray-500 max-w-2xl leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
