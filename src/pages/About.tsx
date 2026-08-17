import { useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import { scrollToTop } from '../lib/scroll'

const PINK = '#E9178C'

export default function About() {
  // SEO: Update document title
  useEffect(() => {
    document.title = 'About Monsta Media Parramatta | Australian Owned Digital Marketing Agency'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Monsta Media Parramatta is an Australian-owned and operated digital marketing agency based in Parramatta, Sydney. Brand-owned, brand-operated, everything in-house.')
    }
  }, [])

  const openEnquiries = () => {
    window.history.pushState({}, '', '/enquiries')
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
  }

  const flipCubes = [
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7ab91c234b2421bbe.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb71e31ec06851f668d.jpeg', alt: 'Certificate 1' },
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb77bdc533e62818800.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7ab91c241a6421bbf.jpeg', alt: 'Certificate 2' },
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb71e31ecf99b1f668e.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7ab91c2448c421bba.jpeg', alt: 'Certificate 3' },
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb73469607c1f41aa45.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7c3a599bbbd01f261.jpeg', alt: 'Certificate 4' },
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7ab91c21047421bb9.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7521c84abf1ea8d8f.jpeg', alt: 'Certificate 5' },
    { front: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb734696063f041aa37.png', back: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69035fb7c3a5998baf01f262.jpeg', alt: 'Certificate 6' },
  ]

  const differentiators = [
    {
      icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01',
      title: 'Brand Owned & Operated',
      desc: 'We are 100% brand-owned and brand-operated. No outsourcing, no third parties—just our dedicated team delivering excellence.',
    },
    {
      icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4',
      title: 'Your Data is Protected',
      desc: 'All services are performed in-house. Your data never leaves our secure environment, ensuring complete privacy and protection.',
    },
    {
      icon: 'M12 2a7 7 0 00-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 002 2h4a2 2 0 002-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 00-7-7zM9 20h6v2H9v-2z',
      title: 'AI-Powered Automation',
      desc: 'At the cutting edge of marketing technology, leveraging AI automation to maximize efficiency and deliver superior results.',
    },
  ]

  const expertise = [
    { title: 'E-Commerce Excellence', desc: 'Building high-converting online stores that drive sales and grow your brand presence.' },
    { title: 'Lead Generation', desc: 'Delivering quality leads that convert into long-term customers and revenue.' },
    { title: 'Web Traffic Growth', desc: 'Driving targeted traffic to your website through proven strategies and optimization.' },
    { title: 'Brand Development', desc: 'Creating powerful brand identities that resonate with your audience and stand out.' },
    { title: 'Organic Social Media', desc: 'Building authentic engagement and community around your brand on social platforms.' },
    { title: 'AI Automation & Technology', desc: 'Leveraging cutting-edge AI and automation tools to maximize marketing efficiency and results.' },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Hero — fills exactly one viewport (no scroll needed to pass it) */}
      <section
        className="relative flex items-center"
        style={{ minHeight: '100vh', paddingTop: '96px', paddingBottom: '32px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className="max-w-6xl text-center relative z-10" style={{ width: '100%' }}>
          <h1 className="display-xl" style={{ fontSize: 'clamp(34px, 5.5vw, 58px)', marginBottom: '20px' }}>
            About <span className="display-accent">Monsta Media</span> Parramatta
          </h1>
          <p style={{ fontSize: '18px', color: PINK, maxWidth: '900px', margin: '0 auto 16px', lineHeight: '1.6', textAlign: 'center', fontWeight: 500 }}>
            A Digital Agency Focused On Vision, People, Branding & Your ROI
          </p>
          <p className="body-copy" style={{ fontSize: '15px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', textAlign: 'center' }}>
            Monsta Media Parramatta is an Australian-owned and operated digital marketing agency based in Parramatta, Sydney. We are brand-owned, brand-operated, and proudly keep everything in-house.
          </p>
        </div>
      </section>

      {/* Key Differentiators — white band */}
      <section
        className="relative"
        style={{
          paddingTop: '96px', paddingBottom: '104px', paddingLeft: '24px', paddingRight: '24px',
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
          <h2 className="h2-xl" style={{ marginBottom: '48px', textAlign: 'center', color: 'var(--color-brand-pink)' }}>
            Why Choose Monsta Media?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {differentiators.map((d, idx) => (
              <div
                key={idx}
                style={{
                  padding: '36px 28px',
                  background: 'var(--surface)',
                  borderRadius: '14px',
                  border: '1px solid var(--hairline)',
                  textAlign: 'center',
                  height: '100%',
                  position: 'relative',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60, margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(233,23,140,0.07)', border: '1px solid rgba(233,23,140,0.25)' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={PINK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={d.icon} />
                  </svg>
                </div>
                <h3 className="display" style={{ fontSize: '21px', marginBottom: '14px' }}>
                  {d.title}
                </h3>
                <p className="body-copy" style={{ fontSize: '15px', lineHeight: '24px' }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What MONSTA Stands For - Flip Cube Gallery — black band */}
      <section style={{ paddingTop: '88px', paddingBottom: '88px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center', background: 'var(--paper)' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 className="h2-xl" style={{ marginBottom: '48px', textAlign: 'center', color: 'var(--color-brand-pink)' }}>
            What Does <span className="display-accent">MONSTA</span> Stand For?
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '40px',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            {flipCubes.map((cube, idx) => (
              <div
                key={idx}
                className="flip-cube"
                style={{
                  width: '250px',
                  height: '250px',
                  perspective: '1000px',
                  position: 'relative',
                  margin: '0 auto',
                }}
              >
                <div
                  className="cube-container"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(.5,-0.5,.5,1.5)',
                    borderRadius: '14px',
                    border: '1px solid var(--hairline)',
                  }}
                >
                  <div
                    className="cube-front"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transform: 'rotateX(0deg) translateZ(125px)',
                    }}
                  >
                    <img
                      src={cube.front}
                      alt={`${cube.alt} Front`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div
                    className="cube-back"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      backfaceVisibility: 'hidden',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transform: 'rotateX(180deg) translateZ(125px)',
                    }}
                  >
                    <img
                      src={cube.back}
                      alt={`${cube.alt} Back`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story — white band */}
      <section
        className="relative"
        style={{
          paddingTop: '96px', paddingBottom: '104px', paddingLeft: '24px', paddingRight: '24px',
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
        <div className="max-w-4xl" style={{ width: '100%' }}>
          <h2 className="h2-xl" style={{ marginBottom: '32px', textAlign: 'center', color: 'var(--color-brand-pink)' }}>
            Our Story
          </h2>

          <div className="body-copy" style={{ fontSize: '16px', lineHeight: '28px', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ marginBottom: '20px' }}>
              Based in <strong style={{ color: PINK }}>Parramatta, Sydney</strong>, Monsta Media Parramatta is a proudly <strong style={{ color: PINK }}>Australian-owned and operated</strong> digital marketing agency helping local and national businesses achieve extraordinary growth and revenue acceleration.
            </p>

            <p style={{ marginBottom: '20px' }}>
              With over a decade of experience perfecting our craft, we've mastered the art of digital marketing. From website development and social media management to Google Ads, Facebook & Instagram Ads, and SEO campaigns—we deliver results that speak for themselves. Our deep understanding of the Australian market gives us a unique advantage in creating campaigns that resonate with local audiences.
            </p>

            <p style={{ marginBottom: '20px' }}>
              What sets us apart is our commitment to being <strong style={{ color: PINK }}>brand-owned and brand-operated</strong>. We don't outsource. We don't cut corners. Every service is performed by our dedicated in-house team right here in Parramatta, ensuring your data remains secure and your campaigns receive the attention they deserve.
            </p>

            <p style={{ marginBottom: '20px' }}>
              We're at the <strong style={{ color: PINK }}>cutting edge of marketing technology</strong>, leveraging AI automation and advanced tools to streamline processes, optimize campaigns, and deliver superior results. Our investment in the latest technology means you get more efficiency, better targeting, and higher ROI.
            </p>

            <p>
              Our expertise extends beyond digital marketing—we've mastered the <strong style={{ color: PINK }}>Art of Closing</strong>. The biggest gap in lead generation isn't getting leads; it's closing them. Our award-winning sales methodology ensures that the leads we deliver don't just arrive—they convert into paying customers.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview — black band */}
      <section style={{ paddingTop: '88px', paddingBottom: '88px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center', background: 'var(--paper)' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <h2 className="h2-xl" style={{ marginBottom: '40px', textAlign: 'center', color: 'var(--color-brand-pink)' }}>
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '30px',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  borderLeft: `3px solid ${PINK}`,
                  borderTop: '1px solid var(--hairline)',
                  borderRight: '1px solid var(--hairline)',
                  borderBottom: '1px solid var(--hairline)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(233,23,140,0.04)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--surface)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <h3 className="display" style={{ fontSize: '20px', marginBottom: '10px' }}>
                  {item.title}
                </h3>
                <p className="body-copy" style={{ fontSize: '15px', lineHeight: '24px' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section — black band */}
      <section className="relative" style={{ paddingTop: '80px', paddingBottom: '96px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', background: 'var(--paper)' }}>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="h2-xl" style={{ marginBottom: '20px', color: 'var(--color-brand-pink)' }}>
            Ready to Partner with Monsta?
          </h2>
          <p className="body-copy" style={{ fontSize: '18px', lineHeight: '28px', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Let's discuss how we can accelerate your business growth with our proven digital marketing strategies.
          </p>
          <CTAButton text="Book Your Free Consultation" variant="primary" size="lg" onClick={openEnquiries} />
        </div>
      </section>
    </div>
  )
}
