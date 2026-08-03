import { useState, useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'
import { Stagger, StaggerItem } from '../components/Reveal'

export default function Finance() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navBackground, setNavBackground] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setNavBackground(window.scrollY > 10 || window.innerWidth < 768)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // SEO: Update document title
  useEffect(() => {
    document.title = 'Flexible Marketing Finance | No Upfront Costs | Monsta Media Australia'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Flexible marketing finance solutions with no upfront costs. Fast approval, transparent pricing, and Australian-owned support. Grow your business without financial stress.')
    }
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'CRM', path: '/crm' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' },
  ]

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMobileMenuOpen(false)
  }

  const benefits = [
    { title: 'No Upfront Costs', desc: 'Start your marketing campaign without a large initial investment', icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' },
    { title: 'Flexible Terms', desc: 'Choose payment plans that work with your cash flow and budget', icon: 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z' },
    { title: 'Fast Approval', desc: 'Quick and simple application process to get you started immediately', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
    { title: 'Scale as You Grow', desc: 'Adjust your financing as your business expands and evolves', icon: 'M4 20V10m6 10V4m6 16v-7m6 7H2' },
    { title: 'Transparent Pricing', desc: 'No hidden fees or surprises—clear terms from day one', icon: 'M12 3a9 9 0 100 18 9 9 0 000-18zm-1 4h2v7h-2V7zm0 8h2v2h-2v-2z' },
    { title: 'Local Support', desc: 'Australian-owned with dedicated support you can trust', icon: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zm-8-2a2 2 0 100 4 2 2 0 000-4z' },
  ]

  const steps = [
    { step: '01', title: 'Book a Consultation', desc: 'Let us discuss your business goals and marketing needs' },
    { step: '02', title: 'Custom Package Design', desc: 'We build a tailored marketing solution for your business' },
    { step: '03', title: 'Finance Approval', desc: 'We organize flexible financing that fits your budget' },
    { step: '04', title: 'Launch & Grow', desc: 'Your campaign goes live and we track performance together' },
  ]

  const requirements = [
    {
      title: 'Minimum Finance Amount',
      requirement: '$5,000',
      desc: 'Our finance solutions start at $5,000 to ensure meaningful investment in your marketing growth',
    },
    {
      title: 'Business History',
      requirement: '1+ Year',
      desc: 'Your business must have been operating for at least one year to demonstrate stability and commitment',
    },
    {
      title: 'Employment History',
      requirement: '2+ Years',
      desc: 'If self-employed or sole trader, we require at least two years of continuous employment history',
    },
  ]

  const docs = [
    { item: 'Proof of Business Registration', detail: 'ABN or ACN documentation' },
    { item: 'Financial Statements', detail: 'Recent business financial or employment records' },
    { item: 'Identification', detail: 'Driver\'s license or passport' },
  ]

  return (
    <div className="min-h-screen bg-[#030305] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground ? 'bg-black/85 backdrop-blur-xl shadow-lg shadow-pink-500/10 border-b border-pink-500/20' : 'bg-transparent'}`} style={{ contentVisibility: 'auto', containIntrinsicSize: '80px 80px' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="/images/logo.svg"
                alt="Monsta Media"
                className="h-10 w-auto"
                loading="lazy"
              />
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="text-white/80 font-medium relative group transition-colors"
                  style={{
                    textShadow: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  {link.name}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: '#ff1493', boxShadow: '0 0 8px #ff1493' }}
                  ></span>
                </button>
              ))}
              <CTAButton
                text="Book a Call"
                variant="primary"
                size="xs"
                ripple
                magnetic
                onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
              />
            </div>

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
        </div>
      </nav>

      {/* Hardcoded Mobile Overlay Navigation (Home style) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9999 bg-black/95 transition-opacity duration-300"
          style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
        >
          <img
            src="/images/logo.svg"
            alt="Monsta Media"
            className="h-12 w-auto"
            loading="lazy"
            style={{ position: 'absolute', top: 24, left: 24, zIndex: 2 }}
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'none', border: 'none' }}
          >
            <span className="w-6 h-0.5 bg-white transition-all rotate-45 translate-y-2" />
            <span className="w-6 h-0.5 bg-white transition-all opacity-0" />
            <span className="w-6 h-0.5 bg-white transition-all -rotate-45 -translate-y-2" />
          </button>
          <div className="flex flex-col items-center justify-center w-full h-full" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
            <div className="flex flex-col items-center justify-center grow" style={{ width: '100%', maxWidth: '320px', margin: '0 auto', flex: 1, gap: '36px' }}>
              <span onClick={() => { handleNavigation('/'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>Home</span>
              <span onClick={() => { handleNavigation('/services'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>Services</span>
              <span onClick={() => { handleNavigation('/crm'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>CRM</span>
              <span onClick={() => { handleNavigation('/about'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>About Us</span>
              <CTAButton
                text="Start Now"
                variant="primary"
                size="md"
                ripple
                magnetic
                onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
                className="mt-9"
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        {/* HUD grid floor */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-50" style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)' }}>
          <div className="hud-grid absolute inset-x-0 top-0" style={{ height: '60%' }} />
        </div>
        {/* Brand blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="animate-blob absolute w-[420px] h-[420px] rounded-full" style={{ top: '-10%', right: '-8%', background: 'radial-gradient(circle, rgba(188,19,254,0.22), transparent 70%)' }} />
          <div className="animate-blob absolute w-[380px] h-[380px] rounded-full" style={{ bottom: '-20%', left: '-6%', background: 'radial-gradient(circle, rgba(234,4,139,0.2), transparent 70%)', animationDelay: '3s' }} />
        </div>
        <div className="max-w-4xl text-center relative z-10" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.4}>
          <div className="hud-label" style={{ marginBottom: '14px' }}>Flexible Marketing Finance</div>
          <h1 className="font-black mb-6" style={{ fontSize: 'clamp(34px, 6vw, 52px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-1px' }}>
            What Comes First: The <span className="text-gradient-animated" style={{ display: 'inline-block' }}>Budget</span> or the <span className="text-gradient-animated" style={{ display: 'inline-block' }}>Marketing</span>?
          </h1>
          </Reveal>
          <Reveal variant="up" delay={0.15} amount={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '700px' }}>
              Every business needs marketing to grow, but finding the budget can be a challenge. That's where we step in—we can organize flexible financing so you can invest in the marketing your business needs, without the upfront burden.
            </p>
          </div>
          </Reveal>
          <Reveal variant="up" delay={0.28} amount={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
              <CTAButton
                text="Schedule Your Free Consultation"
                variant="primary"
                size="lg"
                ripple
                magnetic
                onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
              />
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Why Finance with Us Section */}
      <section className="relative" style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '900px 900px' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="hud-label" style={{ marginBottom: '10px' }}>Funding Your Growth</div>
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(30px, 5vw, 40px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Why Choose Our Finance Solutions?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              Flexible payment plans designed to help your business grow without financial stress
            </p>
          </div>
          </Reveal>
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }} amount={0.1} gap={0.12}>
            {benefits.map((benefit, idx) => (
              <StaggerItem key={idx}>
              <div className="neon-border-static rounded-2xl" style={{ padding: '40px 32px', backgroundColor: '#0a0a14', borderRadius: '16px', border: '1px solid rgba(255, 20, 147, 0.15)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,20,147,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, margin: '0 auto 16px', borderRadius: 14, background: 'rgba(255,20,147,0.1)', border: '1px solid rgba(255,20,147,0.3)' }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#ff1493" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px rgba(255,20,147,0.6))' }}>
                    <path d={benefit.icon} />
                  </svg>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(255,255,255,0.65)' }}>
                  {benefit.desc}
                </p>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative" style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '700px 700px' }}>
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="hud-label" style={{ marginBottom: '10px' }}>The Process</div>
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(30px, 5vw, 40px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.5px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              Simple steps to unlock the marketing your business deserves
            </p>
          </div>
          </Reveal>
          <Stagger style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }} amount={0.1} gap={0.12}>
            {steps.map((item, idx) => (
              <StaggerItem key={idx} style={{ flex: '1 1 220px', minWidth: '220px', maxWidth: '280px' }}>
              <div className="hud-corners neon-border-static" style={{ position: 'relative', padding: '32px 24px', background: 'rgba(10,10,20,0.9)', borderRadius: '16px', border: '1px solid rgba(255,20,147,0.2)', transition: 'all 0.3s ease', height: '100%' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(20,20,40,0.95)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(10,10,20,0.9)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.2)';
                }}
              >
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#ff1493', fontFamily: 'Montserrat', marginBottom: '16px', opacity: 0.4, textShadow: '0 0 20px rgba(255,20,147,0.4)' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.7)' }}>
                  {item.desc}
                </p>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Finance Requirements Section */}
      <section className="relative" style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="hud-label" style={{ marginBottom: '10px' }}>Criteria</div>
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(30px, 5vw, 40px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Finance Requirements
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '620px', margin: '0 auto' }}>
              Simple, straightforward criteria to help you access the marketing funding you need
            </p>
          </div>
          </Reveal>

          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }} amount={0.1} gap={0.12}>
            {requirements.map((req, idx) => (
              <StaggerItem key={idx}>
              <div className="neon-border-static" style={{ padding: '40px 32px', backgroundColor: '#0a0a14', borderRadius: '16px', border: '2px solid rgba(255, 20, 147, 0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', transition: 'all 0.3s ease', textAlign: 'center' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,20,147,0.25)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.2)';
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {req.title}
                </h3>
                <p style={{ fontSize: '32px', fontWeight: 900, color: '#ff1493', fontFamily: 'Montserrat', marginBottom: '16px', textShadow: '0 0 20px rgba(255,20,147,0.5)' }}>
                  {req.requirement}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.65)' }}>
                  {req.desc}
                </p>
              </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal variant="up" amount={0.15}>
          <div className="neon-border" style={{ padding: '48px 40px', backgroundColor: '#0a0a14', borderRadius: '20px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#ffffff', fontFamily: 'Montserrat', textAlign: 'center' }}>
              What You'll Need to Apply
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {docs.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '20px', color: '#ff1493', flexShrink: 0, textShadow: '0 0 10px rgba(255,20,147,0.6)' }}>✓</div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      {doc.item}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                      {doc.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '600px 600px' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div style={{ position: 'absolute', top: '-40%', right: '-8%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,20,147,0.14), transparent 70%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-25%', left: '-4%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,19,254,0.12), transparent 70%)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Reveal variant="up" amount={0.3}>
          <h2 className="font-black mb-6" style={{ color: '#ffffff', fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Grow Without the Financial Stress?
          </h2>
          </Reveal>
          <Reveal variant="up" delay={0.12} amount={0.3}>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px' }}>
            Book a free consultation to discuss your business goals and explore flexible financing options that work for you.
          </p>
          </Reveal>
          <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
            <CTAButton
              text="Schedule Your Free Consultation"
              variant="primary"
              size="lg"
              ripple
              magnetic
              onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
