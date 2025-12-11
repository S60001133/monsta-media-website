import { useEffect, useState } from 'react'
import Home from './pages/Home'
import CRM from './pages/CRM'
import Services from './pages/Services'
import Finance from './pages/Finance'
import About from './pages/About'

function App() {
  const [path, setPath] = useState<string>(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Initialize Vapi AI Assistant button
  useEffect(() => {
    // Prevent duplicate initialization in React StrictMode
    if ((window as any).vapiSDKLoaded) return
    (window as any).vapiSDKLoaded = true

    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"
    script.defer = true
    script.async = true

    script.onload = () => {
      (window as any).vapiSDK.run({
        apiKey: "5fea27dd-0819-45a7-8316-3ae7aaf4b94c",
        assistant: "7ce9488d-5eb7-4137-bbd1-1b14b285f6a9",
        config: {
          position: "bottom-left",
          offset: "16px",
          width: "160px",
          height: "45px",
          idle: {
            color: "rgb(234, 4, 139)",
            type: "pill",
            title: "Wanna Chat?",
            subtitle: "Talk with our AI assistant",
            icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone.svg",
          },
          loading: {
            color: "rgb(234, 4, 139)",
            type: "pill",
            title: "Connecting...",
            subtitle: "Please wait",
            icon: "https://unpkg.com/lucide-static@0.321.0/icons/loader-2.svg",
          },
          active: {
            color: "rgb(255, 0, 0)",
            type: "pill",
            title: "Call is in progress...",
            subtitle: "End the call.",
            icon: "https://unpkg.com/lucide-static@0.321.0/icons/phone-off.svg",
          },
        },
      })
    }

    document.head.appendChild(script)
  }, [])

  const showNav = path !== '/' && path !== '/services' && path !== '/about'

  return (
    <>
      <div className={showNav ? 'pt-20' : ''}>
        {path === '/crm' ? <CRM /> : path === '/services' ? <Services /> : path === '/about' ? <About /> : path === '/finance' ? <Finance /> : <Home />}
      </div>
    </>
  )
}

export default App