import { useEffect, useState } from 'react'
import CTAButton from '../components/CTAButton'
import Testimonials from '../components/Testimonials'
import WhyPartner from '../components/WhyPartner'

export default function Home() {
  const [navBackground, setNavBackground] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (viewport height)
      const heroHeight = window.innerHeight
      // Set background when scrolled past hero section
      setNavBackground(window.scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  // SEO: Update document title dynamically
  useEffect(() => {
    document.title = 'AI Marketing Agency Australia | No Agency Fees | High ROI Meta Ads | Monsta Media'
  }, [])

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden" role="main">
      {/* Subtle animated background */}
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Navigation Hint */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 transition-colors duration-300 ${navBackground ? 'bg-black' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Brand Logo" className="h-6 md:h-8 w-auto" />
        </div>
        
        {/* Scrolling Marquee - Hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-8 overflow-hidden" style={{ marginRight: '20px' }}>
          <div className="inline-flex whitespace-nowrap animate-marquee">
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
            <span className="text-sm font-semibold text-pink-400" style={{ marginLeft: '80px', marginRight: '80px' }}>Get Leads While You Sleep</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5 items-center" style={{ paddingRight: '0px' }}>
          <button 
            onClick={() => handleNavigation('/services')} 
            className="text-sm font-medium relative group transition-colors"
            style={{
              color: 'rgba(255,255,255,0.8)',
              textShadow: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            Services
            <span
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ 
                backgroundColor: '#ff1493',
                boxShadow: '0 0 8px #ff1493'
              }}
            ></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/crm')} 
            className="text-sm font-medium relative group transition-colors"
            style={{
              color: 'rgba(255,255,255,0.8)',
              textShadow: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            CRM
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ 
                backgroundColor: '#ff1493',
                boxShadow: '0 0 8px #ff1493'
              }}
            ></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/finance')} 
            className="text-sm font-medium relative group transition-colors"
            style={{
              color: 'rgba(255,255,255,0.8)',
              textShadow: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            Finance
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ 
                backgroundColor: '#ff1493',
                boxShadow: '0 0 8px #ff1493'
              }}
            ></span>
          </button>
          
          <button 
            onClick={() => handleNavigation('/about')} 
            className="text-sm font-medium relative group transition-colors"
            style={{
              color: 'rgba(255,255,255,0.8)',
              textShadow: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
          >
            About Us
            <span 
              className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
              style={{ 
                backgroundColor: '#ff1493',
                boxShadow: '0 0 8px #ff1493'
              }}
            ></span>
          </button>
          
          <CTAButton
            text="Start Now"
            variant="primary"
            size="xs"
            ripple
            magnetic
            onClick={() => window.open('https://calendar.monstamediaparramatta.com/calendar', '_blank')}
          />
        </nav>

        {/* Mobile Menu Button */}
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-between px-4 md:px-6 pt-20 md:pt-20 pb-12 md:pb-16 overflow-hidden" aria-labelledby="hero-heading">
        {/* Hero Background Image */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{ 
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)',
            opacity: 0.7
          }}
          role="img"
          aria-label="Digital marketing agency office background"
        />
        <div className="text-center space-y-6 md:space-y-8 max-w-5xl relative z-10 flex-1 flex flex-col justify-center px-4" style={{ paddingTop: '80px' }}>
          <h1 className="font-black tracking-tight leading-tight text-center" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 120px)', letterSpacing: '0.2px' }}>
            <span className="text-white">Monsta Media Parramatta</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mx-auto leading-relaxed text-center" style={{ textAlign: 'center' }}>
            If you can afford $1000/month on ad spend <span className="font-bold text-pink-400">for Meta ads</span>.
            <br />
            No agency fees, no hidden costs. Experience our expertise, risk-free.
          </p>

          {/* CTA and Trust Indicators */}
          <div className="text-center space-y-4 md:space-y-6 relative z-10 px-4" style={{ marginTop: '32px' }}>
            {/* CTA */}
            <div>
              <CTAButton
                text="Claim Your Free Consultation"
                variant="primary"
                size="lg"
                ripple
                magnetic
                onClick={() => (window.location.href = 'https://calendar.monstamediaparramatta.com/calendar')}
              />
            </div>

            {/* Trust Indicators */}
            <div className="flex justify-center gap-8 text-xs text-white/40">
              <div>Australian Owned</div>
              <div>No Long Contracts</div>
              <div>Direct Point of Contact</div>
            </div>
          </div>
        </div>

        {/* Marquee Section */}
        <div className="marquee-row" aria-hidden="true" style={{ position: 'relative', bottom: 'auto', left: 0, width: '100%', height: '80px', padding: '10px 0', boxSizing: 'border-box', background: 'transparent', zIndex: 20, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div className="marquee" style={{ display: 'flex', flexWrap: 'nowrap', width: 'max-content' }}>
            <div className="marquee-track" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', willChange: 'transform' }}>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
            </div>

            <div className="marquee-track marquee-track--clone" style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap', willChange: 'transform' }}>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
              <span className="marquee-item" style={{ display: 'inline-flex', alignItems: 'center', marginRight: '96px', fontWeight: 800, letterSpacing: '2px', whiteSpace: 'nowrap', fontSize: 'clamp(0.85rem, 2vw, 1.35rem)', background: 'linear-gradient(90deg, #f50091 0%, #ffffff 50%, #f50091 100%)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Digital Marketing with more ROAR!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <WhyPartner />

      {/* Testimonials Section */}
      <Testimonials />

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
          display: inline-flex;
        }
        .animate-marquee::after {
          content: attr(data-content);
        }

        /* Hero section marquee animation */
        .marquee-track {
          animation: sb-marquee-move 22s linear infinite;
        }
        
        @keyframes sb-marquee-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 480px) {
          .marquee-row {
            height: 48px !important;
            padding: 8px 0 !important;
          }
          .marquee-item {
            margin-right: 64px !important;
            font-size: clamp(0.8rem, 3.5vw, 1rem) !important;
          }
          .marquee-icon {
            width: clamp(14px, 4vw, 22px) !important;
          }
        }
      `}</style>
    </main>
  )
}
