import { useCallback, useEffect, useRef, useState } from 'react'
import type Vapi from '@vapi-ai/web'
import { AudioLines, Mail, MessageCircle, Phone, PhoneOff, X } from 'lucide-react'
import { scrollToTop } from '../lib/scroll'
import './ContactLauncher.css'

/**
 * ContactLauncher — the site's single floating contact button.
 *
 * Replaces the two separate widgets (Botpress chat bubble + Vapi "Wanna Chat?" pill)
 * with one branded button that opens a small menu: text chat, AI voice call, phone,
 * enquiry form.
 *
 * - Botpress is loaded on demand (first hover/focus/click), not on page load, from the
 *   same Studio-managed embed scripts as before. Its own bubble is hidden (see
 *   loadBotpress) and the chat window is opened from our menu via botpress.open().
 * - Vapi uses the official Web SDK (dynamically imported on first call) instead of the
 *   html-script-tag widget, so this button owns the call UI: "Connecting…", then a red
 *   "End call" pill with a timer while the mic is live.
 */

// Botpress Studio → Webchat → Embed. The config URL changes whenever the bot's webchat
// settings are re-published in Studio; update it here when that happens.
const BOTPRESS_INJECT_URL = 'https://cdn.botpress.cloud/webchat/v5.0/inject.js'
const BOTPRESS_CONFIG_URL = 'https://files.bpcontent.cloud/2026/10/19/22/20261019224648-XDHY3KNO.js'
// Hides Botpress's floating bubble (rendered inside its shadow root, so host-page CSS
// can't reach it). If Botpress renames this class the bubble reappears beside ours —
// harmless, but check this selector after major webchat upgrades.
const BOTPRESS_HIDE_FAB_CSS = '.bpFabWrapper{display:none !important}'

const VAPI_PUBLIC_KEY = '5fea27dd-0819-45a7-8316-3ae7aaf4b94c'
const VAPI_ASSISTANT_ID = '7ce9488d-5eb7-4137-bbd1-1b14b285f6a9'

// Vapi AI assistant's phone line
const PHONE_HREF = 'tel:+61482082843'
const PHONE_DISPLAY = '0482 082 843'

interface BotpressApi {
  open: () => void
  close: () => void
  state?: 'initial' | 'opened' | 'closed'
  initialized?: boolean
}

declare global {
  interface Window {
    botpress?: BotpressApi
  }
}

type CallState = 'idle' | 'connecting' | 'active'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(s)
  })
}

let botpressReady: Promise<BotpressApi> | null = null

/**
 * Load Botpress once, with its bubble hidden. Resolves when the API is initialised.
 * The bubble and the chat window share one open shadow root (#fab-root), so hiding the
 * root would hide the chat too — the hide rule is appended inside it instead.
 * (Botpress's `additionalStylesheet` option only reaches the open window, not the bubble.)
 */
function loadBotpress(): Promise<BotpressApi> {
  if (botpressReady) return botpressReady
  botpressReady = (async () => {
    await loadScript(BOTPRESS_INJECT_URL)
    const bp = window.botpress
    if (!bp) throw new Error('Botpress did not load')
    await loadScript(BOTPRESS_CONFIG_URL)
    for (let i = 0; i < 100 && !(bp.initialized && document.getElementById('fab-root')?.shadowRoot); i++) {
      await new Promise((r) => setTimeout(r, 100))
    }
    const root = document.getElementById('fab-root')?.shadowRoot
    if (!bp.initialized || !root) throw new Error('Botpress did not initialise')
    const style = document.createElement('style')
    style.textContent = BOTPRESS_HIDE_FAB_CSS
    root.appendChild(style)
    return bp
  })()
  botpressReady.catch(() => { botpressReady = null })
  return botpressReady
}

const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

