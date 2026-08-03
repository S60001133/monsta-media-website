import { useRef, useState, useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import Reveal, { Stagger, StaggerItem } from '../components/Reveal'


export default function CRM() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navBackground, setNavBackground] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' },
  ]

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

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMobileMenuOpen(false)
  }

  const pricingPlans = [
    {
      name: 'Basic',
      price: '$97',
      period: '/month',
      description: 'Expert lead management and funnel optimization',
      features: [
        'Unified lead dashboard',
        'Lead scoring and segmentation',
        'Automated follow-up sequences',
        'Email and SMS templates',
        'Basic reporting and analytics',
        'Expert lead funnel management',
        'Up to 500 contacts'
      ],
      highlight: false
    },
    {
      name: 'Professional',
      price: '$297',
      period: '/month',
      description: 'Advanced automation with email and SMS campaigns',
      features: [
        'Everything in Basic',
        'Automated email campaigns',
        'SMS marketing and workflows',
        'Advanced segmentation',
        'Lead scoring automation',
        'Multi-step automation workflows',
        'Up to 5,000 contacts',
        'Priority support'
      ],
      highlight: true
    },
    {
      name: 'Enterprise',
      price: '$497',
      period: '/month',
      description: 'Complete AI-powered suite for total automation',
      features: [
        'Everything in Professional',
        'AI-powered chatbots',
        'AI voice agents',
        'Advanced analytics and reporting',
        'Custom integrations',
        'Unlimited contacts',
        'Dedicated account manager',
        'Custom automation workflows',
      ],
      highlight: false
    }
  ]

  const [currentPlanIndex, setCurrentPlanIndex] = useState(1) // Start with Professional (Most Popular)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToPlan = (index: number) => {
    if (index < 0) {
      setCurrentPlanIndex(pricingPlans.length - 1)
      return
    }
    if (index >= pricingPlans.length) {
      setCurrentPlanIndex(0)
      return
    }
    setCurrentPlanIndex(index)
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    touchEndX.current = null
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const deltaX = touchStartX.current - touchEndX.current
    const threshold = 40

    if (deltaX > threshold) {
      goToPlan(currentPlanIndex + 1)
    } else if (deltaX < -threshold) {
      goToPlan(currentPlanIndex - 1)
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const renderPlanCard = (plan: typeof pricingPlans[number], idx: number) => {
    // White text for all cards, but keep accent for highlight
    const accentColor = plan.highlight ? '#fff' : '#ff1493';
    const priceColor = plan.highlight ? '#fff' : '#fff';
    const periodColor = plan.highlight ? '#fff' : '#ffb6d5';
    const descColor = plan.highlight ? '#fff' : '#fff';
    const featureColor = plan.highlight ? '#fff' : '#fff';
    return (
      <div
        key={idx}
        className={plan.highlight ? 'neon-border rounded-xl' : ''}
        style={{
          padding: plan.highlight ? '10px 8px' : '6px 4px',
          background: plan.highlight ? 'linear-gradient(135deg, #ff1493 0%, #ff1a8a 100%)' : 'rgba(255,255,255,0.08)',
          borderRadius: '10px',
          border: plan.highlight ? '2px solid rgba(255,255,255,0.4)' : '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          boxShadow: plan.highlight ? '0 6px 24px rgba(255,20,147,0.4)' : '0 2px 6px rgba(0,0,0,0.10)',
          width: '100%',
          minHeight: plan.highlight ? '380px' : '260px',
          height: '100%',
          maxWidth: plan.highlight ? '300px' : '220px',
          marginLeft: plan.highlight ? '-3px' : '0',
          marginRight: plan.highlight ? '-3px' : '0',
          marginTop: '4px',
          zIndex: plan.highlight ? 2 : 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {plan.highlight && (
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              color: '#ff1493',
              fontWeight: 800,
              fontSize: '10px',
              padding: '2px 10px',
              borderRadius: '9999px',
              boxShadow: '0 1px 6px rgba(255,20,147,0.08)',
              letterSpacing: '0.04em',
              zIndex: 10,
              border: 'none',
              textTransform: 'uppercase',
            }}
            className="most-popular-badge"
          >
            Most Popular
          </div>
        )}
              {/* Remove mobile override for Most Popular badge top position */}
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '7px', color: accentColor, fontFamily: 'Montserrat' }}>{plan.name}</h3>
          {plan.price && <div style={{ fontSize: '20px', fontWeight: 800, color: priceColor, marginBottom: 4 }}>{plan.price}<span style={{ fontSize: '11px', fontWeight: 400, color: periodColor }}>{plan.period}</span></div>}
          <div style={{ color: descColor, fontSize: '11px', marginBottom: 8 }}>{plan.description}</div>
          <ul style={{ color: featureColor, fontSize: '11px', marginBottom: 8, paddingLeft: 14 }}>
            {plan.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: 3, listStyle: 'disc' }}>{feature}</li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <CTAButton
            text="Start Now"
            variant={plan.highlight ? "primary" : "secondary"}
            size="sm"
            ripple
            magnetic
            onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
          />
        </div>
      </div>
    );
  }

  // ...existing code...
  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground ? 'bg-black/85 backdrop-blur-xl shadow-lg shadow-pink-500/10 border-b border-pink-500/20' : 'bg-transparent'}`} style={{ contentVisibility: 'auto', containIntrinsicSize: '80px 80px' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="text-white/80 font-medium relative group transition-colors"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    textShadow: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#ff1493'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
                >
                  {link.name}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      backgroundColor: '#ff1493',
                      boxShadow: '0 0 8px #ff1493'
                    }}
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

            {/* Mobile Menu Button (mimics Home) */}
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

      {/* Hardcoded Mobile Overlay Navigation (sibling to nav) - Home style */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-9999 bg-black/95 transition-opacity duration-300"
          style={{ top: 0, left: 0, width: '100vw', height: '100vh' }}
        >
          {/* Logo top left */}
          <img
            src="/images/logo.svg"
            alt="Monsta Media"
            className="h-12 w-auto"
            loading="lazy"
            style={{ position: 'absolute', top: 24, left: 24, zIndex: 2 }}
          />
          {/* Hamburger/X toggle button top right, same as nav */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            aria-label="Toggle menu"
            style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, background: 'none', border: 'none' }}
          >
            <span className={`w-6 h-0.5 bg-white transition-all rotate-45 translate-y-2`} />
            <span className={`w-6 h-0.5 bg-white transition-all opacity-0`} />
            <span className={`w-6 h-0.5 bg-white transition-all -rotate-45 -translate-y-2`} />
          </button>
          {/* Evenly spaced nav links and CTA */}
          <div className="flex flex-col items-center justify-center w-full h-full" style={{ minHeight: '100vh', paddingTop: '80px', paddingBottom: '40px' }}>
            <div className="flex flex-col items-center justify-center grow" style={{ width: '100%', maxWidth: '320px', margin: '0 auto', flex: 1, gap: '36px' }}>
              <span onClick={() => { handleNavigation('/'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>Home</span>
              <span onClick={() => { handleNavigation('/services'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>Services</span>
              <span onClick={() => { handleNavigation('/finance'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>Finance</span>
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
          <h1 className="font-black mb-6" style={{ fontSize: 'clamp(40px, 7vw, 56px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-1px' }}>
            Lead <span className="text-gradient-animated" style={{ display: 'inline-block' }}>Monsta</span> CRM
          </h1>
          </Reveal>
          <Reveal variant="up" delay={0.15} amount={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '600px' }}>
              Manage, nurture, and convert your leads with enterprise-grade CRM tools. Automate your entire lead funnel with intelligent workflows, AI-powered automation, and real-time analytics.
            </p>
          </div>
          </Reveal>
            <Reveal variant="up" delay={0.28} amount={0.3}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
                <CTAButton
                  text="Book Your Free Consultation"
                  variant="primary"
                  size="lg"
                  ripple
                  magnetic
                  onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
                  className="mt-4 mx-auto"
                />
              </div>
            </div>
            </Reveal>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="relative" style={{ paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '900px 900px' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="hud-label" style={{ marginBottom: '10px' }}>Lead Management Suite</div>
            <h2 className="font-black mb-4" style={{ fontSize: 'clamp(30px, 5vw, 40px)', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.5px' }}>
              Why Choose Our CRM?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              Industry-leading features designed to scale your business
            </p>
          </div>
          </Reveal>
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }} amount={0.1} gap={0.12}>
            {[
              { title: 'Lead Dashboard', desc: 'Unified view of all your leads with real-time insights', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
              { title: 'Automation', desc: 'Automatically nurture leads through email and SMS workflows', icon: 'M19.14 12.94a7.07 7.07 0 00.05-.94 7.07 7.07 0 00-.05-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.61-.22l-2.39.96a7.2 7.2 0 00-1.62-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.58.24-1.12.55-1.62.94l-2.39-.96a.5.5 0 00-.61.22L2.66 8.78a.5.5 0 00.12.64l2.03 1.58a7.07 7.07 0 000 1.88L2.78 14.46a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.61.22l2.39-.96c.5.39 1.04.7 1.62.94l.36 2.54a.5.5 0 00.5.42h3.84a.5.5 0 00.5-.42l.36-2.54c.58-.24 1.12-.55 1.62-.94l2.39.96a.5.5 0 00.61-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z' },
              { title: 'AI Integration', desc: 'AI-powered chatbots and voice agents handle customer interactions', icon: 'M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 20h6v2H9v-2z' },
              { title: 'Analytics', desc: 'Track conversion rates, ROI, and lead performance metrics', icon: 'M4 20V10m6 10V4m6 16v-7m6 7H2' },
              { title: 'Integrations', desc: 'Connect with your favorite tools and platforms seamlessly', icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' },
              { title: 'Support', desc: 'Expert support to help you maximize your CRM investment', icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' }
            ].map((benefit, idx) => (
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

      {/* Pricing Section */}
      <section style={{ backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', paddingTop: '40px', paddingBottom: '24px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', contentVisibility: 'auto', containIntrinsicSize: '840px 840px' }}>
        <div className="max-w-5xl" style={{ width: '100%', margin: '0 auto' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '0' }}>
            <h2 className="font-black mb-2" style={{ fontSize: '30px', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.3px', marginBottom: 0 }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 0 auto', marginBottom: 0 }}>
              Choose the perfect plan for your business. Scale anytime, cancel anytime.
            </p>
          </div>
          </Reveal>
          <div className="md:hidden flex w-full justify-center items-center px-4 mobile-plan-card-container" style={{ marginBottom: '24px', zIndex: 2 }}>
                  {/* Extra top margin for mobile plan card container only on mobile */}
                  <style>{`
                    @media (max-width: 768px) {
                      .mobile-plan-card-container {
                        margin-top: 38px !important;
                      }
                    }
                  `}</style>
            <div
              className="flex transition-transform duration-300 w-full max-w-[420px]"
              style={{ overflow: 'visible', transform: `translateX(-${currentPlanIndex * 100}%)` }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.name}
                  style={{
                    minWidth: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {renderPlanCard(plan, idx)}
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4" style={{ pointerEvents: 'none' }}>
              <button
                onClick={() => goToPlan(currentPlanIndex - 1)}
                aria-label="Previous plan"
                className="text-white w-8 h-8 flex items-center justify-center"
                style={{ pointerEvents: 'auto', textShadow: '0 0 12px rgba(255,255,255,0.8)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => goToPlan(currentPlanIndex + 1)}
                aria-label="Next plan"
                className="text-white w-8 h-8 flex items-center justify-center"
                style={{ pointerEvents: 'auto', textShadow: '0 0 12px rgba(255,255,255,0.8)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <div className="hidden md:flex" style={{ gap: '32px', marginBottom: '24px', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', marginTop: '-180px' }}>
              {pricingPlans.map((plan, idx) => (
                <div
                  key={plan.name}
                  style={{
                    flex: plan.highlight ? '0 1 440px' : '0 1 340px',
                    zIndex: plan.highlight ? 2 : 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'end',
                    alignItems: 'stretch',
                    marginTop: plan.highlight ? '0' : '0',
                    marginBottom: plan.highlight ? '0' : '0',
                    position: 'relative',
                    minHeight: plan.highlight ? '600px' : '520px',
                    height: '100%',
                    maxWidth: plan.highlight ? '440px' : '340px',
                  }}
                >
                  {renderPlanCard(plan, idx)}
                </div>
              ))}
            </div>
            {/* No extra CTA below cards; each card has its own CTA */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '640px 640px' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,20,147,0.14), transparent 70%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,19,254,0.12), transparent 70%)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Reveal variant="up" amount={0.3}>
          <h2 className="font-black mb-6" style={{ color: '#ffffff', fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Transform Your Sales?
          </h2>
          </Reveal>
          <Reveal variant="up" delay={0.12} amount={0.3}>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join hundreds of businesses already using our CRM to automate their lead management and close more deals.
          </p>
          </Reveal>
          <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
            <CTAButton
              text="Book Your Free Consultation"
              variant="primary"
              size="lg"
              ripple
              magnetic
              onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
            />
          </div>
        </div>
      </section>
    </>
  );
}
