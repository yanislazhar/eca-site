import { useState, useEffect } from 'react'
import { AdminDashboard } from './pages/AdminDashboard'
import { AdminLogin } from './pages/AdminLogin'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { AboutSection } from './components/AboutSection'
import { VisionMissions } from './components/VisionMissions'
import { ValuesSection } from './components/ValuesSection'
import { ProjectsSection } from './components/ProjectsSection'
import { NewsSection } from './components/NewsSection'
import { PartnersSection } from './components/PartnersSection'
import { SeoSection } from './components/SeoSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { getDefaultCmsContent, getPublicCmsContent } from './lib/cmsContent'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cmsContent, setCmsContent] = useState(getDefaultCmsContent)
  const path = window.location.pathname

  useEffect(() => {
    if (path.startsWith('/admin')) return

    getPublicCmsContent().then(setCmsContent).catch(() => {
      setCmsContent(getDefaultCmsContent())
    })
  }, [path])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  if (path === '/admin/login') {
    return <AdminLogin />
  }

  if (path === '/admin') {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen overflow-x-hidden font-brand text-[#111111] bg-white selection:bg-[#4CAF50] selection:text-white">
      <Navbar
        isScrolled={isScrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <main>
        <Hero siteImages={cmsContent.siteImages} />
        <AboutSection siteImages={cmsContent.siteImages} />
        <VisionMissions />
        <ValuesSection />
        <ProjectsSection />
        <NewsSection posts={cmsContent.newsPosts} />
        <PartnersSection />
        <SeoSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
