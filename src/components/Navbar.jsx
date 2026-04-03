import { Menu, X } from 'lucide-react'
import { brand, colors } from '../data/siteContent'

export function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:px-12">
        <a href="#accueil" className="group flex min-w-0 max-w-[65%] items-center gap-2 sm:gap-3 md:max-w-none">
          <img
            src={brand.logo}
            alt={brand.logoAlt}
            className={`h-10 max-h-12 w-auto object-contain object-left transition-opacity sm:h-12 md:h-14 md:max-h-16 ${
              isScrolled ? '' : 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]'
            }`}
            decoding="async"
          />
          <span
            className={`hidden min-w-0 max-w-[120px] truncate leading-tight sm:block sm:max-w-[140px] md:max-w-none md:overflow-visible md:whitespace-normal ${
              isScrolled ? 'text-[#111111]' : 'text-white drop-shadow-md'
            } text-xs font-bold tracking-tight md:text-sm`}
          >
            Energy Cities Algeria
          </span>
        </a>

        <div
          className={`hidden md:flex items-center gap-8 font-medium ${
            isScrolled ? 'text-[#111111]' : 'text-white'
          }`}
        >
          <a href="#accueil" className="hover:text-[#4CAF50] transition-colors font-semibold">
            Accueil
          </a>
          <a href="#apropos" className="hover:text-[#4CAF50] transition-colors font-semibold">
            À propos
          </a>
          <a href="#projets" className="hover:text-[#4CAF50] transition-colors font-semibold">
            Réalisations
          </a>
          <a href="#partenaires" className="hover:text-[#4CAF50] transition-colors font-semibold">
            Partenaires
          </a>
          <a
            href="#contact"
            className={`px-6 py-3 rounded-full transition-all duration-300 font-bold ${
              isScrolled
                ? 'bg-[#4CAF50] text-white hover:bg-[#2E7032]'
                : 'bg-white text-[#111111] hover:bg-[#4CAF50] hover:text-white'
            }`}
          >
            Nous Contacter
          </a>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] md:hidden"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileMenuOpen((o) => !o)}
          style={{ color: isScrolled || mobileMenuOpen ? colors.dark : colors.white }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 top-full flex max-h-[min(70dvh,calc(100dvh-5rem))] w-full flex-col gap-6 overflow-y-auto border-t border-gray-100 bg-white p-6 text-lg font-medium text-[#111111] shadow-xl md:hidden">
          <a href="#accueil" onClick={() => setMobileMenuOpen(false)}>
            Accueil
          </a>
          <a href="#apropos" onClick={() => setMobileMenuOpen(false)}>
            À propos
          </a>
          <a href="#projets" onClick={() => setMobileMenuOpen(false)}>
            Réalisations
          </a>
          <a href="#partenaires" onClick={() => setMobileMenuOpen(false)}>
            Partenaires
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#4CAF50] font-semibold"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  )
}
