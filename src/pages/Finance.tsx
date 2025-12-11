import { useState } from 'react'
import CTAButton from '../components/CTAButton'

export default function Finance() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'CRM', path: '/crm' },
    { name: 'About Us', path: '/about' },
  ]

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setIsOpen(false)
  }

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
                src="/images/monsta parramatta logo (1).svg" 
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-black p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden py-6 space-y-4 border-t border-black/10">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  className="block w-full text-left text-black/80 font-medium hover:text-pink-500 transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)', paddingTop: '140px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        <div className="max-w-4xl text-center" style={{ width: '100%' }}>
          <h1 className="font-black mb-6" style={{ fontSize: '56px', fontFamily: 'Montserrat', color: '#000000', letterSpacing: '-1px' }}>
            What Comes First: The <span style={{ color: '#ff1493' }}>Budget</span> or the <span style={{ color: '#ff1493' }}>Marketing</span>?
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.65)', marginBottom: '24px', maxWidth: '700px' }}>
              Every business needs marketing to grow, but finding the budget can be a challenge. That's where we step in—we can organize flexible financing so you can invest in the marketing your business needs, without the upfront burden.
            </p>
          </div>
        </div>
      </section>

      {/* Why Finance with Us Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '900px 900px' }}>
        <div className="max-w-6xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="font-black mb-4" style={{ fontSize: '40px', fontFamily: 'Montserrat', color: '#023e8aff', letterSpacing: '-0.5px' }}>
              Why Choose Our Finance Solutions?
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.6)', maxWidth: '600px', margin: '0 auto' }}>
              Flexible payment plans designed to help your business grow without financial stress
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {[
              { title: 'No Upfront Costs', desc: 'Start your marketing campaign without a large initial investment', icon: '💰' },
              { title: 'Flexible Terms', desc: 'Choose payment plans that work with your cash flow and budget', icon: '📅' },
              { title: 'Fast Approval', desc: 'Quick and simple application process to get you started immediately', icon: '⚡' },
              { title: 'Scale as You Grow', desc: 'Adjust your financing as your business expands and evolves', icon: '📈' },
              { title: 'Transparent Pricing', desc: 'No hidden fees or surprises—clear terms from day one', icon: '🔍' },
              { title: 'Local Support', desc: 'Australian-owned with dedicated support you can trust', icon: '🦘' }
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
                <div style={{ fontSize: '32px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {typeof benefit.icon === 'string' ? benefit.icon : benefit.icon}
                </div>
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

      {/* How It Works Section */}
      <section style={{ backgroundImage: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '700px 700px' }}>
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="font-black mb-4" style={{ fontSize: '40px', fontFamily: 'Montserrat', color: '#ffffff', letterSpacing: '-0.5px' }}>
              How It Works
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
              Simple steps to unlock the marketing your business deserves
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
            {[
              { step: '01', title: 'Book a Consultation', desc: 'Let us discuss your business goals and marketing needs' },
              { step: '02', title: 'Custom Package Design', desc: 'We build a tailored marketing solution for your business' },
              { step: '03', title: 'Finance Approval', desc: 'We organize flexible financing that fits your budget' },
              { step: '04', title: 'Launch & Grow', desc: 'Your campaign goes live and we track performance together' }
            ].map((item, idx) => (
              <div key={idx} style={{ position: 'relative', padding: '32px 24px', background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease', flex: '1 1 220px', minWidth: '220px', maxWidth: '280px' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div style={{ fontSize: '48px', fontWeight: 900, color: '#ff1493', fontFamily: 'Montserrat', marginBottom: '16px', opacity: 0.3 }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', color: '#ffffff', fontFamily: 'Montserrat' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(255,255,255,0.7)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Requirements Section */}
      <section style={{ backgroundColor: '#f8f9ff', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', contentVisibility: 'auto', containIntrinsicSize: '800px 800px' }}>
        <div className="max-w-5xl" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="font-black mb-4" style={{ fontSize: '40px', fontFamily: 'Montserrat', color: '#023e8aff', letterSpacing: '-0.5px' }}>
              Finance Requirements
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.6)', maxWidth: '620px', margin: '0 auto' }}>
              Simple, straightforward criteria to help you access the marketing funding you need
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '48px' }}>
            {[
              { 
                title: 'Minimum Finance Amount', 
                requirement: '$5,000', 
                desc: 'Our finance solutions start at $5,000 to ensure meaningful investment in your marketing growth'
              },
              { 
                title: 'Business History', 
                requirement: '1+ Year', 
                desc: 'Your business must have been operating for at least one year to demonstrate stability and commitment'
              },
              { 
                title: 'Employment History', 
                requirement: '2+ Years', 
                desc: 'If self-employed or sole trader, we require at least two years of continuous employment history'
              }
            ].map((req, idx) => (
              <div key={idx} style={{ padding: '40px 32px', backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid rgba(255, 20, 147, 0.15)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'all 0.3s ease', textAlign: 'center' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,20,147,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255,20,147,0.15)';
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px', color: '#3a8dbdff', fontFamily: 'Montserrat' }}>
                  {req.title}
                </h3>
                <p style={{ fontSize: '32px', fontWeight: 900, color: '#ff1493', fontFamily: 'Montserrat', marginBottom: '16px' }}>
                  {req.requirement}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '22px', color: 'rgba(0,0,0,0.65)' }}>
                  {req.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ padding: '48px 40px', backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid rgba(255, 20, 147, 0.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#000000', fontFamily: 'Montserrat', textAlign: 'center' }}>
              What You'll Need to Apply
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
              {[
                { item: 'Proof of Business Registration', detail: 'ABN or ACN documentation' },
                { item: 'Financial Statements', detail: 'Recent business financial or employment records' },
                { item: 'Identification', detail: 'Driver\'s license or passport' },
              ].map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '20px', color: '#ff1493', flexShrink: 0 }}>✓</div>
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>
                      {doc.item}
                    </p>
                    <p style={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
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
      <section style={{ backgroundColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '40px', paddingRight: '40px', display: 'flex', justifyContent: 'center', position: 'relative', overflow: 'hidden', contentVisibility: 'auto', containIntrinsicSize: '600px 600px' }}>
        <div style={{ position: 'absolute', top: '-40%', right: '-8%', width: '350px', height: '350px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.08)', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', bottom: '-25%', left: '-4%', width: '280px', height: '280px', borderRadius: '50%', backgroundColor: 'rgba(255,20,147,0.05)', zIndex: 1 }}></div>
        <div className="max-w-3xl text-center" style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <h2 className="font-black mb-6" style={{ color: '#023e8aff', fontSize: '48px', fontFamily: 'Montserrat', letterSpacing: '-1px' }}>
            Ready to Grow Without the Financial Stress?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '28px', color: 'rgba(0,0,0,0.7)', marginBottom: '40px', maxWidth: '580px', margin: '0 auto 40px' }}>
            Book a free consultation to discuss your business goals and explore flexible financing options that work for you.
          </p>
          <CTAButton
            text="Schedule Your Free Consultation"
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
