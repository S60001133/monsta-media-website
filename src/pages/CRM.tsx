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
        style={{
          padding: plan.highlight ? '10px 8px' : '6px 4px',
          background: plan.highlight ? 'linear-gradient(135deg, #ff1493 0%, #ff1a8a 100%)' : 'rgba(255,255,255,0.08)',
          borderRadius: '10px',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          position: 'relative',
          boxShadow: plan.highlight ? '0 6px 16px rgba(255,20,147,0.18)' : '0 2px 6px rgba(0,0,0,0.10)',
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground ? 'bg-black' : 'bg-transparent'} md:bg-white/80 md:backdrop-blur-xl md:border-b md:border-black/10`} style={{ contentVisibility: 'auto', containIntrinsicSize: '80px 80px' }}>
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
                  className="text-black font-medium relative group transition-colors"
                  style={{
                    color: '#000',
                    textShadow: 'none',
                    transition: 'all 0.3s ease'
                  }}
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
      <section style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)', paddingTop: '140px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        <div className="max-w-4xl text-center" style={{ width: '100%' }}>
          <Reveal variant="blur" amount={0.4}>
          <h1 className="font-black mb-6" style={{ fontSize: '56px', fontFamily: 'Montserrat', color: '#000000', letterSpacing: '-1px' }}>
            Lead <span style={{ color: '#ff1493' }}>Monsta</span> CRM
          </h1>
          </Reveal>
          <Reveal variant="up" delay={0.15} amount={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.65)', marginBottom: '24px', maxWidth: '600px' }}>
              Manage, nurture, and convert your leads with enterprise-grade CRM tools. Automate your entire lead funnel with intelligent workflows, AI-powered automation, and real-time analytics.
            </p>
          </div>
          </Reveal>
            <Reveal variant="up" delay={0.28} amount={0.3}>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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
            </Reveal>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '900px 900px' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="font-black mb-4" style={{ fontSize: '40px', fontFamily: 'Montserrat', color: '#023e8aff', letterSpacing: '-0.5px' }}>
              Why Choose Our CRM?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              Industry-leading features designed to scale your business
            </p>
          </div>
          </Reveal>
          <Stagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }} amount={0.1} gap={0.12}>
            {[
              { title: 'Lead Dashboard', desc: 'Unified view of all your leads with real-time insights', icon: '📊' },
              { title: 'Automation', desc: 'Automatically nurture leads through email and SMS workflows', icon: '⚙️' },
              { title: 'AI Integration', desc: 'AI-powered chatbots and voice agents handle customer interactions', icon: '🤖' },
              { title: 'Analytics', desc: 'Track conversion rates, ROI, and lead performance metrics', icon: '📈' },
              { title: 'Integrations', desc: 'Connect with your favorite tools and platforms seamlessly', icon: '🔗' },
              { title: 'Support', desc: 'Expert support to help you maximize your CRM investment', icon: '💬' }
            ].map((benefit, idx) => (
              <StaggerItem key={idx}>
              <div style={{ padding: '40px 32px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(255, 20, 147, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,20,147,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{benefit.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbdff', fontFamily: 'Montserrat' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
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
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden', contentVisibility: 'auto', containIntrinsicSize: '640px 640px' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.08)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.05)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Reveal variant="up" amount={0.3}>
          <h2 className="font-black mb-6" style={{ color: '#023e8aff', fontSize: '48px', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Transform Your Sales?
          </h2>
          </Reveal>
          <Reveal variant="up" delay={0.12} amount={0.3}>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join hundreds of businesses already using our CRM to automate their lead management and close more deals.
          </p>
          </Reveal>
          <CTAButton
            text="Book Your Free Consultation"
            variant="primary"
            size="lg"
            ripple
            magnetic
            onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
          />
        </div>
      </section>
    </>
  );
}
