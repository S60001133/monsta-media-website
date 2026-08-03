import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * Starfield — full-screen canvas of twinkling stars + occasional
 * shooting meteors streaking across (brand pink/purple). Pure canvas,
 * zero deps, respects prefers-reduced-motion.
 */

type Star = { x: number; y: number; r: number; baseAlpha: number; phase: number; speed: number }
type Meteor = { x: number; y: number; len: number; speed: number; angle: number; alpha: number; color: string }

const METEOR_COLORS = ['#ff1493', '#ea048b', '#bc13fe', '#ffffff']

export default function Starfield({ density = 0.00012, zIndex = -5, fixed = true }: { density?: number; zIndex?: number; fixed?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    let raf = 0
    let stars: Star[] = []
    let meteors: Meteor[] = []
    let lastMeteor = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      stars = []
      const count = Math.floor(w * h * density)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.6,
          baseAlpha: Math.random() * 0.55 + 0.45,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 1.6 + 0.4,
        })
      }
    }

    const spawnMeteor = () => {
      const fromLeft = Math.random() > 0.5
      meteors.push({
        x: fromLeft ? -80 : w + 80,
        y: Math.random() * h * 0.5,
        len: Math.random() * 300 + 200,
        speed: Math.random() * 8 + 6,
        angle: fromLeft ? Math.PI / 5.2 : Math.PI - Math.PI / 5.2,
        alpha: Math.random() * 0.55 + 0.5,
        color: METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)],
      })
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)

      // Stars — twinkle with glow
      for (const s of stars) {
        const a = s.baseAlpha * (0.6 + 0.4 * Math.sin(t / 1000 * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.max(a, 0.15)})`
        if (s.r > 1.4) {
          ctx.shadowColor = 'rgba(255,255,255,0.9)'
          ctx.shadowBlur = 8
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // Meteors — spawn every ~1.8–3.2s (more frequent, more dramatic)
      if (t - lastMeteor > 1800 + Math.random() * 1400) {
        spawnMeteor()
        lastMeteor = t
      }
      meteors = meteors.filter((m) => m.x > -500 && m.x < w + 500 && m.y > -500 && m.y < h + 300)
      for (const m of meteors) {
        m.x += Math.cos(m.angle) * m.speed
        m.y += Math.sin(m.angle) * m.speed * 0.55
        const tail = m.len
        const gx = m.x - Math.cos(m.angle) * tail
        const gy = m.y - Math.sin(m.angle) * tail * 0.55
        const grad = ctx.createLinearGradient(m.x, m.y, gx, gy)
        grad.addColorStop(0, m.color)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(gx, gy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2.6
        ctx.lineCap = 'round'
        ctx.globalAlpha = m.alpha
        ctx.stroke()
        ctx.globalAlpha = 1
        // head glow
        ctx.beginPath()
        ctx.arc(m.x, m.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = m.color
        ctx.shadowColor = m.color
        ctx.shadowBlur = 18
        ctx.fill()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) raf = requestAnimationFrame(draw)
    else {
      // static stars, no meteors — but brighter so they're still visible
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.min(s.baseAlpha + 0.25, 1)})`
        if (s.r > 1.4) {
          ctx.shadowColor = 'rgba(255,255,255,0.9)'
          ctx.shadowBlur = 8
        }
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [density, reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
      }}
    />
  )
}
