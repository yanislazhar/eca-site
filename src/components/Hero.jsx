import { ArrowRight } from 'lucide-react'
import { images } from '../data/siteContent'

export function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden"
    >
      <img
        src={images.hero}
        alt="Ville durable et énergies renouvelables"
        className="absolute inset-0 z-0 h-full w-full object-cover object-center brightness-[0.92] contrast-[1.02]"
        onError={(e) => {
          const el = e.currentTarget
          if (!el.dataset.fallback) {
            el.dataset.fallback = '1'
            el.src = images.heroFallback
          }
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/45" />

      <div className="relative z-20 mx-auto mt-20 w-full max-w-7xl px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl text-left">
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F5A623] drop-shadow-md sm:text-sm md:text-base">
            <span className="h-0.5 w-8 bg-[#F5A623]" aria-hidden />
            Energy Cities Algeria
          </p>
          <h1 className="font-hero mb-8 text-3xl font-semibold leading-[1.12] tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-6xl lg:text-7xl">
            Construisons ensemble <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#81C784]">
              les villes durables de demain.
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-base font-medium leading-relaxed text-white/95 drop-shadow-md md:text-lg lg:text-xl">
            La référence nationale de la transition énergétique territoriale et de l&apos;efficacité
            énergétique au niveau des collectivités locales algériennes.
          </p>
          <a
            href="#apropos"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#4CAF50] px-6 py-3.5 text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#2E7032] sm:px-8 sm:py-4 sm:text-lg"
          >
            Découvrir notre histoire <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
