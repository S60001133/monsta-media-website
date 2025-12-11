import type { ReactNode } from 'react'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  )
}