import { useEffect, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import CTAButton from '../components/CTAButton'
import Testimonials from '../components/Testimonials'
import WhyPartner from '../components/WhyPartner'

export default function Home() {
  const [navBackground, setNavBackground] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  // Hero parallax — background image drifts up slower than scroll
  const heroRef = useScroll()
  const heroBgY = useTransform(heroRef.scrollY, [0, 800], [0, reduceMotion ? 0 : 180])
  const heroBgScale = useTransform(heroRef.scrollY, [0, 800], [1, reduceMotion ? 1 : 1.12])
  const heroFade = useTransform(heroRef.scrollY, [0, 500], [1, reduceMotion ? 1 : 0.25])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        // Get the hero section height (viewport height)
        const heroHeight = window.innerHeight
        // Set background when scrolled past hero section
        setNavBackground(window.scrollY > heroHeight * 0.8)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  // SEO: Update document title dynamically
  useEffect(() => {
    document.title = 'AI Marketing Agency Australia | No Agency Fees | High ROI Meta Ads | Monsta Media'
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden" role="main">
      {/* Navigation Hint */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 transition-colors duration-300 ${navBackground ? 'bg-black/85 backdrop-blur-xl shadow-lg shadow-pink-500/10 border-b border-pink-500/20' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Brand Logo" className="h-6 md:h-8 w-auto" loading="eager" />
        </div>

        {/* Scrolling Marquee - Hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-8 overflow-hidden nav-marquee-wrap" style={{ marginRight: '24px', minWidth: 0 }}>
          <div className="marquee-track nav-marquee-track">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`b${i}`} className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            ))}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 items-center" style={{ paddingRight: '0px' }}>
          <button
            onClick={() => handleNavigation('/services')}
            className="text-sm font-medium relative group transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            Services
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ff1493', boxShadow: '0 0 8px #ff1493' }}></span>
          </button>
          <button
            onClick={() => handleNavigation('/crm')}
            className="text-sm font-medium relative group transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            CRM
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ff1493', boxShadow: '0 0 8px #ff1493' }}></span>
          </button>
          <button
            onClick={() => handleNavigation('/finance')}
            className="text-sm font-medium relative group transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            Finance
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ff1493', boxShadow: '0 0 8px #ff1493' }}></span>
          </button>
          <button
            onClick={() => handleNavigation('/about')}
            className="text-sm font-medium relative group transition-colors"
            style={{ color: 'rgba(255,255,255,0.8)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >
            About Us
            <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ backgroundColor: '#ff1493', boxShadow: '0 0 8px #ff1493' }}></span>
          </button>

          <CTAButton
            text="Start Now"
            variant="primary"
            size="xs"
            ripple
            magnetic
            onClick={() => window.open('https://calendar.monstamediaparramatta.com/calendar', '_blank')}
          />
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 z-50"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative z-50 flex flex-col items-center justify-center h-full gap-8">
            <button
              onClick={() => { handleNavigation('/services'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              Services
            </button>
            <button
              onClick={() => { handleNavigation('/crm'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              CRM
            </button>
            <button
              onClick={() => { handleNavigation('/finance'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              Finance
            </button>
            <button
              onClick={() => { handleNavigation('/about'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              About Us
            </button>
            <CTAButton
              text="Start Now"
              variant="primary"
              size="md"
              ripple
              magnetic
              onClick={() => { window.open('https://calendar.monstamediaparramatta.com/calendar', '_blank'); setMobileMenuOpen(false); }}
            />
          </nav>
        </div>
      )}

      {/* Hero Section — Neon HUD */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-4 md:px-6 pt-20 md:pt-20 pb-12 md:pb-16 overflow-hidden" aria-labelledby="hero-heading">
        {/* Hero Background Image with scroll parallax */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/images/hero-bg.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
            y: heroBgY,
            scale: heroBgScale,
            willChange: 'transform',
          }}
          role="img"
          aria-label="Digital marketing agency office background"
        />
        {/* Dark gradient veil for legibility */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/40 to-black" aria-hidden="true" />
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: heroFade }} aria-hidden="true" />

        {/* Hero HUD grid floor */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] opacity-60" style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 100%, black 10%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 100%, black 10%, transparent 75%)' }}>
          <div className="hud-grid absolute inset-x-0 bottom-0" style={{ height: '55%' }} />
        </div>

        {/* Stronger drifting brand blobs behind hero text (gradient falloff — no CSS blur, cheaper) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="animate-blob absolute w-[480px] h-[480px] rounded-full"
            style={{ top: '10%', left: '-8%', background: 'radial-gradient(circle, rgba(234,4,139,0.35), transparent 70%)' }} />
          <div className="animate-blob absolute w-[520px] h-[520px] rounded-full"
            style={{ bottom: '0%', right: '-10%', background: 'radial-gradient(circle, rgba(188,19,254,0.3), transparent 70%)', animationDelay: '3s' }} />
          <div className="animate-blob absolute w-[380px] h-[380px] rounded-full"
            style={{ top: '48%', left: '38%', background: 'radial-gradient(circle, rgba(255,20,147,0.25), transparent 70%)', animationDelay: '6s' }} />
        </div>

        <div className="text-center space-y-6 md:space-y-8 max-w-5xl relative z-10 flex-1 flex flex-col justify-center px-4" style={{ paddingTop: '80px' }}>
          {/* HUD label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex justify-center"
          >
            <span className="hud-label inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse-glow inline-block" />
              Australian Owned · No Long Contracts · Direct Point of Contact
            </span>
          </motion.div>

          <motion.h1
            className="font-black tracking-tight leading-tight text-center"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 120px)', letterSpacing: '0.2px' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <span className="text-gradient-animated">Monsta Media Parramatta</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-white/80 mx-auto leading-relaxed text-center"
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          >
            If you can afford $1000/month on ad spend <span className="font-bold text-pink-400 text-glow-blue">for Meta ads</span>.
            <br />
            No agency fees, no hidden costs. Experience our expertise, risk-free.
          </motion.p>

          {/* CTA and Trust Indicators */}
          <motion.div
            className="text-center space-y-4 md:space-y-6 relative z-10 px-4"
            style={{ marginTop: '32px' }}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          >
            {/* CTA */}
            <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
              <CTAButton
                text="Claim Your Free Consultation"
                variant="primary"
                size="lg"
                ripple
                magnetic
                onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink-500 inline-block" />Australian Owned
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink-500 inline-block" />No Long Contracts
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-pink-500 inline-block" />Direct Point of Contact
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee Section */}
        <div className="marquee-row relative w-full z-20 marquee-fade" aria-hidden="true" style={{ height: '80px', padding: '10px 0', boxSizing: 'border-box', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="marquee" style={{ display: 'flex', flexWrap: 'nowrap', width: 'max-content' }}>
            <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', willChange: 'transform' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Digital Marketing with more ROAR!
                </span>
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={`b${i}`} className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Digital Marketing with more ROAR!
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <WhyPartner />

      {/* Testimonials Section */}
      <Testimonials />
    </main>
  )
}
