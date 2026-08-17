import type { ReactNode } from 'react'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { initSmoothScroll } from '../lib/scroll'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // Buttery smooth scrolling (Lenis) — always on for identical feel everywhere
  useEffect(() => initSmoothScroll(), [])

  return (
    <div className="min-h-screen relative" style={{ background: 'var(--paper)' }}>
      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}
