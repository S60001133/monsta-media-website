import { useRef, useState, useCallback } from 'react'
import { useReducedMotionConfig } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

/**
 * SpotlightCard — card with a radial glow that FOLLOWS THE MOUSE.
 * The highlight is a radial gradient positioned at cursor coords,
 * plus an animated conic-gradient border sweep on hover.
 * Pure CSS transitions, zero layout thrash. Respects reduced motion.
 */

export default function SpotlightCard({
  children,
  className = '',
  style,
  glowColor = 'rgba(233, 23, 140, 0.28)',
  borderColor = '#E9178C',
  radius = 16,
  spotlightSize = 340,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  glowColor?: string
  borderColor?: string
  radius?: number
  spotlightSize?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: -500, y: -500 })
  const [hover, setHover] = useState(false)
  const reduceMotion = useReducedMotionConfig()

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    []
  )

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: radius,
        ...style,
      }}
    >
      {/* Mouse spotlight */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background: `radial-gradient(${spotlightSize}px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 65%)`,
          }}
        />
      )}
      {/* Rotating conic border sweep */}
      {!reduceMotion && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: -2,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: hover ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background: `conic-gradient(from 0deg, transparent 0deg, ${borderColor} 60deg, transparent 120deg, transparent 240deg, ${borderColor} 300deg, transparent 360deg)`,
            animation: hover ? 'border-sweep 3s linear infinite' : 'none',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: 2,
            borderRadius: radius + 1,
          }}
        />
      )}
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>{children}</div>
    </div>
  )
}
