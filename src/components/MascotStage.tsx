import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'

/**
 * MascotStage — "the mascot owns the page" scroll experience.
 *
 * The gorilla lives in MascotBackdrop (fixed, viewport-centred, z-0 —
 * BEHIND all content). This stage is a 500vh sticky track where the
 * CONTENT moves AROUND him: panels slide in from left/right, swap,
 * and slide out, each tied to its own scroll window — all passing
 * OVER the fixed background mascot.
 */

const ease = [0.22, 1, 0.36, 1] as const

const TALK_LINES = [
  'We build brands that pay for themselves.',
  'Free website if you host with us.',
  'One month of Meta ad management, free.',
  'Automate your business with AI.',
  'Free business digital audit — no obligation.',
  'Australian owned & operated.',
  'All services done in-house — your data never leaves Australia.',
  'No long-term contracts. Transparent pricing.',
  'Direct point of contact — real humans, not call centres.',
]

const SERVICE_CHIPS = [
  { name: 'AI & Automation', id: 'ai-and-automation' },
  { name: 'Web Development', id: 'web-development' },
  { name: 'Local or National SEO', id: 'local-or-national-seo' },
  { name: 'Social Media Ads', id: 'social-media-ads' },
  { name: 'Organic Social Media', id: 'organic-social-media' },
  { name: 'CRM Management', id: 'crm-management' },
]

const WHY_ROWS = [
  { title: 'AI-Focused Expertise', body: 'We live and breathe AI for marketing, research and automation.' },
  { title: 'No-Nonsense Approach', body: 'Clear strategies that deliver measurable results.' },
  { title: 'Australian Owned & Operated', body: 'Based in Parramatta, Sydney — we know the Aussie market.' },
  { title: 'Transparent Reporting', body: 'You always know how your investment is performing.' },
]

const CONNECT_PATHS = [
  { title: 'I Need More Customers', cta: 'Grow My Business', source: 'More Customers' },
  { title: 'I Need a Better Website', cta: 'Build My Site', source: 'Better Website' },
  { title: 'I Want to Work Smarter', cta: 'Automate My Work', source: 'Smarter Automation' },
]

/** One scroll-driven panel: fade + horizontal slide + 3D tilt. */
function usePanel(progress: MotionValue<number>, range: [number, number, number, number], fromX = 90) {
  const [a, b, c, d] = range
  const opacity = useTransform(progress, [a, b, c, d], [0, 1, 1, 0])
  const x = useTransform(progress, [a, b, c, d], [fromX, 0, 0, -fromX])
  const rotateY = useTransform(progress, [a, b, c, d], [10, 0, 0, -10])
  const scale = useTransform(progress, [a, b, c, d], [0.96, 1, 1, 0.98])
  // Invisible panels must not swallow clicks: panels stack at the same
  // coordinates (right side), so a hidden panel's buttons were intercepting
  // clicks meant for the chips beneath it. Only accept pointer events while
  // fully visible.
  const pointerEvents = useTransform(progress, [a, b, c, d], ['none', 'auto', 'auto', 'none'])
  return { opacity, x, rotateY, scale, pointerEvents }
}

