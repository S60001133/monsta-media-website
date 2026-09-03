import { useEffect } from 'react'
import Testimonials from '../components/Testimonials'
import MascotStage from '../components/MascotStage'
import { scrollToTop, scrollToHash } from '../lib/scroll'
import { setSeo } from '../lib/seo'

export default function Home() {
  // SEO: unique title + description + OG + Twitter + canonical for the home route
  useEffect(() => {
    setSeo({
      title: 'AI Marketing Agency Parramatta | Meta Ads, SEO & Web Design | Monsta Media',
      description: 'Australian-owned AI marketing agency. High-ROAS Meta ads, SEO, web design & AI automation. Transparent pricing, no long-term contracts. Based in Parramatta, serving all of Australia.',
      path: '/',
    })
  }, [])

  const go = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    const hashIndex = path.indexOf('#')
    if (hashIndex >= 0) {
      // Deep link — wait for the page to render, then smooth-scroll to the section
      requestAnimationFrame(() => scrollToHash(path.slice(hashIndex)))
    } else {
      scrollToTop()
    }
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }} role="main">
      {/* ============ PINNED STAGE — mascot centre, content orbits ============ */}
      <MascotStage onNavigate={go} />

      {/* ============ MARQUEE — italic serif strip ============ */}
      <div className="marquee-fade overflow-hidden" style={{ borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)', background: 'var(--paper-2)', padding: '18px 0' }} aria-hidden="true">
        <div className="mm-marquee-track" style={{ gap: '48px' }}>
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: 'inline-flex', gap: '48px', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '22px', color: 'var(--ink-2)' }}>
              <span>Meta Ads</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>Google Ads</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>Web Design</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>SEO</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>AI Automation</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>CRM</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
              <span>Organic Social</span><span style={{ color: 'var(--color-brand-pink)' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============ TESTIMONIALS ============ */}
      <Testimonials />
    </main>
  )
}
