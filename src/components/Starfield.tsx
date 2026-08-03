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

/**
 * Pre-rendered glow sprite (offscreen canvas). Using shadowBlur on every
 * star/meteor per frame is extremely expensive (Gaussian blur per draw at
 * 60fps). Instead we bake ONE radial glow once and drawImage it — visually
 * identical, orders of magnitude cheaper.
 */
function makeGlowSprite(radius: number, color: string): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = radius * 2
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(radius, radius, 0, radius, radius, radius)
  grad.addColorStop(0, color)
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, c.width, c.height)
  return c
}

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

    // Bake glow sprites once — white for stars, brand color for meteors
    const whiteGlow = makeGlowSprite(24, 'rgba(255,255,255,0.55)')
    const colorGlow = makeGlowSprite(28, 'rgba(255,20,147,0.6)')
    const colorGlowAlt = makeGlowSprite(28, 'rgba(188,19,254,0.6)')

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

      // Stars — twinkle (sprite glow, no shadowBlur)
      for (const s of stars) {
        const a = s.baseAlpha * (0.6 + 0.4 * Math.sin(t / 1000 * s.speed + s.phase))
        const alpha = Math.max(a, 0.15)
        // Glow sprite underneath (baked once — cheap drawImage)
        ctx.globalAlpha = alpha * 0.5
        ctx.drawImage(whiteGlow, s.x - 12, s.y - 12, 24, 24)
        // Core dot
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Meteors — spawn every ~2.5–4s
      if (t - lastMeteor > 2500 + Math.random() * 1500) {
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
        // head glow — sprite, no shadowBlur
        const glow = m.color === '#bc13fe' ? colorGlowAlt : colorGlow
        ctx.globalAlpha = m.alpha * 0.7
        ctx.drawImage(glow, m.x - 14, m.y - 14, 28, 28)
        ctx.globalAlpha = m.alpha
        ctx.beginPath()
        ctx.arc(m.x, m.y, 2.6, 0, Math.PI * 2)
        ctx.fillStyle = m.color
        ctx.fill()
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduceMotion) {
      // Draw one frame synchronously so stars are visible immediately
      // (headless/background tabs may throttle rAF)
      draw(0)
      raf = requestAnimationFrame(draw)
    } else {
      // static stars, no meteors — but brighter so they're still visible
      for (const s of stars) {
        ctx.globalAlpha = Math.min(s.baseAlpha + 0.25, 1) * 0.5
        ctx.drawImage(whiteGlow, s.x - 12, s.y - 12, 24, 24)
        ctx.globalAlpha = Math.min(s.baseAlpha + 0.25, 1)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
      ctx.globalAlpha = 1
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
