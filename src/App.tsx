import { useEffect, useState } from 'react'
import Home from './pages/Home'
import CRM from './pages/CRM'
import Services from './pages/Services'
import Finance from './pages/Finance'
import About from './pages/About'
import Enquiries from './pages/Enquiries'
import Privacy from './pages/Privacy'

function App() {
  const [path, setPath] = useState<string>(window.location.pathname)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return (
    <>
      {path === '/crm' ? (
        <CRM />
      ) : path === '/services' ? (
        <Services />
      ) : path === '/about' ? (
        <About />
      ) : path === '/finance' ? (
        <Finance />
      ) : path === '/enquiries' ? (
        <Enquiries />
      ) : path === '/privacy' ? (
        <Privacy />
      ) : (
        <Home />
      )}
    </>
  )
}

export default App
