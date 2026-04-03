import { CheckCircle2 } from 'lucide-react'
import { visionBlocks } from '../data/siteContent'

export function VisionMissions() {
  return (
    <section className="bg-gradient-to-b from-[#f9f9f9] via-[#fcfcfc] to-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        <header className="mb-12 max-w-3xl md:mb-16">
          <p className="eca-kicker">Axes stratégiques</p>
          <h2 className="eca-section-title">Vision, missions et objectifs</h2>
          <div className="eca-title-bar" />
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          {visionBlocks.map((box) => {
            const Icon = box.icon
            return (
              <div
                key={box.title}
                className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8"
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: box.bg }}
                >
                  <Icon className="h-7 w-7" style={{ color: box.color }} aria-hidden />
                </div>
                <h3
                  className="mb-2 text-sm font-bold uppercase tracking-widest"
                  style={{ color: box.color }}
                >
                  {box.title}
                </h3>
                <p className="mb-6 text-xl font-bold text-[#111111] sm:text-2xl">{box.subtitle}</p>
                <ul className="space-y-4 flex-grow">
                  {box.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle2
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: box.color }}
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
