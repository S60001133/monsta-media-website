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
  const [solid, setSolid] = useState(alwaysSolid || window.scrollY > 40 || window.innerWidth < 1024)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setSolid(alwaysSolid || window.scrollY > 40 || window.innerWidth < 1024)
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
        <div
        className="max-w-[1200px] mx-auto"
        style={{
          // Fluid side gutters. Kept inline (not `px-4 md:px-6`) because these values are
          // load-bearing for the hamburger's corner alignment at every width.
          padding: '0 clamp(16px, 2vw, 24px)',
        }}
      >
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

            {/* Desktop nav — editorial uppercase, pinned right by marginLeft:auto.
                Breakpoint is lg (1024), not md (768): at 768–1023 the links + Start Now
                button don't fit the bar and the CTA was pushed ~47px off-screen. */}
            <nav
              className="hidden lg:flex items-center gap-7 lg:gap-8 shrink-0"
              style={{ marginLeft: 'auto' }}
            >
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

            {/* Mobile hamburger — pinned to the top-right corner on every screen. */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 z-[60]"
              style={{
                marginLeft: 'auto',
                marginRight: 0,
                flexShrink: 0,
                padding: 10,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
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
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div className="absolute inset-0" style={{ background: 'var(--paper)' }} onClick={() => setMobileOpen(false)} />

          {/* Close (X) — sits exactly where the hamburger is, so opening the menu reads as
              the burger turning into an X. It has to live INSIDE this overlay: the header is
              z-50 and the overlay z-55, so the hamburger's own z-60 is trapped inside the
              header's stacking context and gets painted under the menu (verified with
              elementFromPoint). Positioned by the .mm-nav-close class in index.css so its
              height tracks the navbar's (64px / 72px) and the X lands where the burger was. */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="mm-nav-close"
          >
            <span
              aria-hidden="true"
              style={{ position: 'absolute', width: 24, height: 2, borderRadius: 2, background: 'var(--ink)', transform: 'rotate(45deg)' }}
            />
            <span
              aria-hidden="true"
              style={{ position: 'absolute', width: 24, height: 2, borderRadius: 2, background: 'var(--ink)', transform: 'rotate(-45deg)' }}
            />
          </button>

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
