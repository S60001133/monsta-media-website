import { useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import { scrollToTop } from '../lib/scroll'
import { setSeo } from '../lib/seo'

export default function Services() {
  // SEO: unique title + description + OG + Twitter + canonical
  useEffect(() => {
    setSeo({
      title: 'Digital Marketing Services Parramatta | Meta Ads, SEO & AI Automation | Monsta Media',
      description: 'Budget-friendly marketing services with transparent pricing. High-ROI Meta ads, cost-effective SEO, web design, CRM & AI automation — all done in-house by our Australian-owned team.',
      path: '/services',
      image: '/images/SEO.jpeg',
    })
  }, [])

  const openEnquiries = () => {
    window.history.pushState({}, '', '/enquiries')
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
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
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Hero — fills exactly one viewport (no scroll needed to pass it) */}
      <section
        className="relative flex items-center"
        style={{ minHeight: '100vh', paddingTop: '110px', paddingBottom: '40px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="max-w-5xl text-center relative z-10" style={{ width: '100%' }}>
          <p className="eyebrow" style={{ marginBottom: '12px' }}>
            Services engineered to perform
          </p>
          <h1
            className="display-xl px-4"
            style={{
              fontSize: 'clamp(38px, 6.5vw, 76px)',
              marginBottom: '20px',
            }}
          >
            Everything You Need To{' '}
            <span className="display-accent" style={{ display: 'inline-block' }}>
              Grow With Conviction
            </span>
          </h1>
          <p className="body-copy" style={{ fontSize: '18px', maxWidth: '760px', margin: '0 auto', lineHeight: '1.7' }}>
            We combine creative, performance, and operational rigour. Each service is built with clear playbooks, live optimisation, and reporting you can trust.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="relative" style={{ background: 'var(--paper-2)' }}>
        {serviceSections.map((service, index) => {
          const sectionId = service.title.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, 'and')
          const reverse = index % 2 === 1
          const white = index % 2 === 0
          return (
            <div
              key={service.title}
              id={sectionId}
              className="hairline-t"
              style={{
                width: '100%',
                background: white ? '#FFFFFF' : 'var(--paper)',
                color: white ? '#1C1812' : 'var(--ink)',
                // flip the dark-theme tokens to dark-on-white for white bands
                ...(white
                  ? {
                      '--ink': '#1C1812',
                      '--ink-2': 'rgba(28, 24, 18, 0.68)',
                      '--ink-3': 'rgba(28, 24, 18, 0.5)',
                      '--hairline': 'rgba(28, 24, 18, 0.12)',
                      '--hairline-strong': 'rgba(28, 24, 18, 0.25)',
                      '--surface': '#F7F7F7',
                    }
                  : {}) as React.CSSProperties,
              }}
            >
              <div className="max-w-6xl w-full mx-auto" style={{ padding: '48px 8px' }}>
                {/* Top row: content + image */}
                <div className="flex flex-col md:flex-row md:items-start items-center" style={{ gap: '32px' }}>
                  {/* Content Side */}
                  <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1, width: '100%' }}>
                    <div>
                      <p className="eyebrow-ink" style={{ marginBottom: '8px' }}>
                        {service.subtitle}
                      </p>
                      <h3 className="display" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', marginBottom: '14px', color: 'var(--color-brand-pink)' }}>
                        {service.title}
                      </h3>
                      <p className="body-copy" style={{ fontSize: '16px', lineHeight: '26px', marginBottom: '18px', maxWidth: '820px' }}>
                        {service.body}
                      </p>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div
                    className={`w-full md:w-[30%] md:max-w-[420px] md:shrink-0 ${reverse ? 'md:order-first' : ''}`}
                    style={{
                      height: '220px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      position: 'relative',
                      border: '1px solid var(--hairline)',
                      background: 'var(--surface)',
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
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
                    />
                  </div>
                </div>

                {/* Bottom row: bullets spanning full width */}
                <div style={{ marginTop: '28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px 24px' }}>
                  {service.bullets.map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: 'var(--color-brand-pink)', fontWeight: 700, lineHeight: '22px' }}>▸</span>
                      <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--ink-2)' }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden"
        style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '32px', paddingRight: '32px', display: 'flex', justifyContent: 'center' }}
      >
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="h2-xl" style={{ marginBottom: '16px', color: 'var(--color-brand-pink)' }}>
            Ready to build, launch, and scale?
          </h2>
          <p className="body-copy" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Book a discovery call. We will map the quickest path to success.
          </p>
          <CTAButton
            text="Book a Free Consultation"
            variant="primary"
            size="lg"
            onClick={openEnquiries}
          />
        </div>
      </section>
    </div>
  )
}
