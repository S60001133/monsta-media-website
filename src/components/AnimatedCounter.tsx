import { useEffect, useRef, useState } from 'react'
import { useReducedMotionConfig } from 'framer-motion'

/**
 * AnimatedCounter — counts up from 0 to `value` when scrolled into view.
 * Uses IntersectionObserver + rAF. Respects reduced motion (jumps straight to value).
 */

export default function AnimatedCounter({
  value,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  const reduceMotion = useReducedMotionConfig()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / (duration * 1000), 1)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        setDisplay(value * eased)
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            run()
            obs.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration, reduceMotion])

  const formatted = display.toLocaleString('en-AU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
