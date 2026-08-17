import { motion, useReducedMotionConfig, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

/**
 * HudBackground — full-page "Neon HUD" backdrop:
 *  - perspective grid floor that scrolls (transform-only, GPU cheap)
 *  - 3 sweeping light beams (transform-only)
 *  - drifting brand blobs (gradient falloff, no CSS blur)
 * Colors: exact brand tokens (pink #E9178C, neon #E9178C, purple #bc13fe)
 */

const BLURBS = [
  { size: 520, color: 'rgba(234, 4, 139, 0.14)', top: '8%', left: '-10%', dur: 18, delay: 0 },
  { size: 640, color: 'rgba(233, 23, 140, 0.11)', top: '32%', left: '72%', dur: 22, delay: 2 },
  { size: 480, color: 'rgba(188, 19, 254, 0.10)', top: '62%', left: '-6%', dur: 20, delay: 4 },
]

export default function HudBackground({ zIndex = -10 }: { zIndex?: number }) {
  const reduceMotion = useReducedMotionConfig()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -90])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 120])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.15], [0.5, 1])

  const ys = [y1, y2, y3]

  return (
    <div ref={ref} aria-hidden="true" style={{ position: 'fixed', inset: 0, zIndex, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Perspective grid floor — extends 48px below the viewport so the
          transform-only grid-move loop never reveals a blank edge */}
      <motion.div
        className="hud-grid hud-grid-fade"
        style={{
          position: 'absolute',
          inset: '-20% 0 -48px 0',
          y: gridY,
          opacity,
        }}
      />

      {/* Light beams */}
      {!reduceMotion && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <div className="beam" style={{ left: '-10%' }} />
          <div className="beam" style={{ left: '20%' }} />
          <div className="beam" style={{ left: '55%' }} />
        </div>
      )}

      {/* Brand blobs */}
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
          animate={reduceMotion ? undefined : { scale: [1, 1.12, 1], x: [0, i % 2 === 0 ? 20 : -20, 0] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
        />
      ))}

      {/* Subtle scanline sheen at top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(233,23,140,0.6), transparent)',
        }}
      />
    </div>
  )
}
