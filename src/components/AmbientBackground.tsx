import { motion, useReducedMotionConfig, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * AmbientBackground — fixed full-page layer of brand-colored aurora glows
 * + a subtle grid that PARALLAX with scroll (scroll-linked movement via
 * framer-motion useScroll/useTransform). Makes the page feel alive while
 * scrolling without touching any content.
 *
 * Colors: exactly the brand tokens from index.css
 *   --color-brand-pink: #E9178C
 *   --color-neon-blue:  #E9178C
 *   --color-neon-purple:#bc13fe
 */

const BLURBS = [
  { size: 520, color: 'rgba(234, 4, 139, 0.16)', top: '8%', left: '-10%', dur: 18, delay: 0 },
  { size: 640, color: 'rgba(233, 23, 140, 0.13)', top: '32%', left: '72%', dur: 22, delay: 2 },
  { size: 480, color: 'rgba(188, 19, 254, 0.12)', top: '62%', left: '-6%', dur: 20, delay: 4 },
]

export default function AmbientBackground({ zIndex = -10 }: { zIndex?: number }) {
  const reduceMotion = useReducedMotionConfig()
  const ref = useRef<HTMLDivElement>(null)

  // Scroll-linked parallax (0..1 of page scroll → -80..80px drift)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -90])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1])

  if (reduceMotion) {
    // Static layer for reduced-motion users — no drift, no movement
    return (
      <div ref={ref} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none', overflow: 'hidden' }}>
        {BLURBS.map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: b.size,
              height: b.size,
              top: b.top,
              left: b.left,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            }}
          />
        ))}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(233,23,140,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(233,23,140,0.05) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>
    )
  }

  const ys = [y1, y2, y3, y4]
  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none', overflow: 'hidden' }}>
      {BLURBS.map((b, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
            y: ys[i % ys.length],
            opacity,
          }}
          animate={{ scale: [1, 1.12, 1], x: [0, i % 2 === 0 ? 20 : -20, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
          backgroundImage:
            'linear-gradient(rgba(233,23,140,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(233,23,140,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
    </div>
  )
}
