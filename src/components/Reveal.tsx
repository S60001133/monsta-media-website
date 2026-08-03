import { motion, useReducedMotion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Scroll-reveal wrapper — fades/slides children in when they enter the viewport.
 * Uses framer-motion `whileInView` (IntersectionObserver under the hood).
 * Fully respects prefers-reduced-motion (no movement, just a gentle fade).
 */

type RevealProps = {
  children: ReactNode
  /** animation variant */
  variant?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'blur' | 'fade'
  /** delay in seconds */
  delay?: number
  /** duration in seconds */
  duration?: number
  /** y/x offset in px */
  offset?: number
  /** only animate the first time it enters view */
  once?: boolean
  /** trigger when this % of the element is visible */
  amount?: number
  /** margin around viewport for earlier trigger, e.g. '-80px' */
  margin?: string
  className?: string
  style?: React.CSSProperties
}

const buildVariants = (v: NonNullable<RevealProps['variant']>, offset: number, duration: number): Variants => {
  const dist = offset
  const base = {
    visible: {
      transition: { duration, ease: [0.22, 1, 0.36, 1] as const },
    },
  }
  switch (v) {
    case 'up':
      return { hidden: { opacity: 0, y: dist }, ...base }
    case 'down':
      return { hidden: { opacity: 0, y: -dist }, ...base }
    case 'left':
      return { hidden: { opacity: 0, x: dist }, ...base }
    case 'right':
      return { hidden: { opacity: 0, x: -dist }, ...base }
    case 'zoom':
      return { hidden: { opacity: 0, scale: 0.88 }, ...base }
    case 'blur':
      // Note: animating CSS filter is expensive during scroll — use a
      // fade+rise instead (visually similar, GPU-cheap)
      return {
        hidden: { opacity: 0, y: dist * 0.4 },
        visible: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 1, 0.36, 1] as const } },
      }
    case 'fade':
    default:
      return { hidden: { opacity: 0 }, ...base }
  }
}

export default function Reveal({
  children,
  variant = 'up',
  delay = 0,
  duration = 0.7,
  offset = 36,
  once = true,
  amount = 0.15,
  margin = '-60px',
  className,
  style,
}: RevealProps) {
  const reduceMotion = useReducedMotion()

  // Reduced motion: pure fade, no movement, no blur
  const v: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4, delay } },
      }
    : buildVariants(variant, offset, duration)

  return (
    <motion.div
      className={className}
      style={style}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin }}
      transition={reduceMotion ? undefined : { delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger container + item pair — children fade up one after another.
 * Usage:
 *   <Stagger>
 *     <StaggerItem>...</StaggerItem>
 *   </Stagger>
 */
export function Stagger({ children, className, delay = 0, gap = 0.12, once = true, amount = 0.15, style }: {
  children: ReactNode
  className?: string
  delay?: number
  gap?: number
  once?: boolean
  amount?: number
  style?: React.CSSProperties
}) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <div className={className} style={style}>{children}</div>
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, variant = 'up', offset = 40, duration = 0.65, style }: {
  children: ReactNode
  className?: string
  variant?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'
  offset?: number
  duration?: number
  style?: React.CSSProperties
}) {
  const reduceMotion = useReducedMotion()
  if (reduceMotion) {
    return <div className={className} style={style}>{children}</div>
  }
  const hidden: Record<string, number> = { opacity: 0 }
  if (variant === 'up') hidden.y = offset
  if (variant === 'down') hidden.y = -offset
  if (variant === 'left') hidden.x = offset
  if (variant === 'right') hidden.x = -offset
  if (variant === 'zoom') hidden.scale = 0.88
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden,
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}
