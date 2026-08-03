import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Footer from './Footer'
import HudBackground from './HudBackground'

interface LayoutProps {
  children: ReactNode
}

/** Thin brand-pink progress bar at the very top that fills with scroll */
function ScrollProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  if (reduceMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 100,
        background: 'linear-gradient(90deg, #ea048b, #ff1493, #bc13fe, #ea048b)',
        backgroundSize: '200% 100%',
        boxShadow: '0 0 12px rgba(234, 4, 139, 0.6)',
        scaleX,
        transformOrigin: '0% 50%',
      }}
    />
  )
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <ScrollProgress />
      {/* Neon HUD backdrop — grid floor + beams + blobs */}
      <HudBackground />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
