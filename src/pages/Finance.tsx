import { useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import { scrollToTop } from '../lib/scroll'

const PINK = '#E9178C'

export default function Finance() {
  // SEO: Update document title
  useEffect(() => {
    document.title = 'Flexible Marketing Finance | No Upfront Costs | Monsta Media Australia'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Flexible marketing finance solutions with no upfront costs. Fast approval, transparent pricing, and Australian-owned support. Grow your business without financial stress.')
    }
  }, [])

  const openEnquiries = () => {
    window.history.pushState({}, '', '/enquiries')
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
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
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Hero Section — fills exactly one viewport (no scroll needed to pass it) */}
      <section
        className="relative flex items-center"
        style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '32px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="max-w-4xl text-center relative z-10" style={{ width: '100%' }}>
          <h1 className="display-xl mb-4" style={{ fontSize: 'clamp(38px, 6vw, 64px)' }}>
            What Comes First: The <span className="display-accent">Budget</span> or the <span className="display-accent">Marketing</span>?
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p className="body-copy" style={{ fontSize: '17px', lineHeight: '26px', marginBottom: '24px', maxWidth: '700px' }}>
              Every business needs marketing to grow, but finding the budget can be a challenge. That's where we step in—we can organize flexible financing so you can invest in the marketing your business needs, without the upfront burden.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <CTAButton
              text="Schedule Your Free Consultation"
              variant="primary"
              size="lg"
              onClick={openEnquiries}
            />
          </div>
        </div>
      </section>

      {/* Why Finance with Us Section — white band */}
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
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="h2-xl mb-4" style={{ color: 'var(--color-brand-pink)' }}>
              Why Choose Our Finance Solutions?
            </h2>
            <p className="body-copy" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Flexible payment plans designed to help your business grow without financial stress
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="benefit-card"
                style={{
                  padding: '36px 28px',
                  background: 'var(--surface)',
                  border: '1px solid var(--hairline)',
                  borderRadius: '14px',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--hairline)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(233,23,140,0.07)', border: '1px solid rgba(233,23,140,0.25)' }}>
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

      {/* How It Works Section — black band */}
      <section className="relative" style={{ paddingTop: '96px', paddingBottom: '104px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', background: 'var(--paper)' }}>
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="h2-xl mb-4" style={{ color: 'var(--color-brand-pink)' }}>
              How It Works
            </h2>
            <p className="body-copy" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Simple steps to unlock the marketing your business deserves
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {steps.map((item, idx) => (
              <div key={idx} style={{ flex: '1 1 220px', minWidth: '220px', maxWidth: '280px' }}>
                <div
                  style={{
                    position: 'relative',
                    padding: '32px 24px',
                    background: 'var(--surface)',
                    borderRadius: '14px',
                    border: '1px solid var(--hairline)',
                    transition: 'all 0.3s ease',
                    height: '100%',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--hairline)'
                  }}
                >
                  <h3 className="display" style={{ fontSize: '19px', marginBottom: '10px' }}>
                    {item.title}
                  </h3>
                  <p className="body-copy" style={{ fontSize: '14px', lineHeight: '22px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Requirements Section — white band */}
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
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="h2-xl mb-4" style={{ color: 'var(--color-brand-pink)' }}>
              Finance Requirements
            </h2>
            <p className="body-copy" style={{ maxWidth: '620px', margin: '0 auto' }}>
              Simple, straightforward criteria to help you access the marketing funding you need
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '48px' }}>
            {requirements.map((req, idx) => (
              <div
                key={idx}
                style={{
                  padding: '36px 28px',
                  background: 'var(--surface)',
                  borderRadius: '14px',
                  border: '1px solid var(--hairline)',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = 'var(--hairline)'
                }}
              >
                <h3 className="display" style={{ fontSize: '19px', marginBottom: '8px' }}>
                  {req.title}
                </h3>
                <p className="display-accent" style={{ fontSize: '34px', marginBottom: '14px' }}>
                  {req.requirement}
                </p>
                <p className="body-copy" style={{ fontSize: '14px', lineHeight: '22px' }}>
                  {req.desc}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{ padding: '40px 32px', background: 'var(--surface)', borderRadius: '18px', border: '1px solid var(--hairline)', transition: 'all 0.3s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderColor = 'var(--hairline)'
            }}
          >
            <h3 className="display" style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
              What You'll Need to Apply
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {docs.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '18px', color: PINK, flexShrink: 0, fontWeight: 700 }}>✓</div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--ink)', marginBottom: '4px' }}>
                      {doc.item}
                    </p>
                    <p className="body-copy" style={{ fontSize: '13px' }}>
                      {doc.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative" style={{ paddingTop: '80px', paddingBottom: '96px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="h2-xl" style={{ marginBottom: '20px', color: 'var(--color-brand-pink)' }}>
            Ready to Grow Without the Financial Stress?
          </h2>
          <p className="body-copy" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px' }}>
            Book a free consultation to discuss your business goals and explore flexible financing options that work for you.
          </p>
          <CTAButton
            text="Schedule Your Free Consultation"
            variant="primary"
            size="lg"
            onClick={openEnquiries}
          />
        </div>
      </section>
    </div>
  )
}
