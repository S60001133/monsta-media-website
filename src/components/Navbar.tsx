import { useEffect, useState } from 'react'
import { scrollToTop, scrollToHash } from '../lib/scroll'

/**
 * Monsta Media Parramatta navbar — editorial.
 * Cream paper bar, logo, uppercase Inter nav links,
 * hairline bottom rule on scroll. No black utility bar.
 */

interface NavbarProps {
  /** force solid background immediately (used on subpages whose hero is short) */
  alwaysSolid?: boolean
}

const NAV_LINKS = [
  { name: 'Services', path: '/services' },
  { name: 'CRM', path: '/crm' },
  { name: 'Finance', path: '/finance' },
  { name: 'About Us', path: '/about' },
]

export default function Navbar({ alwaysSolid = false }: NavbarProps) {
  const [solid, setSolid] = useState(alwaysSolid || window.scrollY > 40 || window.innerWidth < 768)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setSolid(alwaysSolid || window.scrollY > 40 || window.innerWidth < 768)
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [alwaysSolid])

  const go = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setMobileOpen(false)
    const hashIndex = path.indexOf('#')
    if (hashIndex >= 0) {
      requestAnimationFrame(() => scrollToHash(path.slice(hashIndex)))
    } else {
      scrollToTop()
    }
  }

  const openEnquiries = () => go('/enquiries')

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          solid ? 'bg-[var(--paper)] border-b' : 'bg-transparent border-b border-transparent'
        }`}
        style={{
          top: 0,
          borderColor: solid ? 'var(--hairline)' : 'transparent',
          boxShadow: solid ? '0 1px 12px rgba(28,24,18,0.06)' : 'none',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="flex items-center h-16 md:h-[72px] gap-4 md:gap-8">
            {/* Logo */}
            <button
              onClick={() => go('/')}
              className="flex items-center shrink-0 hover:opacity-85 transition-opacity"
              aria-label="Monsta Media home"
            >
              <img
                src="/images/logo.svg"
                alt="Monsta Media"
                className="nav-logo"
                loading="eager"
              />
            </button>

            {/* Desktop nav — editorial uppercase */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8 ml-auto shrink-0">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => go(link.path)}
                  className="relative group transition-colors"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--ink-2)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--ink)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ink-2)' }}
                >
                  {link.name}
                  <span
                    className="absolute -bottom-1 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                    style={{ backgroundColor: 'var(--color-brand-pink)' }}
                  />
                </button>
              ))}
              <button
                onClick={openEnquiries}
                className="btn btn-primary btn-sm"
                style={{ padding: '10px 24px', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase' }}
              >
                Start Now
              </button>
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 ml-auto z-[60]"
              aria-label="Toggle menu"
            >
              <span className={`w-6 h-[2px] bg-[var(--ink)] transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-[2px] bg-[var(--ink)] transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-[2px] bg-[var(--ink)] transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[55] md:hidden">
          <div className="absolute inset-0" style={{ background: 'var(--paper)' }} onClick={() => setMobileOpen(false)} />
          <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-8 px-6">
            <img src="/images/logo.svg" alt="Monsta Media" className="h-12 w-auto mb-4" loading="lazy" />
            <button
              onClick={() => go('/')}
              className="text-2xl"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--ink)' }}
            >
              Home
            </button>
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                onClick={() => go(link.path)}
                className="text-2xl transition-colors"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--ink)' }}
              >
                {link.name}
              </button>
            ))}
            <div className="mt-2">
              <button
                onClick={() => { setMobileOpen(false); openEnquiries() }}
                className="btn btn-primary btn-lg"
              >
                Start Now
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
