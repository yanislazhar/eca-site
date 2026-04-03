import { Quote, History } from 'lucide-react'
import { images, roadmapSteps } from '../data/siteContent'
import { RoadmapTimeline } from './RoadmapTimeline'

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 lg:py-40 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <header className="mb-12 md:mb-16">
          <p id="apropos" className="section-anchor eca-kicker">
            À propos de l&apos;association ECA
          </p>
          <h2 className="eca-section-title max-w-4xl">
            L&apos;expertise humaine au cœur de la transition.
          </h2>
          <div className="eca-title-bar" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5 flex flex-col gap-10">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
              Fondée en 2018, <strong>Energy Cities Algeria (ECA)</strong> est devenue le pilier
              national pour l&apos;accompagnement des collectivités locales algériennes vers un
              développement durable.
            </p>

            <div className="relative rounded-3xl border-l-8 border-[#F5A623] bg-[#f9f9f9] p-6 shadow-sm sm:p-8 md:p-10">
              <Quote
                className="absolute right-4 top-4 h-12 w-12 text-gray-200 opacity-50 sm:right-6 sm:top-6"
                aria-hidden
              />
              <div className="relative z-10 pr-0 text-center sm:pr-4 sm:text-left">
                <h3 className="mb-3 text-lg font-bold text-[#111111] md:text-xl">
                  Le mot du Président
                </h3>
                <p className="text-sm italic leading-relaxed text-gray-600 md:text-base md:leading-relaxed">
                  « Notre engagement est de bâtir un avenir où l&apos;essor de nos cités algériennes
                  s&apos;harmonise avec la préservation de la planète. Nous agissons comme un pont
                  international pour infuser le changement énergétique au cœur de nos territoires. »
                </p>
              </div>

              <div className="relative z-10 mt-6 flex justify-center sm:justify-end">
                <div className="flex max-w-full items-center gap-3 rounded-2xl border border-gray-200/90 bg-white/95 px-4 py-3 shadow-sm ring-1 ring-black/[0.03] sm:gap-4 sm:px-5 sm:py-3.5">
                  <img
                    src={images.president}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-full object-cover object-center shadow-md ring-2 ring-[#F5A623]/40 sm:h-16 sm:w-16"
                    width={64}
                    height={64}
                    decoding="async"
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#4CAF50] sm:text-xs">
                      Président
                    </p>
                    <p className="font-bold leading-tight text-[#111111] sm:text-lg">Hasni Sid Ali</p>
                  </div>
                </div>
              </div>
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

        <div className="mt-24 border-t border-gray-100 pt-16 md:mt-40 md:pt-20">
          <header className="mb-10 md:mb-14">
            <p className="eca-kicker flex items-center gap-2">
              <History className="h-4 w-4 shrink-0 text-[#4CAF50]" aria-hidden />
              Parcours
            </p>
            <h3 className="eca-section-title">Notre parcours</h3>
            <div className="eca-title-bar eca-title-bar--accent" />
          </header>

          <RoadmapTimeline steps={roadmapSteps} />
        </div>
      </div>
    </section>
  )
}
