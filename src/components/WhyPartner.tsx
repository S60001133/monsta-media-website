const FEATURES = [
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e386b49e440.svg',
    title: 'AI-Focused Expertise',
    body: 'We live and breathe AI! For Marketing, Research, and Automations. We know what works.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d1ba950d30ee1248.svg',
    title: 'No-Nonsense Approach',
    body: "Clear strategies that deliver measurable results. Get more calls. Get more leads. Get more ROI's.",
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d77957688c4f72.svg',
    title: 'Australian Owned & Operated',
    body: 'Based in Parramatta, Sydney, we understand the Aussie market and are here for locals.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d779de898c4f71.svg',
    title: 'Your Growth Partner',
    body: 'Committed to your success, acting as an extension of your team.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e783449e441.svg',
    title: 'Transparent Reporting',
    body: "You'll always know how your marketing investment is performing.",
  },
]

/**
 * Why Partner — "line-by-line" editorial list. NO cards / boxes:
 * each feature is a full-width row (number · icon · title + body)
 * separated by thin hairlines. Light editorial style.
 */
export default function WhyPartner() {
  return (
    <div style={{ background: 'var(--paper)', width: '100%', position: 'relative' }}>
      <div className="section-wrap" style={{ paddingTop: '96px', paddingBottom: '112px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div className="eyebrow">Why Partner with Monsta Media?</div>
          <h2
            className="h2-xl"
            style={{
              margin: '18px 0 0 0',
            }}
          >
            We Deliver{' '}
            <span className="display-accent">MONSTA Results.</span>
          </h2>
        </div>

        {/* Line-by-line feature rows */}
        <div style={{ width: '100%', marginTop: '64px' }}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="wp-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                padding: '30px 12px',
                borderTop: '1px solid var(--hairline)',
                borderBottom: i === FEATURES.length - 1 ? '1px solid var(--hairline)' : 'none',
                transition: 'background-color 0.3s ease, padding-left 0.3s ease',
              }}
            >
              {/* Icon */}
              <span className="wp-row-icon" aria-hidden="true">
                <img src={f.icon} alt="" loading="lazy" />
              </span>

              {/* Title + body */}
              <div className="wp-row-text" style={{ minWidth: 0 }}>
                <h3 className="wp-row-title">{f.title}</h3>
                <p className="wp-row-body">{f.body}</p>
              </div>

              {/* Hover arrow */}
              <span className="wp-row-arrow" aria-hidden="true">→</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ============ Line-by-line rows (light editorial) ============ */
        .wp-row {
          cursor: default;
          -webkit-tap-highlight-color: transparent;
        }
        .wp-row:hover {
          background: linear-gradient(90deg, rgba(233, 23, 140, 0.05), transparent 60%);
          padding-left: 18px;
        }

        .wp-row-icon {
          flex-shrink: 0;
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--hairline);
          transition: border-color 0.3s ease;
        }
        .wp-row:hover .wp-row-icon {
          border-color: rgba(233, 23, 140, 0.5);
        }
        .wp-row-icon img {
          width: 24px;
          height: 24px;
          display: block;
        }

        .wp-row-text {
          flex: 1;
        }
        .wp-row-title {
          margin: 0 0 4px 0;
          font-size: 1.2rem;
          font-family: var(--font-display);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--ink);
          transition: color 0.3s ease;
        }
        .wp-row:hover .wp-row-title {
          color: var(--color-brand-pink);
        }
        .wp-row-body {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--ink-2);
          max-width: 720px;
        }

        .wp-row-arrow {
          flex-shrink: 0;
          font-size: 18px;
          font-weight: 500;
          color: var(--color-brand-pink);
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .wp-row:hover .wp-row-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 640px) {
          .wp-row {
            gap: 14px;
            padding: 20px 6px;
          }
          .wp-row-icon {
            width: 40px;
            height: 40px;
          }
          .wp-row-icon img {
            width: 20px;
            height: 20px;
          }
          .wp-row-title {
            font-size: 1.05rem;
          }
          .wp-row-body {
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  )
}
