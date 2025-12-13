import { useState } from 'react'
import CTAButton from '../components/CTAButton'

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'CRM', path: '/crm' },
    { name: 'Finance', path: '/finance' },
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

  return (
    <div className="min-h-screen bg-white text-black">
      <style>
        {`
          .flip-cube:hover .cube-container {
            transform: rotateX(180deg);
          }
        `}
      </style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:bg-white/80 md:backdrop-blur-xl md:border-b md:border-black/10">
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
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
          {/* Mobile Menu Overlay */}
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
      <section className="border-b border-black/10" style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl text-center" style={{ width: '100%' }}>
          <h1 style={{ fontSize: '80px', lineHeight: '88px', letterSpacing: '-0.05em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#000000', textAlign: 'center' }}>
            About Monsta Media Parramatta
          </h1>
          <p style={{ fontSize: '20px', color: '#ff1493', maxWidth: '900px', margin: '0 auto 32px', lineHeight: '1.6', textAlign: 'center', fontWeight: 700 }}>
            A Digital Agency Focused On Vision, People, Branding & Your ROI
          </p>
          <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.6)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8', textAlign: 'center' }}>
            Monsta Media Parramatta is an Australian-owned and operated digital marketing agency based in Parramatta, Sydney. We are brand-owned, brand-operated, and proudly keep everything in-house.
          </p>
        </div>
      </section>

      {/* Key Differentiators */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '48px', fontWeight: 900, fontFamily: 'Montserrat', color: '#023e8a', textAlign: 'center' }}>
            Why Choose Monsta Media?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div style={{ padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏢</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Brand Owned & Operated
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                We are 100% brand-owned and brand-operated. No outsourcing, no third parties—just our dedicated team delivering excellence.
              </p>
            </div>

            <div style={{ padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Your Data is Protected
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                All services are performed in-house. Your data never leaves our secure environment, ensuring complete privacy and protection.
              </p>
            </div>

            <div style={{ padding: '40px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                AI-Powered Automation
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                At the cutting edge of marketing technology, leveraging AI automation to maximize efficiency and deliver superior results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What MONSTA Stands For - Flip Cube Gallery */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <h2 style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '48px', fontWeight: 900, fontFamily: 'Montserrat', textAlign: 'center' }}>
            <span style={{ color: '#023e8a' }}>What Does </span>
            <span style={{ color: '#ff1493' }}>MONSTA</span>
            <span style={{ color: '#023e8a' }}> Stand For?</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            justifyItems: 'center',
            alignItems: 'center',
          }}>
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
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', backgroundColor: '#f9f9f9', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-4xl" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#023e8a', textAlign: 'center' }}>
            Our Story
          </h2>

          <div style={{ fontSize: '16px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '24px', textAlign: 'center' }}>
            <p style={{ marginBottom: '20px' }}>
              Based in <strong style={{ color: '#ff1493' }}>Parramatta, Sydney</strong>, Monsta Media Parramatta is a proudly <strong style={{ color: '#ff1493' }}>Australian-owned and operated</strong> digital marketing agency helping local and national businesses achieve extraordinary growth and revenue acceleration.
            </p>

            <p style={{ marginBottom: '20px' }}>
              With over a decade of experience perfecting our craft, we've mastered the art of digital marketing. From website development and social media management to Google Ads, Facebook & Instagram Ads, and SEO campaigns—we deliver results that speak for themselves. Our deep understanding of the Australian market gives us a unique advantage in creating campaigns that resonate with local audiences.
            </p>

            <p style={{ marginBottom: '20px' }}>
              What sets us apart is our commitment to being <strong style={{ color: '#ff1493' }}>brand-owned and brand-operated</strong>. We don't outsource. We don't cut corners. Every service is performed by our dedicated in-house team right here in Parramatta, ensuring your data remains secure and your campaigns receive the attention they deserve.
            </p>

            <p style={{ marginBottom: '20px' }}>
              We're at the <strong style={{ color: '#ff1493' }}>cutting edge of marketing technology</strong>, leveraging AI automation and advanced tools to streamline processes, optimize campaigns, and deliver superior results. Our investment in the latest technology means you get more efficiency, better targeting, and higher ROI.
            </p>

            <p>
              Our expertise extends beyond digital marketing—we've mastered the <strong style={{ color: '#ff1493' }}>Art of Closing</strong>. The biggest gap in lead generation isn't getting leads; it's closing them. Our award-winning sales methodology ensures that the leads we deliver don't just arrive—they convert into paying customers.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', paddingLeft: '80px', paddingRight: '80px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <h2 style={{ fontSize: '48px', lineHeight: '56px', letterSpacing: '-0.03em', marginBottom: '32px', fontWeight: 900, fontFamily: 'Montserrat', color: '#023e8a', textAlign: 'center' }}>
            Our Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                E-Commerce Excellence
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Building high-converting online stores that drive sales and grow your brand presence.
              </p>
            </div>

            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Lead Generation
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Delivering quality leads that convert into long-term customers and revenue.
              </p>
            </div>

            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Web Traffic Growth
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Driving targeted traffic to your website through proven strategies and optimization.
              </p>
            </div>

            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Brand Development
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Creating powerful brand identities that resonate with your audience and stand out.
              </p>
            </div>

            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                Organic Social Media
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Building authentic engagement and community around your brand on social platforms.
              </p>
            </div>

            <div
              className="group"
              style={{
                padding: '32px',
                backgroundColor: '#f9f9f9',
                borderRadius: '12px',
                borderLeft: '4px solid #ff1493',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,20,147,0.2)';
                e.currentTarget.style.backgroundColor = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.backgroundColor = '#f9f9f9';
              }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px', color: '#3a8dbd', fontFamily: 'Montserrat' }}>
                AI Automation & Technology
              </h3>
              <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgba(0,0,0,0.6)' }}>
                Leveraging cutting-edge AI and automation tools to maximize marketing efficiency and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '50px', paddingBottom: '50px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.08)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.05)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="font-black mb-6" style={{ color: '#023e8aff', fontSize: '48px', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Partner with Monsta?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px' }}>
            Let's discuss how we can accelerate your business growth with our proven digital marketing strategies.
          </p>
          <CTAButton text="Book Your Free Consultation" variant="primary" size="lg" ripple magnetic onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')} />
        </div>
      </section>
    </div>
  )
}
