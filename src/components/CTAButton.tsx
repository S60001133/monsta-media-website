import { useRef, useState } from 'react'
import './CTAButton.css'

interface CTAButtonProps {
    text: string
    onClick?: (e: React.MouseEvent) => void
    variant?: 'primary' | 'secondary'
    className?: string
    ripple?: boolean
    magnetic?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

export default function CTAButton({ text, onClick, variant = 'primary', className = '', ripple = true, magnetic = true, size = 'md' }: CTAButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const btnRef = useRef<HTMLButtonElement | null>(null)
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
    const rippleId = useRef(0)

    return (
        <div
            className={`cta-button-wrapper ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The actual button */}
            <button
                type="button"
                ref={btnRef}
                onMouseMove={(e) => {
                    if (!btnRef.current) return
                    const rect = btnRef.current.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const nx = (x / rect.width) * 2 - 1 // -1..1
                    const ny = (y / rect.height) * 2 - 1 // -1..1
                    btnRef.current.style.setProperty('--mx', `${x}px`)
                    btnRef.current.style.setProperty('--my', `${y}px`)
                    btnRef.current.style.setProperty('--nx', `${nx}`)
                    btnRef.current.style.setProperty('--ny', `${ny}`)
                }}
                onClick={(e) => {
                    onClick?.(e)
                    if (!ripple || !btnRef.current) return
                    const rect = btnRef.current.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top
                    const id = rippleId.current++
                    setRipples((prev) => [...prev, { id, x, y }])
                    setTimeout(() => {
                        setRipples((prev) => prev.filter((r) => r.id !== id))
                    }, 600)
                }}
                className={`cta-button cta-button--${variant} cta-button--${size} ${isHovered ? 'hovered' : ''} ${magnetic ? 'magnetic' : ''}`}
            >
                <span className="button-text">{text}</span>
                <div className="button-glow" />
                <span className="button-sheen" />
                <span className="button-trail" />
                {ripple && ripples.map((r) => (
                    <span
                        key={r.id}
                        className="ripple"
                        style={{ left: r.x, top: r.y } as React.CSSProperties}
                    />
                ))}
            </button>
        </div>
    )
}
