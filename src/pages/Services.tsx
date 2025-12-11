import { useState, useEffect } from 'react'
import CTAButton from '../components/CTAButton'

export default function Services() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // SEO: Update document title
  useEffect(() => {
    document.title = 'Affordable Marketing Services | No Agency Fees | AI Automation | Monsta Media Australia'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Budget-friendly marketing services with ZERO agency fees. Affordable AI automation, high-ROI Meta ads, cost-effective SEO & CRM. Pay for results, not retainers. Sydney, NSW & Australia.')
    }
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'CRM', path: '/crm' },
    { name: 'Finance', path: '/finance' },
    { name: 'About Us', path: '/about' },
  ]

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMobileMenuOpen(false)
  }

  const serviceSections = [
    {
      title: 'AI & Automation',
      subtitle: 'Systems that work while you sleep.',
      body: 'We understand that scaling your business doesn\'t mean hiring more people—it means working smarter. AI has become the buzzword of the decade, and for the last few years, we\'ve been perfecting AI workflows with the latest technology. We design automations that replace manual busywork with intelligent, reliable flows that handle lead intake, routing, follow-ups, and handoffs 24/7. Every workflow is mapped, tested, and monitored so you can scale your output without scaling your payroll.',
      bullets: [
        'Custom AI workflows that increase productivity without increasing headcount',
        'Advanced automation for intake, routing, follow-up, and lead nurturing',
        'Continuous optimization and monitoring to keep workflows performing at peak efficiency',
        'Integration with your existing tools and systems for seamless operation',
      ],
      image: '/images/ai.jpeg',
    },
    {
      title: 'Web Development',
      subtitle: 'High-converting experiences, not just pages.',
      body: 'Your website is more than just an online presence—it\'s your most powerful salesman, working around the clock to convert visitors into customers. We craft responsive, fast-loading experiences built from the ground up with conversion in mind. Every element, from navigation to copy to CTAs, is engineered to move people closer to a decision. We don\'t just build websites; we build revenue-generating machines that tell your story and drive action.',
      bullets: [
        'Conversion-first architecture designed to turn visitors into leads and customers',
        'Lightning-fast load times and mobile-optimized for every device',
        'CMS builds you can manage yourself without waiting on developer support',
        'Websites, landing pages, and web apps engineered for scale and performance',
      ],
      image: '/images/web-design.jpeg',
    },
    {
      title: 'Local or National SEO',
      subtitle: 'Be the first answer, not the fifth tab.',
      body: 'Whether you\'re dominating your local market or conquering nationally, visibility is everything. We combine technical SEO expertise with strategic content development and conversion optimization to lift you above competitors. For years, we\'ve perfected the science of ranking—from technical speed fixes to schema markup to intent-driven content that attracts buyers ready to convert. We deliver the traffic that matters: qualified, ready-to-act traffic that turns into revenue.',
      bullets: [
        'Technical SEO mastery: speed optimization, schema markup, crawl health, and more',
        'Intent-driven content strategies that attract qualified, ready-to-buy traffic',
        'Local SEO domination for map pack wins and service-area coverage',
        'National SEO campaigns with proven strategies for competitive markets',
      ],
      image: '/images/SEO.jpeg',
    },
    {
      title: 'Social Media Ads',
      subtitle: 'Performance creative tuned for revenue.',
      body: 'Paid social media is a science, not a gamble. We build campaigns designed to learn fast, test relentlessly, and scale profitably. Our team creates thumb-stopping creative that cuts through the noise, pairs it with disciplined testing, and manages budgets with surgical precision. Every dollar spent is tracked, analyzed, and optimized. You get profitable reach and measurable ROI—not just impressions and vanity metrics.',
      bullets: [
        'Full-funnel Meta and Google campaigns with clean, transparent tracking',
        'Creative development: hooks, offers, and motion optimized for your audience',
        'A/B testing and continuous optimization to maximize return on ad spend',
        'Weekly reporting and recommendations you can actually understand and act on',
      ],
      image: '/images/social-ads.jpeg',
    },
    {
      title: 'Organic Social Media',
      subtitle: 'Show up consistently with a brand people trust.',
      body: 'Consistency builds trust, and trust builds business. We design a content system that feels authentically yours—one that\'s easy to maintain and powerful enough to convert. Your social channels become a place where your audience sees you, knows you, and trusts you. We handle content pillars, captions, posting cadence, and community management so you can focus on running your business while your brand grows.',
      bullets: [
        'Strategic content pillars and calendars built around your business goals',
        'Professionally written captions, assets, and templates ready to publish',
        'Profile optimization and competitive analysis to own your space',
        'Community management and engagement playbooks that turn followers into leads',
      ],
      image: '/images/social-Organic .webp',
    },
    {
      title: 'CRM Management',
      subtitle: 'Pipeline clarity and zero lead leakage.',
      body: 'A good CRM is a growth engine. A bad one is a graveyard for forgotten leads. We clean, structure, and automate your CRM so it becomes the brain of your business. Every lead is tracked through the journey, nurtured with precision, and reported on with clarity. You get complete visibility into your pipeline, automatic follow-ups that happen without you, and dashboards that surface the next best action.',
      bullets: [
        'CRM audits, data hygiene, and architecture redesign for maximum efficiency',
        'Automated workflows for follow-up, lead scoring, assignment, and nurturing',
        'Custom dashboards and reporting that surface real-time business intelligence',
        'Integration with your marketing and sales tools for seamless data flow',
      ],
      image: '/images/CRM.webp',
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/10">
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
                loading="eager"
              />
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="text-black/80 font-medium relative group transition-colors"
                  style={{
                    textShadow: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff1493'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(0,0,0,0.8)'
                  }}
                >
                  {link.name}
                  <span
                    className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                    style={{
                      backgroundColor: '#ff1493',
                      boxShadow: '0 0 8px #ff1493',
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
                onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')}
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

      {/* Hero */}
      <section
        className="border-b border-black/10"
        style={{ paddingTop: '100px', paddingBottom: '56px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'center' }}
      >
        <div className="max-w-5xl text-center" style={{ width: '100%' }}>
          <p className="text-xs md:text-sm" style={{ color: '#023e8aff', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Services engineered to perform
          </p>
          <h1
            className="px-4"
            style={{
              fontSize: 'clamp(36px, 8vw, 72px)',
              lineHeight: '1.1',
              letterSpacing: '-0.05em',
              marginBottom: '20px',
              fontWeight: 900,
              fontFamily: 'Montserrat',
              color: '#000000',
              textAlign: 'center',
            }}
          >
            Everything You Need To{' '}
            <span style={{ color: '#ff1493', textTransform: 'uppercase' }}>
              Grow With Conviction
            </span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.65)', maxWidth: '760px', margin: '0 auto', lineHeight: '1.7' }}>
            We combine creative, performance, and operational rigour. Each service is built with clear playbooks, live optimisation, and reporting you can trust.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16" style={{ backgroundColor: '#000000', paddingLeft: '16px', paddingRight: '16px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl w-full" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {serviceSections.map((service, index) => {
            const isBlackCard = index % 2 === 0
            const sectionId = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
            return (
              <div
                id={sectionId}
                key={service.title}
                className="rounded-2xl border hover:border-[#ff1493]/50 transition-all duration-300 flex-col md:flex-row"
              style={{
                backgroundColor: isBlackCard ? '#000000' : '#ffffff',
                borderColor: isBlackCard ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                padding: '24px',
                display: 'flex',
                flexDirection: window.innerWidth < 768 ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                alignItems: 'center',
                gap: '24px',
              }}
            >
              {/* Content Side */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <p style={{ color: '#ff1493', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {service.subtitle}
                  </p>
                  <h3 style={{ fontSize: '26px', letterSpacing: '-0.03em', fontWeight: 800, color: isBlackCard ? '#ffffff' : '#023e8aff', fontFamily: 'Montserrat', marginBottom: '12px' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '16px', lineHeight: '26px', color: isBlackCard ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.65)', marginBottom: '16px' }}>
                    {service.body}
                  </p>
                </div>
                <div style={{ marginTop: '8px' }}>
                  {service.bullets.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                      <span style={{ color: '#ff1493', fontWeight: 800 }}>•</span>
                      <p style={{ fontSize: '14px', lineHeight: '22px', color: isBlackCard ? 'rgba(255,255,255,0.75)' : '#1f1f1f' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div
                className="w-full md:w-auto"
                style={{
                  flex: '0 0 auto',
                  maxWidth: '320px',
                  width: '100%',
                  height: '280px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="border-t border-black/10"
        style={{ backgroundColor: '#f8f9ff', paddingTop: '64px', paddingBottom: '64px', paddingLeft: '32px', paddingRight: '32px', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.08)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.05)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="font-black mb-6" style={{ color: '#023e8aff', fontSize: '48px', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to build, launch, and scale?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Book a discovery call. We will map the quickest path to success.
          </p>
          <CTAButton
            text="Book a Free Consultation"
            variant="primary"
            size="lg"
            ripple
            magnetic
            onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')}
          />
        </div>
      </section>
    </div>
  )
}

