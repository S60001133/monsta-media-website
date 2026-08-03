import { useState, useEffect } from 'react'
import CTAButton from '../components/CTAButton'
import Reveal from '../components/Reveal'
import { Stagger, StaggerItem } from '../components/Reveal'

export default function About() {
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
    document.title = 'About Monsta Media Parramatta | Australian Owned Digital Marketing Agency'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Monsta Media Parramatta is an Australian-owned and operated digital marketing agency based in Parramatta, Sydney. Brand-owned, brand-operated, everything in-house.')
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
    <div className="min-h-screen bg-[#030305] text-white">
      <style>
        {`
          .flip-cube:hover .cube-container {
            transform: rotateX(180deg);
          }
          .flip-cube .cube-container {
            box-shadow: 0 0 30px rgba(255,20,147,0.15);
          }
        `}
      </style>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBackground ? 'bg-black/85 backdrop-blur-xl shadow-lg shadow-pink-500/10 border-b border-pink-500/20' : 'bg-transparent'}`}>
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
                loading="eager"
              />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="text-white/80 font-medium relative group transition-colors"
                  style={{
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

      {/* Custom Mobile Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <nav className="relative z-50 flex flex-col items-center justify-center h-full gap-8">
            <button
              onClick={() => { handleNavigation('/'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              Home
            </button>
            <button
              onClick={() => { handleNavigation('/services'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              Services
            </button>
            <button
              onClick={() => { handleNavigation('/crm'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              CRM
            </button>
            <button
              onClick={() => { handleNavigation('/finance'); setMobileMenuOpen(false); }}
              className="text-lg font-medium text-white hover:text-pink-400 transition-colors"
              style={{ fontFamily: 'Montserrat', letterSpacing: '0.01em' }}
            >
              Finance
            </button>
            <CTAButton
              text="Start Now"
              variant="primary"
              size="md"
              ripple
              magnetic
              onClick={() => window.location.href = 'https://calendar.monstamediaparramatta.com/calendar'}
              className="mt-9"
            />
          </nav>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ paddingTop: '140px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center' }}>
        {/* HUD grid floor */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 opacity-50" style={{ maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black 10%, transparent 75%)' }}>
          <div className="hud-grid absolute inset-x-0 top-0" style={{ height: '60%' }} />
        </div>
        {/* Brand blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="animate-blob absolute w-[460px] h-[460px] rounded-full" style={{ top: '-15%', right: '-10%', background: 'radial-gradient(circle, rgba(188,19,254,0.22), transparent 70%)' }} />
          <div className="animate-blob absolute w-[400px] h-[400px] rounded-full" style={{ bottom: '-25%', left: '-8%', background: 'radial-gradient(circle, rgba(234,4,139,0.2), transparent 70%)', animationDelay: '3s' }} />
        </div>
        <div className="max-w-6xl text-center relative z-10" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.4}>
          <div className="hud-label" style={{ marginBottom: '14px' }}>Who We Are</div>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: '1.1', letterSpacing: '-0.05em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#ffffff', textAlign: 'center' }}>
            About <span className="text-gradient-animated" style={{ display: 'inline-block' }}>Monsta Media</span> Parramatta
          </h1>
          </Reveal>
          <Reveal variant="up" delay={0.15} amount={0.4}>
          <p style={{ fontSize: '20px', color: '#ff1493', maxWidth: '900px', margin: '0 auto 32px', lineHeight: '1.6', textAlign: 'center', fontWeight: 700, textShadow: '0 0 20px rgba(255,20,147,0.4)' }}>
            A Digital Agency Focused On Vision, People, Branding & Your ROI
          </p>
          </Reveal>
          <Reveal variant="up" delay={0.28} amount={0.3}>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', textAlign: 'center' }}>
            Monsta Media Parramatta is an Australian-owned and operated digital marketing agency based in Parramatta, Sydney. We are brand-owned, brand-operated, and proudly keep everything in-house.
          </p>
          </Reveal>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="relative" style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div className="hud-label" style={{ textAlign: 'center', marginBottom: '10px' }}>The Monsta Difference</div>
          <h2 style={{ fontSize: 'clamp(34px, 5.5vw, 48px)', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '48px', fontWeight: 900, fontFamily: 'Montserrat', color: '#ffffff', textAlign: 'center' }}>
            Why Choose Monsta Media?
          </h2>
          </Reveal>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8" gap={0.14} amount={0.1}>
            {differentiators.map((d, idx) => (
              <StaggerItem key={idx}>
              <div className="neon-border-static rounded-xl" style={{ padding: '40px', backgroundColor: '#0a0a14', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)', textAlign: 'center', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, margin: '0 auto 20px', borderRadius: 16, background: 'rgba(255,20,147,0.1)', border: '1px solid rgba(255,20,147,0.3)' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ff1493" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 6px rgba(255,20,147,0.6))' }}>
                    <path d={d.icon} />
                  </svg>
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {d.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(255,255,255,0.65)' }}>
                  {d.desc}
                </p>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What MONSTA Stands For - Flip Cube Gallery */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Reveal variant="up" amount={0.3}>
          <h2 style={{ fontSize: 'clamp(34px, 5.5vw, 48px)', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '48px', fontWeight: 900, fontFamily: 'Montserrat', textAlign: 'center' }}>
            <span style={{ color: '#ffffff' }}>What Does </span>
            <span className="text-gradient-animated" style={{ display: 'inline-block' }}>MONSTA</span>
            <span style={{ color: '#ffffff' }}> Stand For?</span>
          </h2>
          </Reveal>

          <Stagger
            className=""
            gap={0.1}
            amount={0.1}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            {flipCubes.map((cube, idx) => (
              <StaggerItem key={idx}>
              <div
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
                    boxShadow: '0 0 30px rgba(255,20,147,0.2)',
                    border: '1px solid rgba(255,20,147,0.3)',
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
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
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
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </div>
                </div>
              </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative" style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div className="max-w-4xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div className="hud-label" style={{ textAlign: 'center', marginBottom: '10px' }}>Our Journey</div>
          <h2 style={{ fontSize: 'clamp(34px, 5.5vw, 48px)', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#ffffff', textAlign: 'center' }}>
            Our Story
          </h2>
          </Reveal>

          <Reveal variant="fade" delay={0.1} amount={0.1}>
          <div style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(255,255,255,0.75)', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ marginBottom: '20px' }}>
              Based in <strong style={{ color: '#ff1493', textShadow: '0 0 10px rgba(255,20,147,0.5)' }}>Parramatta, Sydney</strong>, Monsta Media Parramatta is a proudly <strong style={{ color: '#ff1493', textShadow: '0 0 10px rgba(255,20,147,0.5)' }}>Australian-owned and operated</strong> digital marketing agency helping local and national businesses achieve extraordinary growth and revenue acceleration.
            </p>

            <p style={{ marginBottom: '20px' }}>
              With over a decade of experience perfecting our craft, we've mastered the art of digital marketing. From website development and social media management to Google Ads, Facebook & Instagram Ads, and SEO campaigns—we deliver results that speak for themselves. Our deep understanding of the Australian market gives us a unique advantage in creating campaigns that resonate with local audiences.
            </p>

            <p style={{ marginBottom: '20px' }}>
              What sets us apart is our commitment to being <strong style={{ color: '#ff1493', textShadow: '0 0 10px rgba(255,20,147,0.5)' }}>brand-owned and brand-operated</strong>. We don't outsource. We don't cut corners. Every service is performed by our dedicated in-house team right here in Parramatta, ensuring your data remains secure and your campaigns receive the attention they deserve.
            </p>

            <p style={{ marginBottom: '20px' }}>
              We're at the <strong style={{ color: '#ff1493', textShadow: '0 0 10px rgba(255,20,147,0.5)' }}>cutting edge of marketing technology</strong>, leveraging AI automation and advanced tools to streamline processes, optimize campaigns, and deliver superior results. Our investment in the latest technology means you get more efficiency, better targeting, and higher ROI.
            </p>

            <p>
              Our expertise extends beyond digital marketing—we've mastered the <strong style={{ color: '#ff1493', textShadow: '0 0 10px rgba(255,20,147,0.5)' }}>Art of Closing</strong>. The biggest gap in lead generation isn't getting leads; it's closing them. Our award-winning sales methodology ensures that the leads we deliver don't just arrive—they convert into paying customers.
            </p>
          </div>
          </Reveal>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <Reveal variant="up" amount={0.3}>
          <div className="hud-label" style={{ textAlign: 'center', marginBottom: '10px' }}>What We Do</div>
          <h2 style={{ fontSize: 'clamp(34px, 5.5vw, 48px)', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#ffffff', textAlign: 'center' }}>
            Our Expertise
          </h2>
          </Reveal>

          <Reveal variant="fade" amount={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((item, idx) => (
              <div
                key={idx}
                className="group neon-border-static"
                style={{
                  padding: '32px',
                  backgroundColor: '#0a0a14',
                  borderRadius: '12px',
                  borderLeft: '4px solid #ff1493',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,20,147,0.25)';
                  e.currentTarget.style.backgroundColor = '#12122a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = '#0a0a14';
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(255,255,255,0.65)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center' }}>
        <div className="neon-divider" style={{ position: 'absolute', top: 0, left: '10%', right: '10%' }} />
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,20,147,0.14), transparent 70%)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,19,254,0.12), transparent 70%)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Reveal variant="up" amount={0.3}>
          <h2 className="font-black mb-6" style={{ color: '#ffffff', fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Partner with Monsta?
          </h2>
          </Reveal>
          <Reveal variant="up" delay={0.12} amount={0.3}>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Let's discuss how we can accelerate your business growth with our proven digital marketing strategies.
          </p>
          </Reveal>
          <div className="pulse-ring relative inline-block btn-shine" style={{ borderRadius: 14 }}>
            <CTAButton text="Book Your Free Consultation" variant="primary" size="lg" ripple magnetic onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')} />
          </div>
        </div>
      </section>
    </div>
  )
}
