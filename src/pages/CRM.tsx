import { useEffect, useRef, useState } from 'react'
import CTAButton from '../components/CTAButton'
import { scrollToTop } from '../lib/scroll'
import { setSeo } from '../lib/seo'

const PINK = '#E9178C'

// MMCRM app — login page. Live production domain (Vercel).
const CRM_LOGIN_URL = 'https://crm.monstamediaparramatta.com/login'

export default function CRM() {
  // SEO: unique title + description + OG + Twitter + canonical
  useEffect(() => {
    setSeo({
      title: 'Lead Monsta CRM | Affordable CRM Software for Small Business | Monsta Media',
      description: 'Lead Monsta CRM — affordable lead management for small business. AI chatbots, email & SMS automation, booking calendar. Plans from $49/mo with a 1-month free trial.',
      path: '/crm',
      image: '/images/CRM.webp',
    })
  }, [])

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for solo operators and freelancers',
      features: [
        'Up to 500 CRM contacts',
        '1 AI chatbot widget',
        'Email campaigns (1,000/mo)',
        'SMS messaging (100/mo)',
        'Booking calendar',
        'Form builder',
        'Basic automations',
        'Standard support'
      ],
      highlight: false
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      description: 'Built for growing teams and agencies',
      features: [
        'Up to 5,000 CRM contacts',
        '3 AI chatbot widgets',
        'Email campaigns (10,000/mo)',
        'SMS messaging (1,000/mo)',
        'Funnel builder (3 funnels)',
        'Social media scheduler',
        'AI voice agent (100 min/mo)',
        'Advanced automations',
        'Priority support'
      ],
      highlight: false
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For serious agencies scaling their operation',
      features: [
        'Unlimited CRM contacts',
        '10 AI chatbot widgets',
        'Email campaigns (100,000/mo)',
        'SMS messaging (10,000/mo)',
        'Funnel builder + custom domains',
        'AI voice agent (500 min/mo)',
        'Call tracking & recording',
        'White-label options',
        'API access & webhooks',
        'Dedicated account manager'
      ],
      highlight: false
    },
    {
      name: 'Agency',
      price: '$499',
      period: '/month',
      description: 'Resell to your own clients with full white-label',
      features: [
        'Unlimited contacts & chatbots',
        'Email campaigns (500,000/mo)',
        'SMS messaging (50,000/mo)',
        'Unlimited funnels & social platforms',
        'AI voice agent (2,000 min/mo)',
        'Full white-label (custom domain)',
        'Agency reseller portal',
        'Manage unlimited sub-accounts',
        'API access & webhooks',
        'Dedicated onboarding + manager'
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

  const openEnquiries = () => {
    window.history.pushState({}, '', '/enquiries')
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
  }

  const renderPlanCard = (plan: typeof pricingPlans[number], idx: number) => {
    return (
      <div
        key={idx}
        className={plan.highlight ? 'plan-card plan-card--highlight' : 'plan-card'}
        style={{
          padding: plan.highlight ? '40px 26px' : '28px 22px',
          background: plan.highlight ? 'var(--ink)' : 'var(--surface)',
          borderRadius: '16px',
          border: plan.highlight ? '1px solid rgba(233,23,140,0.6)' : '1px solid var(--hairline)',
          position: 'relative',
          boxShadow: plan.highlight ? '0 20px 48px rgba(28,24,18,0.18)' : '0 2px 8px rgba(28,24,18,0.04)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = plan.highlight ? '0 24px 56px rgba(28,24,18,0.24)' : '0 12px 28px rgba(28,24,18,0.10)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = plan.highlight ? '0 20px 48px rgba(28,24,18,0.18)' : '0 2px 8px rgba(28,24,18,0.04)'
        }}
      >
        {plan.highlight && (
          <div
            style={{
              position: 'absolute',
              top: '-13px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: PINK,
              color: '#fff',
              fontWeight: 600,
              fontSize: '11px',
              padding: '4px 14px',
              borderRadius: '9999px',
              letterSpacing: '0.04em',
              zIndex: 10,
              textTransform: 'uppercase',
            }}
          >
            Most Popular
          </div>
        )}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '6px', color: plan.highlight ? '#fff' : 'var(--ink)' }}>{plan.name}</h3>
          <div style={{ fontSize: '28px', fontWeight: 600, color: plan.highlight ? '#fff' : 'var(--ink)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
            {plan.price}<span style={{ fontSize: '13px', fontWeight: 400, color: plan.highlight ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)' }}>{plan.period}</span>
          </div>
          <div style={{ color: plan.highlight ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)', fontSize: '12.5px', marginBottom: 14, lineHeight: 1.5 }}>{plan.description}</div>
          <ul style={{ color: plan.highlight ? 'rgba(255,255,255,0.82)' : 'var(--ink-2)', fontSize: '12.5px', marginBottom: 10, paddingLeft: 16, lineHeight: 1.55 }}>
            {plan.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: 5, listStyle: 'disc' }}>{feature}</li>
            ))}
          </ul>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
          <CTAButton
            text="Start Free Trial"
            variant={plan.highlight ? "primary" : "secondary"}
            size="sm"
            onClick={openEnquiries}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--paper)', color: 'var(--ink)', minHeight: '100vh' }}>
      {/* Hero Section — fills exactly one viewport (no scroll needed to pass it) */}
      <section
        className="relative flex items-center"
        style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '32px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="max-w-4xl text-center relative z-10" style={{ width: '100%' }}>
          <h1 className="display-xl mb-4" style={{ fontSize: 'clamp(38px, 6vw, 64px)' }}>
            Lead <span className="display-accent">Monsta</span> CRM
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="body-copy" style={{ fontSize: '17px', lineHeight: '26px', marginBottom: '24px', maxWidth: '600px' }}>
              Manage, nurture, and convert your leads with enterprise-grade CRM tools. Automate your entire lead funnel with intelligent workflows, AI-powered automation, and real-time analytics.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', width: '100%', flexWrap: 'wrap' }}>
            <CTAButton
              text="Start Your Free Trial"
              variant="primary"
              size="lg"
              onClick={openEnquiries}
            />
            <a
              href={CRM_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-lg"
              style={{ padding: '16px 34px', fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
            >
              Log In
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Key Benefits Section — white band */}
      <section
        className="relative"
        style={{
          paddingTop: '96px', paddingBottom: '104px', paddingLeft: '40px', paddingRight: '40px',
          display: 'flex', justifyContent: 'center',
          background: '#FFFFFF',
          color: '#1C1812',
          ...({
            '--ink': '#1C1812',
            '--ink-2': 'rgba(28, 24, 18, 0.68)',
            '--ink-3': 'rgba(28, 24, 18, 0.5)',
            '--hairline': 'rgba(28, 24, 18, 0.12)',
            '--hairline-strong': 'rgba(28, 24, 18, 0.25)',
            '--surface': '#F7F7F7',
          } as React.CSSProperties),
        }}
      >
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="h2-xl mb-4" style={{ color: 'var(--color-brand-pink)' }}>
              Industry-leading features designed to scale your business
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { title: 'Lead Dashboard', desc: 'Unified view of all your leads with real-time insights', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
              { title: 'Automation', desc: 'Automatically nurture leads through email and SMS workflows', icon: 'M19.14 12.94a7.07 7.07 0 00.05-.94 7.07 7.07 0 00-.05-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.61-.22l-2.39.96a7.2 7.2 0 00-1.62-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.58.24-1.12.55-1.62.94l-2.39-.96a.5.5 0 00-.61.22L2.66 8.78a.5.5 0 00.12.64l2.03 1.58a7.07 7.07 0 000 1.88L2.78 14.46a.5.5 0 00-.12.64l1.92 3.32a.5.5 0 00.61.22l2.39-.96c.5.39 1.04.7 1.62.94l.36 2.54a.5.5 0 00.5.42h3.84a.5.5 0 00.5-.42l.36-2.54c.58-.24 1.12-.55 1.62-.94l2.39.96a.5.5 0 00.61-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.03-1.58zM12 15.5A3.5 3.5 0 1112 8a3.5 3.5 0 010 7.5z' },
              { title: 'AI Integration', desc: 'AI-powered chatbots and voice agents handle customer interactions', icon: 'M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 20h6v2H9v-2z' },
              { title: 'Analytics', desc: 'Track conversion rates, ROI, and lead performance metrics', icon: 'M4 20V10m6 10V4m6 16v-7m6 7H2' },
              { title: 'Integrations', desc: 'Connect with your favorite tools and platforms seamlessly', icon: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71' },
              { title: 'Support', desc: 'Expert support to help you maximize your CRM investment', icon: 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' }
            ].map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  padding: '32px 26px',
                  background: 'var(--surface)',
                  borderRadius: '14px',
                  border: '1px solid var(--hairline)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hairline)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 50, height: 50, margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(233,23,140,0.07)', border: '1px solid rgba(233,23,140,0.25)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="display" style={{ fontSize: '19px', marginBottom: '10px', textAlign: 'center' }}>
                  {benefit.title}
                </h3>
                <p className="body-copy" style={{ fontSize: '15px', lineHeight: '24px', textAlign: 'center' }}>
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section — black band */}
      <section style={{ background: 'var(--paper)', paddingTop: '96px', paddingBottom: '96px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="max-w-6xl" style={{ width: '100%', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 className="h2-xl" style={{ marginBottom: 8, color: 'var(--color-brand-pink)' }}>
              Simple, Transparent Pricing
            </h2>
            <p className="body-copy" style={{ maxWidth: '500px', margin: '0 auto' }}>
              Every plan starts with a 1-month free trial. No credit card required. Scale anytime, cancel anytime.
            </p>
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden flex w-full justify-center items-center px-4 mobile-plan-card-container" style={{ marginBottom: '24px', zIndex: 2 }}>
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
                className="w-8 h-8 flex items-center justify-center"
                style={{ pointerEvents: 'auto', color: 'var(--ink)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => goToPlan(currentPlanIndex + 1)}
                aria-label="Next plan"
                className="w-8 h-8 flex items-center justify-center"
                style={{ pointerEvents: 'auto', color: 'var(--ink)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Desktop plans */}
          <div className="hidden md:flex" style={{ gap: '20px', alignItems: 'stretch', justifyContent: 'center' }}>
            {pricingPlans.map((plan, idx) => (
              <div
                key={plan.name}
                style={{
                  flex: '1 1 0',
                  maxWidth: '300px',
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  zIndex: plan.highlight ? 2 : 1,
                }}
              >
                {renderPlanCard(plan, idx)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — black band */}
      <section className="relative" style={{ paddingTop: '80px', paddingBottom: '96px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', background: 'var(--paper)' }}>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="h2-xl" style={{ marginBottom: '20px', color: 'var(--color-brand-pink)' }}>
            Ready to Transform Your Sales?
          </h2>
          <p className="body-copy" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Join hundreds of businesses already using our CRM to automate their lead management and close more deals.
          </p>
          <CTAButton
            text="Start Your Free Trial"
            variant="primary"
            size="lg"
            onClick={openEnquiries}
          />
        </div>
      </section>
    </div>
  );
}
