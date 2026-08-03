import { useState, useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'

export default function Services() {
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
    document.title = 'Affordable Marketing Services | No Agency Fees | AI Automation | Monsta Media Australia'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Budget-friendly marketing services with ZERO agency fees. Affordable AI automation, high-ROI Meta ads, cost-effective SEO & CRM. Pay for results, not retainers. Sydney, NSW & Australia.')
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
    <div className="min-h-screen bg-[#030305] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground ? 'bg-black/85 backdrop-blur-xl shadow-lg shadow-pink-500/10 border-b border-pink-500/20' : 'bg-transparent'}`}>
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
                  className="text-white/80 font-medium relative group transition-colors"
                  style={{
                    textShadow: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ff1493'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
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
              <span onClick={() => { handleNavigation('/crm'); setMobileMenuOpen(false); }} className="text-white text-lg font-medium tracking-wide cursor-pointer" style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>CRM</span>
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

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: '140px', paddingBottom: '56px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'center' }}
      >
        {/* HUD grid floor */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-50" style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)' }}>
          <div className="hud-grid absolute inset-x-0 top-0" style={{ height: '60%' }} />
        </div>
        {/* Brand blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="animate-blob absolute w-[420px] h-[420px] rounded-full" style={{ top: '-10%', right: '-8%', background: 'radial-gradient(circle, rgba(188,19,254,0.22), transparent 70%)' }} />
          <div className="animate-blob absolute w-[380px] h-[380px] rounded-full" style={{ bottom: '-20%', left: '-6%', background: 'radial-gradient(circle, rgba(234,4,139,0.2), transparent 70%)', animationDelay: '3s' }} />
        </div>

        <div className="max-w-5xl text-center relative z-10" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.4}>
          <p className="hud-label" style={{ marginBottom: '12px' }}>
            Services engineered to perform
          </p>
          </Reveal>
          <Reveal variant="up" delay={0.1} amount={0.4}>
          <h1
            className="px-4"
            style={{
              fontSize: 'clamp(36px, 8vw, 72px)',
              lineHeight: '1.1',
              letterSpacing: '-0.05em',
              marginBottom: '20px',
              fontWeight: 900,
              fontFamily: 'Montserrat',
              color: '#ffffff',
              textAlign: 'center',
            }}
          >
            Everything You Need To{' '}
            <span className="text-gradient-animated" style={{ display: 'inline-block' }}>
              Grow With Conviction
            </span>
          </h1>
          </Reveal>
          <Reveal variant="up" delay={0.2} amount={0.3}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '760px', margin: '0 auto', lineHeight: '1.7' }}>
            We combine creative, performance, and operational rigour. Each service is built with clear playbooks, live optimisation, and reporting you can trust.
          </p>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 relative" style={{ paddingLeft: '16px', paddingRight: '16px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl w-full" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {serviceSections.map((service, index) => {
            const sectionId = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
            return (
              <Reveal key={service.title} variant="up" delay={index * 0.05} amount={0.15} margin="-40px">
              <div
                id={sectionId}
                className="rounded-2xl border transition-all duration-300 flex-col md:flex-row"
                style={{
                  backgroundColor: '#0a0a14',
                  borderColor: 'rgba(255,20,147,0.2)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: window.innerWidth < 768 ? 'column' : (index % 2 === 0 ? 'row' : 'row-reverse'),
                  alignItems: 'center',
                  gap: '24px',
                  position: 'relative',
                }}
              >
                {/* HUD corner brackets */}
                <div className="hud-corners" style={{ position: 'absolute', inset: 0, borderRadius: 16 }} />
                {/* Content Side */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
                  <div>
                    <p className="hud-label" style={{ marginBottom: '8px', fontSize: '10px' }}>
                      {service.subtitle}
                    </p>
                    <h3 style={{ fontSize: '26px', letterSpacing: '-0.03em', fontWeight: 800, color: '#ffffff', fontFamily: 'Montserrat', marginBottom: '12px' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '16px', lineHeight: '26px', color: 'rgba(255,255,255,0.78)', marginBottom: '16px' }}>
                      {service.body}
                    </p>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    {service.bullets.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                        <span style={{ color: '#ff1493', fontWeight: 800, textShadow: '0 0 8px rgba(255,20,147,0.6)' }}>▸</span>
                        <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.72)' }}>{item}</p>
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
                    position: 'relative',
                    zIndex: 1,
                    border: '1px solid rgba(255,20,147,0.25)',
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
                      transition: 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.06)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                  />
                </div>
              </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,20,147,0.2)', paddingTop: '64px', paddingBottom: '64px', paddingLeft: '32px', paddingRight: '32px', display: 'flex', justifyContent: 'center' }}
      >
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,20,147,0.14), transparent 70%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,19,254,0.12), transparent 70%)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Reveal variant="up" amount={0.3}>
          <h2 className="font-black mb-6" style={{ color: '#ffffff', fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to build, launch, and scale?
          </h2>
          </Reveal>
          <Reveal variant="up" delay={0.12} amount={0.3}>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Book a discovery call. We will map the quickest path to success.
          </p>
          </Reveal>
          <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
            <CTAButton
              text="Book a Free Consultation"
              variant="primary"
              size="lg"
              ripple
              magnetic
              onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
