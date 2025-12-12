export default function Footer() {
  const year = new Date().getFullYear()

  const handleNavigation = (path: string) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
    
    // Handle hash anchors for smooth scrolling
    const hashIndex = path.indexOf('#')
    if (hashIndex !== -1) {
      const anchorId = path.substring(hashIndex + 1)
      setTimeout(() => {
        const element = document.getElementById(anchorId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Scroll to top for non-hash navigation
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <style>{`
        .footer-link {
          color: rgba(0, 0, 0, 0.6);
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: #ff1493 !important;
        }
      `}</style>
      <footer className="bg-white border-t border-gray-200 text-black relative z-50" style={{ paddingTop: '20px', paddingBottom: '0px' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-8 text-center md:text-left">
            {/* Brand */}
            <div className="space-y-2 flex flex-col items-center md:items-start">
              <img 
                src="/images/logo.svg" 
                alt="Monsta Media" 
                className="h-12 w-auto mb-4"
                loading="lazy"
              />
              <p className="text-black/60 text-sm leading-snug max-w-xs" style={{ marginLeft: '8px' }}>
                AI-Powered Marketing That Delivers Results
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-6 justify-center md:justify-start" style={{ marginLeft: '12px', marginTop: '24px' }}>
                {/* Facebook */}
                <a 
                  href="https://www.facebook.com/profile.php?id=100093687556341" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:-translate-y-1 transition-transform duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-10 h-10" fill="#ff1493" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/mmgparramatta/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:-translate-y-1 transition-transform duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-10 h-10" fill="#ff1493" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/in/5a8395279" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:-translate-y-1 transition-transform duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-10 h-10" fill="#ff1493" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Empty column for spacing */}
            <div></div>

            {/* Services */}
            <div className="md:col-span-1 flex flex-col items-center md:items-start">
              <h3 className="font-bold mb-4 text-black text-center md:text-left">Services</h3>
              <ul className="text-sm space-y-0.5 md:space-y-2 flex flex-col items-center md:items-start">
                <li><button type="button" onClick={() => handleNavigation('/services#ai-and-automation')} className="footer-link block cursor-pointer text-center md:text-left">AI & Automation</button></li>
                <li><button type="button" onClick={() => handleNavigation('/services#web-development')} className="footer-link block cursor-pointer text-center md:text-left">Web Development</button></li>
                <li><button type="button" onClick={() => handleNavigation('/services#local-or-national-seo')} className="footer-link block cursor-pointer text-center md:text-left">Local or National SEO</button></li>
                <li><button type="button" onClick={() => handleNavigation('/services#social-media-ads')} className="footer-link block cursor-pointer text-center md:text-left">Social Media Ads</button></li>
                <li><button type="button" onClick={() => handleNavigation('/services#organic-social-media')} className="footer-link block cursor-pointer text-center md:text-left">Organic Social Media</button></li>
                <li><button type="button" onClick={() => handleNavigation('/crm')} className="footer-link block cursor-pointer text-center md:text-left">CRM Management</button></li>
                <li><button type="button" onClick={() => handleNavigation('/finance')} className="footer-link block cursor-pointer text-center md:text-left">Get Finance</button></li>
              </ul>
            </div>

            {/* Empty column for spacing */}
            <div></div>

            {/* Contact */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold mb-4 text-black">Get In Touch</h3>
              <ul className="space-y-2 text-sm text-black/60">
                <li>Parramatta, NSW</li>
                <li>Australian Owned</li>
                <li>Australian Operated</li>
                <li className="pt-2">
                  <a 
                    href="https://calendar.monstamediaparramatta.com/calendar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link font-semibold cursor-pointer inline-block"
                    style={{ color: '#ff1493' }}
                  >
                    Book a Free Call →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ marginTop: '60px' }} className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-sm text-center">
            <p className="text-black/60">&copy; {year} Monsta Media Parramatta. All rights reserved.</p>
            <div className="hidden md:block w-px h-5 bg-black/20" aria-hidden="true"></div>
            <div className="block md:hidden h-px w-12 bg-black/20" aria-hidden="true"></div>
            <a href="https://privacy-policy.monstamediaparramatta.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="footer-link cursor-pointer">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  )
}
