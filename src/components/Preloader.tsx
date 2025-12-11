import { useState, useEffect } from 'react'
import './Preloader.css'

interface PreloaderProps {
    onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + 1
            })
        }, 30)

        return () => clearInterval(timer)
    }, [])

    const handleComplete = () => {
        setIsExiting(true)
        setTimeout(onComplete, 800) // Match transition duration
    }

    useEffect(() => {
        if (progress === 100) {
            handleComplete()
        }
    }, [progress])

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-800 ${isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className="relative w-64 h-64 mb-12 perspective-1000">
                <div className="absolute inset-0 rounded-full border-4 border-[#ec008c]/30 animate-[spin_3s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border-4 border-[#ec008c]/50 animate-[spin_4s_linear_infinite_reverse]" />
                <div className="absolute inset-8 rounded-full border-4 border-[#ec008c] animate-[spin_5s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 bg-[#ec008c] rounded-full animate-ping" />
                </div>
            </div>

            <div className="text-center space-y-4 z-10">
                <h2 className="text-4xl font-black text-white tracking-tighter animate-pulse">
                    MONSTA MEDIA
                </h2>
                <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#ec008c] transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <p className="text-white/60 font-mono text-sm">{progress}%</p>
            </div>
        </div>
    )
}
