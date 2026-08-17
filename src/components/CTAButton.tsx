interface CTAButtonProps {
    text: string
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    className?: string
    ripple?: boolean
    magnetic?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * Monsta Media CTA button — flat editorial pill.
 * Same props interface as before (ripple/magnetic accepted and ignored —
 * the vibe-code effects are gone). Clean, GPU-cheap, premium.
 */
export default function CTAButton({ text, onClick, variant = 'primary', className = '', size = 'md' }: CTAButtonProps) {
    const sizes: Record<string, React.CSSProperties> = {
        xs: { padding: '8px 18px', fontSize: 13 },
        sm: { padding: '10px 22px', fontSize: 14 },
        md: { padding: '13px 28px', fontSize: 15 },
        lg: { padding: '16px 34px', fontSize: 16 },
    }

    return (
        <button
            onClick={onClick}
            className={`btn ${variant === 'secondary' ? 'btn-outline' : 'btn-primary'} ${className}`}
            style={sizes[size]}
        >
            <span className="button-text">{text}</span>
        </button>
    )
}
