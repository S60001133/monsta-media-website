import CTAButton from './CTAButton'

interface LinkItem {
  name: string
  path: string
}

interface MobileOverlayNavProps {
  open: boolean
  onClose: () => void
  onNavigate: (path: string) => void
  links: LinkItem[]
  cta?: {
    text: string
    href: string
    size?: 'xs' | 'md' | 'lg'
    variant?: 'primary' | 'secondary'
  }
}

export default function MobileOverlayNav({ open, onClose, onNavigate, links, cta }: MobileOverlayNavProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose} />
      <nav className="relative z-60 flex flex-col items-center justify-center h-full gap-8 text-white">
        {links.map((link) => (
          <button
            key={link.path}
            onClick={() => onNavigate(link.path)}
            className="text-2xl font-medium hover:text-pink-400 transition-colors"
          >
            {link.name}
          </button>
        ))}
        {cta && (
          <CTAButton
            text={cta.text}
            variant={cta.variant ?? 'primary'}
            size={cta.size ?? 'md'}
            ripple
            magnetic
            onClick={() => { window.open(cta.href, '_blank'); onClose() }}
          />
        )}
      </nav>
    </div>
  )
}