/** Progress dot — highlights when its panel is active. */
function Dot({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const active = useTransform(progress, (v) => Math.round(v))
  const scale = useTransform(active, (a) => (a === index ? 1.7 : 1))
  const background = useTransform(active, (a) => (a === index ? 'var(--color-brand-pink)' : 'var(--ink-3)'))
  return (
    <motion.span
      style={{ width: 8, height: 8, borderRadius: '50%', display: 'inline-block', scale, background }}
    />
  )
}

export default function MascotStage({
  onNavigate,
}: {
  onNavigate: (path: string) => void
}) {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, [])
  const ref = useRef<HTMLElement>(null)

  // ---- scroll timeline over the whole track (500vh) ----
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const stageOpacity = useTransform(scrollYProgress, [0.93, 0.99], [1, 0])

  // ---- mascot dance rig: scroll scrubs a slow groove across the four panels ----
  // Soft springs make the pose glide between keyframes instead of stepping.
  const lean = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -3.5, 4, -2.5, 3, 0]),
    { stiffness: 46, damping: 16 },
  )
  const hop = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -10, 0, -14, -4, 0]),
    { stiffness: 55, damping: 14 },
  )
  const squashX = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 1.025, 0.975, 1.04, 1.01, 1]),
    { stiffness: 55, damping: 14 },
  )
  const squashY = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1, 0.975, 1.025, 0.96, 0.99, 1]),
    { stiffness: 55, damping: 14 },
  )

  // ---- panels (each owns a scroll window) ----
  const intro = usePanel(scrollYProgress, [0.02, 0.1, 0.2, 0.28], 110)
  const services = usePanel(scrollYProgress, [0.3, 0.38, 0.48, 0.56], -110)
  const why = usePanel(scrollYProgress, [0.58, 0.66, 0.76, 0.84], 110)
  const cta = usePanel(scrollYProgress, [0.86, 0.92, 0.97, 1.0], -110)
  const activeIndex: MotionValue<number> = useTransform(scrollYProgress, (v): number => {
    if (v < 0.29) return 0
    if (v < 0.57) return 1
    if (v < 0.85) return 2
    return 3
  })

  // ---- talking typewriter loop ----
  const [lineIdx, setLineIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [talking, setTalking] = useState(false)
  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout>
    const cycle = () => {
      const full = TALK_LINES[lineIdx % TALK_LINES.length]
      setTalking(true)
      setTyped('')
      let i = 0
      const type = () => {
        if (cancelled) return
        i += 1
        setTyped(full.slice(0, i))
        if (i < full.length) timeout = setTimeout(type, 34)
        else {
          timeout = setTimeout(() => {
            if (cancelled) return
            setTalking(false)
            timeout = setTimeout(() => {
              if (cancelled) return
              setLineIdx((n) => n + 1)
            }, 1400)
          }, 1600)
        }
      }
      timeout = setTimeout(type, 500)
    }
    cycle()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [lineIdx])

  const panelBase: React.CSSProperties = {
    position: 'absolute',
    maxWidth: isMobile ? 'none' : 470,
    top: isMobile ? 'auto' : '50%',
    bottom: isMobile ? 64 : 'auto',
    transform: isMobile ? 'none' : 'translateY(-50%)',
    zIndex: 4,
    transformStyle: 'preserve-3d',
  }
  // left-side panels sit higher for a staggered composition; right-side stay centred
  const leftPanelBase: React.CSSProperties = { ...panelBase, top: isMobile ? 'auto' : '38%' }

  return (
    <section ref={ref} style={{ position: 'relative', height: '500vh' }} aria-label="Monsta Media — scroll experience">
      {/* sticky stage: content orbits the (fixed, background) mascot */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* depth glow behind the mascot */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: isMobile ? 420 : 640,
            height: isMobile ? 420 : 640,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(233,23,140,0.10) 0%, rgba(233,23,140,0.04) 45%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* ---------- THE MASCOT — background layer, behind the content panels ---------- */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? 240 : 340,
            height: isMobile ? 240 : 340,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          {/* 2D puppet rig — scroll scrubs the dance; a slow idle groove sits on top */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <motion.div
              style={{
                rotate: lean,
                y: hop,
                scaleX: squashX,
                scaleY: squashY,
                transformOrigin: '50% 88%',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 1.8, -1.8, 0], y: [0, -4, 0, -2, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/images/mascot.png"
                  alt="Monsta Media mascot"
                  draggable={false}
                  style={{
                    width: isMobile ? 240 : 340,
                    height: 'auto',
                    display: 'block',
                    filter: 'drop-shadow(0 30px 34px rgba(0,0,0,0.55))',
                    userSelect: 'none',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ---------- SPEECH BUBBLE ANCHOR — above his head, above the panels ---------- */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? 240 : 340,
            height: isMobile ? 240 : 340,
            zIndex: 6,
            pointerEvents: 'none',
          }}
        >
          {/* speech bubble — above his head */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.3 }}
                style={{
                  position: 'absolute',
                  top: -14,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 6,
                  width: isMobile ? 190 : 250,
                  background: 'var(--surface)',
                  border: '1px solid var(--hairline-strong)',
                  borderRadius: 14,
                  padding: '12px 14px',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  lineHeight: 1.5,
                }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2.5, height: 18 }}>
                    {[0, 1, 2, 3].map((b) => (
                      <motion.span
                        key={b}
                        animate={talking ? { height: [3, 13, 6, 15, 4] } : { height: 3 }}
                        transition={talking ? { duration: 0.55, repeat: Infinity, ease: 'easeInOut', delay: b * 0.1 } : { duration: 0.3 }}
                        style={{ width: 2.5, borderRadius: 2, background: 'var(--color-brand-pink)', display: 'inline-block' }}
                      />
                    ))}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 8.5,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--color-brand-pink)',
                        marginBottom: 3,
                      }}
                    >
                      Monsta says
                    </span>
                    <span style={{ whiteSpace: 'pre-wrap' }}>
                      {typed}
                      <span style={{ display: 'inline-block', width: 2, height: 12, marginLeft: 2, verticalAlign: '-2px', background: 'var(--ink-3)', animation: 'mm-caret 0.9s step-end infinite' }} />
                    </span>
                  </div>
                </div>
              </motion.div>
        </div>

        {/* ---------- CONTENT PANELS — orbit around the mascot ---------- */}
        <motion.div style={{ opacity: stageOpacity }}>
          {/* Panel 1 — intro (left, higher) — heading only */}
          <motion.div style={{ ...intro, ...leftPanelBase, left: isMobile ? 16 : 40, right: isMobile ? 16 : 'auto' }}>
            <h2 className="display" style={{ fontSize: isMobile ? 'clamp(30px, 8vw, 44px)' : 'clamp(40px, 4.6vw, 64px)' }}>
              We Build Brands That <span className="display-accent">Pay For Themselves.</span>
            </h2>
          </motion.div>

          {/* Panel 2 — services (right) */}
          <motion.div style={{ ...services, ...panelBase, right: isMobile ? 16 : 40, left: isMobile ? 16 : 'auto' }}>
            <h3 className="display" style={{ fontSize: isMobile ? 28 : 38, marginBottom: 8 }}>Services Built to <span className="display-accent">Grow Your Business</span></h3>
            <p className="body-copy" style={{ fontSize: 14, marginBottom: 22 }}>
              Everything you need to grow with conviction.
              <br />
              Transparent charging, no long-term contracts.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SERVICE_CHIPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => onNavigate(`/services#${s.id}`)}
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '8px 14px',
                    borderRadius: 999,
                    border: '1px solid var(--hairline-strong)',
                    background: 'var(--surface)',
                    color: 'var(--ink-2)',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s, color 0.25s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-brand-pink)'; e.currentTarget.style.color = 'var(--color-brand-pink)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hairline-strong)'; e.currentTarget.style.color = 'var(--ink-2)' }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Panel 3 — why partner (left, higher) */}
          <motion.div style={{ ...why, ...leftPanelBase, top: isMobile ? 'auto' : '20%', left: isMobile ? 16 : 40, right: isMobile ? 16 : 'auto' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Why Partner With Monsta Media?</div>
            <h3 className="display" style={{ fontSize: isMobile ? 28 : 38, marginBottom: 22 }}>We Deliver <span className="display-accent">MONSTA Results.</span></h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {WHY_ROWS.map((r) => (
                <div key={r.title} style={{ borderTop: '1px solid var(--hairline)', paddingTop: 14 }}>
                  <div className="eyebrow-ink" style={{ fontSize: 10, marginBottom: 4, color: 'var(--color-brand-pink)' }}>{r.title}</div>
                  <p className="body-copy" style={{ fontSize: 13.5 }}>{r.body}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Panel 4 — get connected CTA (right) */}
          <motion.div style={{ ...cta, ...panelBase, top: isMobile ? 'auto' : '28%', right: isMobile ? 16 : 40, left: isMobile ? 16 : 'auto' }}>
            <h3 className="display" style={{ fontSize: isMobile ? 28 : 38, marginBottom: 22 }}>Let's Talk About <span className="display-accent">Your Business.</span></h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {CONNECT_PATHS.map((p) => (
                <button
                  key={p.title}
                  onClick={() => onNavigate(`/enquiries?source=${encodeURIComponent(p.source)}`)}
                  style={{
                    textAlign: 'left',
                    background: 'var(--surface)',
                    border: '1px solid var(--hairline)',
                    borderRadius: 12,
                    padding: '16px 18px',
                    color: 'var(--ink)',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s, transform 0.25s',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(233,23,140,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hairline)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.title}</div>
                  <div style={{ color: 'var(--color-brand-pink)', fontSize: 13 }}>{p.cta} →</div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- progress dots (which panel you're on) ---------- */}
        <div style={{ position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 6 }}>
          {[0, 1, 2, 3].map((i) => (
            <Dot key={i} progress={activeIndex} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
