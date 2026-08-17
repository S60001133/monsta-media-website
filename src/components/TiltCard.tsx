import { useRef, useState, useCallback } from 'react'
import { useReducedMotionConfig } from 'framer-motion'
import type { ReactNode, CSSProperties } from 'react'

/**
 * TiltCard — 3D tilt that follows the mouse + optional mouse spotlight.
 * Pure transform (GPU-cheap). Respects reduced motion.
 */

export default function TiltCard({
  children,
  className = '',
  style,
  maxTilt = 8,
  scale = 1.02,
  spotlight = true,
  glowColor = 'rgba(233, 23, 140, 0.18)',
  radius = 16,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  maxTilt?: number
  scale?: number
  spotlight?: boolean
  glowColor?: string
  radius?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glow, setGlow] = useState({ x: -500, y: -500, on: false })
  const reduceMotion = useReducedMotionConfig()

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      if (!reduceMotion) {
        const rx = (0.5 - py) * maxTilt
        const ry = (px - 0.5) * maxTilt
        setTransform(`perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`)
      }
      if (spotlight) setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true })
    },
    [maxTilt, scale, reduceMotion, spotlight]
  )

  const onLeave = useCallback(() => {
    setTransform('')
    setGlow((g) => ({ ...g, on: false }))
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        transform,
        transformStyle: 'preserve-3d',
        transition: transform ? 'transform 0.08s linear' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        borderRadius: radius,
        willChange: 'transform',
        ...style,
      }}
    >
      {spotlight && !reduceMotion && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            opacity: glow.on ? 1 : 0,
            transition: 'opacity 0.3s ease',
            background: `radial-gradient(320px circle at ${glow.x}px ${glow.y}px, ${glowColor}, transparent 65%)`,
            borderRadius: radius,
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%', transform: 'translateZ(24px)' }}>{children}</div>
    </div>
  )
}
