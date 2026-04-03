import { ArrowRight } from 'lucide-react'
import { images } from '../data/siteContent'

export function Hero() {
  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src={images.hero}
        alt="Ville durable et énergies renouvelables"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
        onError={(e) => {
          const el = e.currentTarget
          if (!el.dataset.fallback) {
            el.dataset.fallback = '1'
            el.src = images.heroFallback
          }
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full mt-20">
        <div className="max-w-4xl text-left">
          <h2 className="text-[#F5A623] font-bold tracking-widest uppercase mb-4 text-sm md:text-base flex items-center gap-2 drop-shadow-md">
            <span className="w-8 h-0.5 bg-[#F5A623]" />
            Energy Cities Algeria
          </h2>
          <h1 className="font-hero text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] tracking-tight mb-8 drop-shadow-lg">
            Construisons ensemble <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#81C784]">
              les villes durables de demain.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/95 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-md">
            La référence nationale de la transition énergétique territoriale et de l&apos;efficacité
            énergétique au niveau des collectivités locales algériennes.
          </p>
          <a
            href="#apropos"
            className="inline-flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#2E7032] text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-xl"
          >
            Découvrir notre histoire <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
