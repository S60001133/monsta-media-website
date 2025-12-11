import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text?: string;
  image?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export default function GlitchText({ text, image, className = '', as: Component = 'span' }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 300);

      // Random interval between 2 and 8 seconds
      const nextGlitch = Math.random() * 6000 + 2000;
      setTimeout(triggerGlitch, nextGlitch);
    };

    const timer = setTimeout(triggerGlitch, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (image) {
    return (
      <div className={`relative inline-block ${className}`}>
        <img src={image} alt={text || 'Logo'} className="relative z-10 w-full h-full object-contain" />
        {isGlitching && (
          <>
            <img
              src={image}
              alt="glitch-layer-1"
              className="absolute top-0 left-0 -z-10 w-full h-full object-contain opacity-70 animate-glitch"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)', filter: 'hue-rotate(90deg)' }}
            />
            <img
              src={image}
              alt="glitch-layer-2"
              className="absolute top-0 left-0 -z-10 w-full h-full object-contain opacity-70 animate-glitch"
              style={{ clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)', transform: 'translate(2px)', animationDirection: 'reverse', filter: 'hue-rotate(-90deg)' }}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <Component className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="absolute top-0 left-0 -z-10 w-full h-full text-neon-blue opacity-70 animate-glitch"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)' }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 -z-10 w-full h-full text-brand-pink opacity-70 animate-glitch"
            style={{ clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)', transform: 'translate(2px)', animationDirection: 'reverse' }}
          >
            {text}
          </span>
        </>
      )}
    </Component>
  );
}
