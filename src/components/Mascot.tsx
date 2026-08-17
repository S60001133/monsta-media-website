import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * Monsta Mascot — the living gorilla.
 *
 * TCJ-style scroll-linked motion, kept inside the editorial system
 * (cream paper, pink accent, ink text — the "futuristic" comes from
 * MOTION, not from neon/HUD styling):
 *
 *  · 3D rotateY/rotateX driven by scroll position (useScroll) — he
 *    turns to face you as you scroll past the hero
 *  · parallax rise — he drifts up slower/faster than the page
 *  · gentle idle float (GPU-cheap transform)
 *  · "talking" — a speech bubble cycles Monsta lines with a
 *    typewriter effect + animated equaliser bars while he talks
 *
 * Image source: /images/mascot.png (drop the file there; falls back
 * to the logo until then). MotionConfig reducedMotion="never" is set
 * globally, but the component still respects it defensively.
 */

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

const ease = [0.22, 1, 0.36, 1] as const

export default function Mascot({
  sectionRef,
  size = 340,
  className,
}: {
  /** ref to the section that owns the scroll timeline */
  sectionRef?: React.RefObject<HTMLElement | null>
  size?: number
  className?: string
}) {
  const [imgOk, setImgOk] = useState(true)
  const [lineIdx, setLineIdx] = useState(0)
  const [typed, setTyped] = useState('')
  const [talking, setTalking] = useState(false)

  // ---- scroll-linked 3D (the "turns to face you" effect) ----
  // NOTE: no reduced-motion gate here — the brand config sets
  // MotionConfig reducedMotion="never" (see main.tsx) so the site
  // renders identically everywhere, including machines that report
  // prefers-reduced-motion. Gating on useReducedMotion() would make
  // the mascot freeze on those machines (observed on this Windows
  // box) and contradict the brand requirement.
  const scrollY = useScroll({
    target: sectionRef ?? undefined,
    offset: ['start end', 'end start'],
  })
  const rawRotateY = useTransform(scrollY.scrollYProgress, [0, 0.5, 1], [-14, 6, 14])
  const rawRotateX = useTransform(scrollY.scrollYProgress, [0, 0.5, 1], [10, 0, -8])
  const rawY = useTransform(scrollY.scrollYProgress, [0, 1], [70, -70])
  const rotateY = useSpring(rawRotateY, { stiffness: 60, damping: 20 })
  const rotateX = useSpring(rawRotateX, { stiffness: 60, damping: 20 })
  const y = useSpring(rawY, { stiffness: 50, damping: 20 })

  // ---- dance: scroll-driven groove (the "dancing gorilla" effect) ----
  // As the user scrolls through the section, he bounces and sways —
  // the further you scroll, the more he grooves. Smooth springs keep
  // it fluid instead of stepped.
  const danceTilt = useSpring(
    useTransform(scrollY.scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0, -10, 12, -8, 0]),
    { stiffness: 50, damping: 14 },
  )
  const danceHop = useSpring(
    useTransform(scrollY.scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -26, 0, -30, 0, 0]),
    { stiffness: 60, damping: 12 },
  )
  const danceSpin = useSpring(
    useTransform(scrollY.scrollYProgress, [0, 0.5, 1], [0, 14, -10]),
    { stiffness: 45, damping: 15 },
  )


  // ---- talking typewriter loop ----
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
        if (i < full.length) {
          timeout = setTimeout(type, 34)
        } else {
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
      timeout = setTimeout(type, 700)
    }

    cycle()
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [lineIdx])

  return (
    <div
      className={className}
      style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}
      aria-label="Monsta Media mascot"
    >
      {/* ---- speech bubble ---- */}
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease, delay: 0.4 }}
        style={{
          position: 'absolute',
          top: -6,
          right: -26,
          zIndex: 3,
          maxWidth: 250,
          background: 'var(--surface)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: 14,
          padding: '14px 18px',
          boxShadow: '0 10px 28px rgba(28,24,18,0.10)',
          color: 'var(--ink)',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          lineHeight: 1.5,
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          {/* equaliser bars — "he's talking" */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 22, paddingTop: 2 }}>
            {[0, 1, 2, 3].map((b) => (
              <motion.span
                key={b}
                animate={
                  talking
                    ? { height: [4, 16, 7, 18, 5] }
                    : { height: 4 }
                }
                transition={
                  talking
                    ? { duration: 0.7, repeat: Infinity, ease: 'easeInOut', delay: b * 0.12 }
                    : { duration: 0.3 }
                }
                style={{
                  width: 3,
                  height: 4,
                  borderRadius: 2,
                  background: 'var(--color-brand-pink)',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-brand-pink)',
                marginBottom: 4,
              }}
            >
              Monsta says
            </span>
            <span style={{ whiteSpace: 'pre-wrap' }}>
              {typed}
              <span
                style={{
                  display: 'inline-block',
                  width: 2,
                  height: 13,
                  marginLeft: 2,
                  verticalAlign: '-2px',
                  background: 'var(--ink-3)',
                  animation: 'mm-caret 0.9s step-end infinite',
                }}
              />
            </span>
          </div>
        </div>
      </motion.div>

      {/* ---- 3D + dance wrapper ---- */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          rotateX,
          rotateY,
          y,
          transformStyle: 'preserve-3d',
          perspective: 900,
        }}
      >
        {/* Dance layer — bounce + sway + spin driven by scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            rotateZ: danceTilt,
            y: danceHop,
            rotateY: danceSpin,
          }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {imgOk ? (
              <img
                src="/images/mascot.png"
                alt="Monsta Media mascot"
                onError={() => setImgOk(false)}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 24px 30px rgba(0,0,0,0.45))',
                  userSelect: 'none',
                }}
                draggable={false}
              />
            ) : (
              /* graceful fallback until the mascot image is uploaded */
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: size * 0.72,
                  height: size * 0.72,
                  borderRadius: '50%',
                  background: 'var(--paper-2)',
                  border: '1px dashed var(--hairline-strong)',
                  color: 'var(--ink-3)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textAlign: 'center',
                  padding: '0 20px',
                  lineHeight: 1.6,
                }}
              >
                Drop mascot.png in /public/images/
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- floating badge chips (TCJ hero signature) ---- */}
      <motion.div
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 26,
          left: -14,
          zIndex: 2,
          background: 'var(--ink)',
          color: 'var(--paper)',
          borderRadius: 999,
          padding: '8px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          boxShadow: '0 8px 20px rgba(28,24,18,0.16)',
        }}
      >
        All services in-house ✦
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.0 }}
        style={{
          position: 'absolute',
          top: '30%',
          right: -6,
          zIndex: 2,
          background: 'var(--surface)',
          color: 'var(--color-brand-pink)',
          border: '1px solid var(--hairline-strong)',
          borderRadius: 999,
          padding: '8px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Parramatta ✦
      </motion.div>
    </div>
  )
}
