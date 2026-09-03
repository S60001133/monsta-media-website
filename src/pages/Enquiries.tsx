import { useEffect, useState } from 'react'
import { setSeo } from '../lib/seo'

/**
 * Monsta Media — Enquiries page.
 * Inquiry form → emails the business inbox via FormSubmit (free, no backend).
 * Set CONTACT_EMAIL to the inbox that should receive enquiries.
 */
const CONTACT_EMAIL = 'eric@monstagroup.com'
const PINK = '#E9178C'

const SERVICE_OPTIONS = [
  'AI & Automation',
  'Web Development',
  'Local or National SEO',
  'Social Media Ads',
  'Organic Social Media',
  'CRM Management',
  'Not sure yet',
]

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--surface)',
  border: '1px solid var(--hairline-strong)',
  borderRadius: 10,
  padding: '12px 14px',
  color: 'var(--ink)',
  fontSize: 14,
  fontFamily: 'var(--font-body)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
}

const labelBase: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink-2)',
  marginBottom: 6,
}

export default function Enquiries() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [source, setSource] = useState('')

  // SEO + read the ?source= CTA context
  useEffect(() => {
    setSeo({
      title: 'Contact Monsta Media | Free Business Digital Audit — No Obligation',
      description: 'Send Monsta Media an enquiry. Tell us what you need — more customers, a better website, or smarter automation — and we will reply within one business day.',
      path: '/enquiries',
    })
    const params = new URLSearchParams(window.location.search)
    const s = params.get('source')
    if (s) setSource(s)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      business: (form.elements.namedItem('business') as HTMLInputElement).value,
      service: (form.elements.namedItem('service') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      source: source || 'Website',
      _subject: 'New enquiry — Monsta Media website',
      _template: 'table',
      _captcha: 'false',
    }

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success === 'true' || json.success === true) {
        setSent(true)
      } else {
        setError('Something went wrong sending your enquiry. Please try again, or email us directly.')
      }
    } catch {
      setError('Network error — please try again in a moment.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Hero */}
      <section className="relative" style={{ paddingTop: '150px', paddingBottom: '48px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-3xl text-center relative z-10" style={{ width: '100%' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Get Connected</p>
          <h1 className="display-xl" style={{ fontSize: 'clamp(40px, 7vw, 76px)', marginBottom: '20px' }}>
            Let's Talk About <span className="display-accent">Your Business.</span>
          </h1>
          <p className="body-copy" style={{ fontSize: '16px', maxWidth: '640px', margin: '0 auto', lineHeight: '1.7' }}>
            Tell us what you need — more customers, a better website, or smarter automation. We'll reply within one business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="relative" style={{ paddingTop: '24px', paddingBottom: '96px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-2xl w-full">
          {source && (
            <div style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: 10, border: '1px solid rgba(233,23,140,0.35)', background: 'rgba(233,23,140,0.06)', fontSize: 13, color: 'var(--ink-2)' }}>
              <span style={{ color: PINK, fontWeight: 600 }}>You came for:</span> {source}
            </div>
          )}

          {sent ? (
            <div style={{ padding: '48px 32px', textAlign: 'center', border: '1px solid var(--hairline-strong)', borderRadius: 16, background: 'var(--surface)' }}>
              <div style={{ fontSize: 42, marginBottom: 16 }}>🦍</div>
              <h2 className="display" style={{ fontSize: 30, marginBottom: 12 }}>Enquiry Sent!</h2>
              <p className="body-copy" style={{ fontSize: 15, lineHeight: 1.7, maxWidth: '440px', margin: '0 auto' }}>
                Thanks for reaching out. Monsta Media will get back to you within one business day.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ border: '1px solid var(--hairline-strong)', borderRadius: 16, background: 'var(--surface)', padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelBase} htmlFor="name">Full Name *</label>
                  <input
                    id="name" name="name" required
                    style={inputBase}
                    placeholder="Jane Smith"
                    onFocus={(e) => { e.currentTarget.style.borderColor = PINK }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)' }}
                  />
                </div>
                <div>
                  <label style={labelBase} htmlFor="email">Email *</label>
                  <input
                    id="email" name="email" type="email" required
                    style={inputBase}
                    placeholder="jane@business.com.au"
                    onFocus={(e) => { e.currentTarget.style.borderColor = PINK }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={labelBase} htmlFor="phone">Phone</label>
                  <input
                    id="phone" name="phone" type="tel"
                    style={inputBase}
                    placeholder="0400 000 000"
                    onFocus={(e) => { e.currentTarget.style.borderColor = PINK }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)' }}
                  />
                </div>
                <div>
                  <label style={labelBase} htmlFor="business">Business Name</label>
                  <input
                    id="business" name="business"
                    style={inputBase}
                    placeholder="Acme Pty Ltd"
                    onFocus={(e) => { e.currentTarget.style.borderColor = PINK }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)' }}
                  />
                </div>
              </div>

              <div>
                <label style={labelBase} htmlFor="service">What do you need?</label>
                <select id="service" name="service" style={inputBase} defaultValue="Not sure yet">
                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s} style={{ background: 'var(--surface)', color: 'var(--ink)' }}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelBase} htmlFor="message">Tell us about your business *</label>
                <textarea
                  id="message" name="message" required rows={5}
                  style={{ ...inputBase, resize: 'vertical', lineHeight: 1.6 }}
                  placeholder="What are you trying to achieve? Current website, ad spend, or systems you'd like us to look at…"
                  onFocus={(e) => { e.currentTarget.style.borderColor = PINK }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)' }}
                />
              </div>

              {error && (
                <div style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(255,80,80,0.4)', background: 'rgba(255,80,80,0.08)', fontSize: 13, color: '#ff8080' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  background: PINK,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 12,
                  padding: '16px 24px',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: sending ? 'wait' : 'pointer',
                  letterSpacing: '0.02em',
                  transition: 'opacity 0.2s, transform 0.2s',
                  fontFamily: 'var(--font-body)',
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.opacity = '0.9' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                {sending ? 'Sending…' : 'Send Enquiry →'}
              </button>

              <p style={{ fontSize: 12, color: 'var(--ink-3)', textAlign: 'center', margin: 0 }}>
                We reply within one business day. No spam, no obligation.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
