import { useRef, useState } from 'react'
import CTAButton from '../components/CTAButton'

export default function CRM() {
  

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' },
  ]

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

  const [currentPlanIndex, setCurrentPlanIndex] = useState(0)
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

  const renderPlanCard = (plan: typeof pricingPlans[number], idx: number) => (
    <div 
      key={idx}
      style={{
        padding: '22px 18px',
        background: plan.highlight ? 'linear-gradient(135deg, #ff1493 0%, #ff1a8a 100%)' : 'rgba(255,255,255,0.08)',
        borderRadius: '12px',
        border: plan.highlight ? '2px solid #ff1493' : '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        boxShadow: plan.highlight ? '0 10px 28px rgba(255,20,147,0.2)' : '0 4px 12px rgba(0,0,0,0.14)',
        width: '100%'
      }}
    >
      {plan.highlight && (
        <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ffffff', color: '#ff1493', padding: '5px 16px', borderRadius: '18px', fontSize: '11px', fontWeight: 900, fontFamily: 'Montserrat', boxShadow: '0 8px 20px rgba(255,20,147,0.26)', border: '1px solid rgba(255,20,147,0.35)', zIndex: 10 }}>
          MOST POPULAR
        </div>
      )}
      <h3 style={{ fontSize: '19px', fontWeight: 800, marginBottom: '8px', color: plan.highlight ? '#0b0712' : '#ffffff', fontFamily: 'Montserrat', letterSpacing: '-0.25px' }}>
        {plan.name}
      </h3>
      <p style={{ fontSize: '12px', marginBottom: '14px', color: plan.highlight ? 'rgba(11,7,18,0.85)' : 'rgba(255,255,255,0.7)', lineHeight: '18px' }}>
        {plan.description}
      </p>
      <div style={{ marginBottom: '18px', paddingBottom: '18px', borderBottom: `1px solid ${plan.highlight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)'}` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          <span style={{ fontSize: '32px', fontWeight: 900, color: plan.highlight ? '#0b0712' : '#ff1493', fontFamily: 'Montserrat' }}>
            {plan.price}
          </span>
          <span style={{ fontSize: '12px', color: plan.highlight ? 'rgba(11,7,18,0.7)' : 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
            {plan.period}
          </span>
        </div>
      </div>
      <div style={{ marginBottom: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {plan.features.map((feature, fIdx) => (
          <div key={fIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: plan.highlight ? 'rgba(11,7,18,0.9)' : 'rgba(255,255,255,0.85)', lineHeight: '18px' }}>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
              <path d="M17.172 5.172a1 1 0 00-1.414 0L8 12.929l-3.758-3.758a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l10-10z" fill={plan.highlight ? '#0b0712' : '#ff1493'} />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CTAButton
          text="Get Started"
          variant={plan.highlight ? "secondary" : "primary"}
          size="md"
          ripple
          magnetic
          onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
        />
      </div>
    </div>
  )

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10" style={{ contentVisibility: 'auto', containIntrinsicSize: '80px 80px' }}>
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
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="text-black/80 font-medium relative group transition-colors"
                  style={{
                    textShadow: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff1493';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(0,0,0,0.8)';
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
              <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
          {/* Mobile Menu Overlay (mimics Home) */}
          {mobileMenuOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
              <nav className="relative flex flex-col items-center justify-center h-full gap-8">
                <button
                  onClick={() => { handleNavigation('/services'); setMobileMenuOpen(false); }}
                  className="text-2xl font-medium text-white hover:text-pink-400 transition-colors"
                >
                  Services
                </button>
                <button
                  onClick={() => { handleNavigation('/crm'); setMobileMenuOpen(false); }}
                  className="text-2xl font-medium text-white hover:text-pink-400 transition-colors"
                >
                  CRM
                </button>
                <button
                  onClick={() => { handleNavigation('/finance'); setMobileMenuOpen(false); }}
                  className="text-2xl font-medium text-white hover:text-pink-400 transition-colors"
                >
                  Finance
                </button>
                <button
                  onClick={() => { handleNavigation('/about'); setMobileMenuOpen(false); }}
                  className="text-2xl font-medium text-white hover:text-pink-400 transition-colors"
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
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)', paddingTop: '140px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        <div className="max-w-4xl text-center" style={{ width: '100%' }}>
          <h1 className="font-black mb-6" style={{ fontSize: '56px', fontFamily: 'Montserrat', color: '#000000', letterSpacing: '-1px' }}>
            Lead <span style={{ color: '#ff1493' }}>Monsta</span> CRM
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.65)', marginBottom: '24px', maxWidth: '600px' }}>
              Manage, nurture, and convert your leads with enterprise-grade CRM tools. Automate your entire lead funnel with intelligent workflows, AI-powered automation, and real-time analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '900px 900px' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="font-black mb-4" style={{ fontSize: '40px', fontFamily: 'Montserrat', color: '#023e8aff', letterSpacing: '-0.5px' }}>
              Why Choose Our CRM?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.6)', maxWidth: '500px', margin: '0 auto' }}>
              Industry-leading features designed to scale your business
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { title: 'Lead Dashboard', desc: 'Unified view of all your leads with real-time insights', icon: '📊' },
              { title: 'Automation', desc: 'Automatically nurture leads through email and SMS workflows', icon: '⚙️' },
              { title: 'AI Integration', desc: 'AI-powered chatbots and voice agents handle customer interactions', icon: '🤖' },
              { title: 'Analytics', desc: 'Track conversion rates, ROI, and lead performance metrics', icon: '📈' },
              { title: 'Integrations', desc: 'Connect with your favorite tools and platforms seamlessly', icon: '🔗' },
              { title: 'Support', desc: 'Expert support to help you maximize your CRM investment', icon: '💬' }
            ].map((benefit, idx) => (
              <div key={idx} style={{ padding: '40px 32px', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid rgba(255, 20, 147, 0.1)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', cursor: 'pointer' }}
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
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', paddingTop: '60px', paddingBottom: '60px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', contentVisibility: 'auto', containIntrinsicSize: '840px 840px' }}>
        <div className="max-w-5xl" style={{ width: '100%', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="font-black mb-2" style={{ fontSize: '30px', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.3px' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>
              Choose the perfect plan for your business. Scale anytime, cancel anytime.
            </p>
          </div>
          <div className="md:hidden relative w-full px-4" style={{ marginBottom: '24px' }}>
            <div
              className="overflow-hidden w-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-300 w-full"
                style={{ transform: `translateX(-${currentPlanIndex * 100}%)` }}
              >
                {pricingPlans.map((plan, idx) => (
                  <div key={plan.name} style={{ minWidth: '100%', padding: '0 8px', boxSizing: 'border-box' }}>
                    {renderPlanCard(plan, idx)}
                  </div>
                ))}
              </div>
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

          <div className="hidden md:grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px', justifyItems: 'center' }}>
            {pricingPlans.map((plan, idx) => renderPlanCard(plan, idx))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden', contentVisibility: 'auto', containIntrinsicSize: '640px 640px' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.08)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.05)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="font-black mb-6" style={{ color: '#023e8aff', fontSize: '48px', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Transform Your Sales?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join hundreds of businesses already using our CRM to automate their lead management and close more deals.
          </p>
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
    </div>
  )
}
