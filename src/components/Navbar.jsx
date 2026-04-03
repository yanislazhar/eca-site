import { Menu, X } from 'lucide-react'
import { colors } from '../data/siteContent'

export function Navbar({ isScrolled, mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white py-4 shadow-md' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#accueil" className="flex items-center gap-3 group">
          <div className="h-14 md:h-16 w-14 md:w-16 rounded-2xl bg-[#4CAF50] flex items-center justify-center font-hero font-black text-white text-lg md:text-xl shadow-lg group-hover:bg-[#2E7032] transition-colors">
            ECA
          </div>
          <span
            className={`hidden sm:block font-bold text-sm tracking-tight max-w-[140px] leading-tight ${
              isScrolled ? 'text-[#111111]' : 'text-white drop-shadow-md'
            }`}
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
          className="md:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50]"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMobileMenuOpen((o) => !o)}
          style={{ color: isScrolled || mobileMenuOpen ? colors.dark : colors.white }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col p-6 gap-6 text-lg font-medium text-[#111111] md:hidden border-t border-gray-100">
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
