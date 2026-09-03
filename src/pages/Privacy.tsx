import { useEffect } from 'react'
import { setSeo } from '../lib/seo'

const PINK = '#E9178C'

/**
 * Monsta Media Parramatta — Privacy Policy.
 * Compliant with the Privacy Act 1988 (Cth) + Australian Privacy Principles.
 * Dark theme, matches the rest of the site (Layout provides nav + footer).
 */
export default function Privacy() {
  // SEO: Update document title + meta description
  useEffect(() => {
    setSeo({
      title: 'Privacy Policy | Monsta Media Parramatta',
      description: 'Privacy Policy for Monsta Media Parramatta — how we collect, use, and protect your personal information, in line with the Australian Privacy Principles (APP).',
      path: '/privacy',
    })
  }, [])

  const sections: { title: string; body: string[] }[] = [
    {
      title: 'Who We Are',
      body: [
        'Monsta Media Parramatta ("Monsta Media", "we", "us", "our") is an Australian-owned and operated digital marketing agency based in Parramatta, NSW, Australia. We provide website development, digital marketing, advertising, SEO, and AI automation services to businesses.',
        'This Privacy Policy explains how we collect, use, disclose, and protect your personal information, and how you can access or correct the information we hold about you.',
      ],
    },
    {
      title: 'The Information We Collect',
      body: [
        'We only collect personal information that is reasonably necessary for our business functions and activities. The types of information we may collect include:',
      ],
    },
    {
      title: 'How We Collect Information',
      body: [
        'We collect personal information directly from you when you use our website, submit an enquiry form, book a consultation, contact us by email or phone, or engage us for services.',
        'We also collect information automatically when you visit our website — including your IP address, browser type, device information, pages visited, and referring URLs — through cookies, analytics tools, and advertising pixels (see "Cookies and Tracking" below).',
        'Where you interact with us through third-party platforms (such as Facebook, Instagram, LinkedIn, or Google), we may receive information about those interactions in accordance with those platforms\u2019 own privacy policies.',
      ],
    },
    {
      title: 'Why We Collect Your Information',
      body: [
        'We use your personal information to:',
      ],
    },
    {
      title: 'Cookies and Tracking Technologies',
      body: [
        'Our website uses cookies and similar technologies to improve your experience, understand how visitors use the site, and deliver relevant advertising. These include Google Analytics, the Meta (Facebook/Instagram) Pixel, our LeadConnector chat widget, and our AI voice assistant (Vapi).',
        'You can control cookies through your browser settings — most browsers let you block or delete cookies. Please note that disabling cookies may affect how our website functions for you.',
        'Advertising platforms such as Meta and Google use their own cookies and tracking, governed by their respective privacy policies. You can manage ad preferences through the tools those platforms provide.',
      ],
    },
    {
      title: 'Disclosure of Your Information',
      body: [
        'We do not sell, rent, or trade your personal information to third parties.',
        'We may disclose your information to service providers who help us operate our business, such as website hosting providers, email and form processing services, customer relationship management (CRM) platforms, payment providers, and advertising platforms (Meta, Google). These providers only receive the information necessary to perform their services and are bound by appropriate confidentiality and data-handling obligations.',
        'We may also disclose your information where required or authorised by law, or where you have given your consent.',
      ],
    },
    {
      title: 'Overseas Disclosure',
      body: [
        'Some of our service providers (including website hosting, analytics, advertising, and AI services) may store or process data outside Australia. By using our website and services, you consent to this handling where it is reasonably necessary for us to provide our services to you.',
      ],
    },
    {
      title: 'Security of Your Information',
      body: [
        'We take reasonable steps to protect the personal information we hold from misuse, interference, loss, unauthorised access, modification, or disclosure. This includes secure connections (HTTPS), restricted access to personal information, and careful selection of service providers.',
        'No method of transmission or storage is completely secure, but we strive to use commercially acceptable means to protect your information.',
      ],
    },
    {
      title: 'Retention of Your Information',
      body: [
        'We keep your personal information only for as long as necessary to fulfil the purposes for which it was collected, to provide our services, to meet legal, accounting, and reporting obligations, or as otherwise required or permitted by law.',
        'When we no longer need your personal information, we take reasonable steps to destroy or de-identify it.',
      ],
    },
    {
      title: 'Accessing and Correcting Your Information',
      body: [
        'You have the right to request access to the personal information we hold about you, and to ask us to correct it if it is inaccurate, incomplete, or out of date.',
        'To make a request, contact us using the details below. We will respond within a reasonable period, usually within 30 days. We may need to verify your identity before providing access, and in some circumstances permitted by law we may decline a request — if so, we will explain why.',
      ],
    },
    {
      title: 'Marketing and Opting Out',
      body: [
        'If you have provided your consent (or where otherwise permitted by law), we may send you information about our products and services. You can opt out of marketing communications at any time by using the unsubscribe facility in any email we send, or by contacting us directly.',
      ],
    },
    {
      title: 'Complaints',
      body: [
        'If you have a concern about how we handle your personal information, please contact us and we will investigate and respond to your complaint within a reasonable period.',
        'If you are not satisfied with our response, you may complain to the Office of the Australian Information Commissioner (OAIC) at www.oaic.gov.au or by calling 1300 363 992.',
      ],
    },
    {
      title: 'Changes to This Policy',
      body: [
        'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal obligations. The current version will always be available on this page, and the "Last updated" date below will be revised accordingly.',
      ],
    },
  ]

  const lists: Record<string, string[]> = {
    'The Information We Collect': [
      'Contact details — your name, email address, phone number, and business name when you enquire about our services.',
      'Enquiry information — details you provide about your business, website, and marketing needs.',
      'Communications — records of emails, calls, and messages between you and our team.',
      'Usage data — information about how you use our website, collected automatically via cookies and analytics (see "Cookies and Tracking" below).',
      'Advertising interactions — information about how you interact with our ads on platforms such as Facebook, Instagram, and Google.',
    ],
    'Why We Collect Your Information': [
      'To respond to your enquiries and provide the services you request.',
      'To manage our client relationships, including invoicing and customer support.',
      'To send you information about our services where you have consented to receive it.',
      'To improve our website, services, and marketing through analytics.',
      'To meet our legal and regulatory obligations.',
    ],
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      {/* Hero */}
      <section className="relative" style={{ paddingTop: '150px', paddingBottom: '64px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-4xl text-center relative z-10" style={{ width: '100%' }}>
          <p className="eyebrow" style={{ marginBottom: '14px' }}>Legal</p>
          <h1 className="display-xl" style={{ fontSize: 'clamp(40px, 7vw, 72px)', marginBottom: '20px' }}>
            Privacy <span className="display-accent">Policy</span>
          </h1>
          <p className="body-copy" style={{ fontSize: '16px', maxWidth: '680px', margin: '0 auto', lineHeight: '1.7' }}>
            How Monsta Media Parramatta collects, uses, and protects your personal information — in line with the Australian Privacy Principles.
          </p>
          <p style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginTop: '20px', fontFamily: 'var(--font-mono)' }}>
            Last updated: 17 August 2026
          </p>
        </div>
      </section>

      {/* Sections */}
      <section className="relative" style={{ paddingTop: '16px', paddingBottom: '120px', paddingLeft: '24px', paddingRight: '24px', display: 'flex', justifyContent: 'center' }}>
        <div className="max-w-3xl w-full">
          {sections.map((s, i) => (
            <div key={s.title} className="hairline-t" style={{ padding: '36px 0' }}>
              <h2 className="display" style={{ fontSize: 'clamp(22px, 3.2vw, 30px)', marginBottom: '16px' }}>
                <span style={{ color: PINK, marginRight: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.7em', letterSpacing: '0.08em' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.title}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className="body-copy" style={{ fontSize: '15px', marginBottom: '12px', maxWidth: '680px' }}>
                  {p}
                </p>
              ))}
              {lists[s.title] && (
                <ul style={{ margin: '8px 0 0', paddingLeft: '4px', listStyle: 'none' }}>
                  {lists[s.title].map((item, j) => (
                    <li key={j} className="body-copy" style={{ fontSize: '15px', marginBottom: '10px', paddingLeft: '22px', position: 'relative', lineHeight: 1.65, maxWidth: '680px' }}>
                      <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '2px', color: PINK, fontSize: '14px' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Contact card */}
          <div className="hairline-t" style={{ padding: '36px 0' }}>
            <h2 className="display" style={{ fontSize: 'clamp(22px, 3.2vw, 30px)', marginBottom: '16px' }}>
              <span style={{ color: PINK, marginRight: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.7em', letterSpacing: '0.08em' }}>
                {String(sections.length + 1).padStart(2, '0')}
              </span>
              Contact Us
            </h2>
            <div style={{ border: '1px solid var(--hairline-strong)', borderRadius: 14, background: 'var(--surface)', padding: '24px', marginTop: '8px' }}>
              <p className="body-copy" style={{ fontSize: '15px', marginBottom: '10px' }}>
                If you have any questions about this Privacy Policy, or wish to access, correct, or make a complaint about your personal information, please contact us:
              </p>
              <p className="body-copy" style={{ fontSize: '15px', margin: 0 }}>
                <strong style={{ color: 'var(--ink)' }}>Monsta Media Parramatta</strong><br />
                Parramatta, NSW, Australia<br />
                Email: <a href="mailto:eric@monstagroup.com" style={{ color: PINK, textDecoration: 'none' }}>eric@monstagroup.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
