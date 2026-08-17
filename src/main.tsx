import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import Layout from './components/Layout'
import App from './App'

// MotionConfig reducedMotion="never": the site renders its full designed
// animation everywhere, even on machines/browsers that report
// "prefers-reduced-motion: reduce" (Windows "Show animations" off, Edge
// efficiency mode, macOS Reduce Motion). Brand owner requirement — the
// design must look identical in every browser.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="never">
      <Layout>
        <App />
      </Layout>
    </MotionConfig>
  </StrictMode>,
)