export default function ContactLauncher() {
  const [open, setOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatLoading, setChatLoading] = useState(false)
  const [callState, setCallState] = useState<CallState>('idle')
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstItemRef = useRef<HTMLButtonElement>(null)
  const vapiRef = useRef<Vapi | null>(null)

  const closeMenu = useCallback((returnFocus = false) => {
    setOpen(false)
    if (returnFocus) toggleRef.current?.focus()
  }, [])

  // Escape + click outside close the menu
  useEffect(() => {
    if (!open) return
    firstItemRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu(true) }
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open, closeMenu])

  // While the Botpress window is open our button is hidden; the window has its own
  // close control, so watch botpress.state to bring the button back.
  useEffect(() => {
    if (!chatOpen) return
    const id = setInterval(() => {
      if (window.botpress?.state !== 'opened') setChatOpen(false)
    }, 400)
    return () => clearInterval(id)
  }, [chatOpen])

  // Call timer
  useEffect(() => {
    if (callState !== 'active') return
    setSeconds(0)
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [callState])

  // End any live call if the component unmounts
  useEffect(() => () => { vapiRef.current?.stop() }, [])

  const warmUp = () => { loadBotpress().catch(() => {}) }

  const openChat = async () => {
    setError('')
    setChatLoading(true)
    try {
      const bp = await loadBotpress()
      closeMenu()
      bp.open()
      setChatOpen(true)
    } catch {
      setError(`Chat couldn't load. Please call us on ${PHONE_DISPLAY} or send an enquiry.`)
    } finally {
      setChatLoading(false)
    }
  }

  const startCall = async () => {
    setError('')
    closeMenu()
    setCallState('connecting')
    try {
      if (!vapiRef.current) {
        const { default: VapiClient } = await import('@vapi-ai/web')
        const vapi = new VapiClient(VAPI_PUBLIC_KEY)
        vapi.on('call-start', () => setCallState('active'))
        vapi.on('call-end', () => setCallState('idle'))
        vapi.on('error', () => {
          setCallState('idle')
          setError(`The voice call dropped. Please try again, or call us on ${PHONE_DISPLAY}.`)
          setOpen(true)
        })
        vapiRef.current = vapi
      }
      const call = await vapiRef.current.start(VAPI_ASSISTANT_ID)
      if (!call) throw new Error('Call did not start')
    } catch {
      setCallState('idle')
      setError("Couldn't start the call. Check your microphone permission, or call us directly.")
      setOpen(true)
    }
  }

  const endCall = () => {
    vapiRef.current?.stop()
    setCallState('idle')
  }

  const openEnquiries = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    closeMenu()
    window.history.pushState({}, '', '/enquiries?source=Contact%20Button')
    window.dispatchEvent(new PopStateEvent('popstate'))
    scrollToTop()
  }

  if (chatOpen) return null

  return (
    <div ref={rootRef} className="mm-contact" onMouseEnter={warmUp} onFocus={warmUp}>
      <p className="mm-contact-sr" aria-live="polite">
        {callState === 'connecting' ? 'Connecting your call' : callState === 'active' ? 'Call in progress' : ''}
      </p>

      {open && callState === 'idle' && (
        <div id="mm-contact-menu" className="mm-contact-menu" role="dialog" aria-label="Contact Monsta Media">
          <p className="mm-contact-heading">How would you like to talk?</p>
          {error && <p className="mm-contact-error" role="alert">{error}</p>}
          <ul>
            <li>
              <button ref={firstItemRef} type="button" className="mm-contact-item" onClick={openChat} disabled={chatLoading}>
                <span className="mm-contact-icon"><MessageCircle size={18} aria-hidden="true" /></span>
                <span>
                  <span className="mm-contact-title">{chatLoading ? 'Opening chat…' : 'Chat with us'}</span>
                  <span className="mm-contact-sub">Type your question, get an instant reply</span>
                </span>
              </button>
            </li>
            <li>
              <button type="button" className="mm-contact-item" onClick={startCall}>
                <span className="mm-contact-icon"><AudioLines size={18} aria-hidden="true" /></span>
                <span>
                  <span className="mm-contact-title">Talk to our AI assistant</span>
                  <span className="mm-contact-sub">Voice call in your browser · uses your mic</span>
                </span>
              </button>
            </li>
            <li>
              <a className="mm-contact-item" href={PHONE_HREF} onClick={() => closeMenu()}>
                <span className="mm-contact-icon"><Phone size={18} aria-hidden="true" /></span>
                <span>
                  <span className="mm-contact-title">Call us</span>
                  <span className="mm-contact-sub">{PHONE_DISPLAY}</span>
                </span>
              </a>
            </li>
            <li>
              <a className="mm-contact-item" href="/enquiries?source=Contact%20Button" onClick={openEnquiries}>
                <span className="mm-contact-icon"><Mail size={18} aria-hidden="true" /></span>
                <span>
                  <span className="mm-contact-title">Send an enquiry</span>
                  <span className="mm-contact-sub">We reply within one business day</span>
                </span>
              </a>
            </li>
          </ul>
        </div>
      )}

      {callState === 'idle' ? (
        <button
          ref={toggleRef}
          type="button"
          className="mm-contact-toggle"
          aria-expanded={open}
          aria-controls="mm-contact-menu"
          aria-label={open ? 'Close contact options' : 'Contact us'}
          onClick={() => (open ? closeMenu() : setOpen(true))}
        >
          {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
        </button>
      ) : (
        <button
          type="button"
          className={`mm-contact-call ${callState === 'active' ? 'is-active' : ''}`}
          onClick={endCall}
          aria-label={callState === 'active' ? `End call, ${formatTime(seconds)} elapsed` : 'Cancel call'}
        >
          {callState === 'active' && <span className="mm-contact-live" aria-hidden="true" />}
          <PhoneOff size={18} aria-hidden="true" />
          <span>{callState === 'active' ? `End call · ${formatTime(seconds)}` : 'Connecting…'}</span>
        </button>
      )}
    </div>
  )
}
