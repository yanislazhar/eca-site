import { CheckCircle2 } from 'lucide-react'
import { visionBlocks } from '../data/siteContent'

export function VisionMissions() {
  return (
    <section className="py-24 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {visionBlocks.map((box) => {
            const Icon = box.icon
            return (
              <div
                key={box.title}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full transition-all hover:shadow-md"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: box.bg }}
                >
                  <Icon className="h-7 w-7" style={{ color: box.color }} aria-hidden />
                </div>
                <h4
                  className="font-bold tracking-widest uppercase mb-3 text-sm"
                  style={{ color: box.color }}
                >
                  {box.title}
                </h4>
                <h3 className="text-2xl font-bold text-[#111111] mb-6">{box.subtitle}</h3>
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
