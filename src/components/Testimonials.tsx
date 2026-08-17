import { useState, useEffect, useRef } from 'react'

interface Testimonial {
  name: string
  text: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    name: "Nikki Koroglu",
    text: "I would recommend Monsta Media to any small business operator. Only been with them for one month doing Facebook adds and the leads have been pouring in! I mostly appreciate the constant communication to help improve results achieved. Thank you guys! 🙏🏽",
    rating: 5
  },
  {
    name: "Joao Otavio Lopes Soares",
    text: "My company is their customer and we are super happy with the service. Since we started doing Google Ads with them we are converting way more in our campaigns than with the previous provider. The team has been doing a great job for us. Thank you!",
    rating: 5
  },
  {
    name: "Oxley Golf Club",
    text: "Monsta has been great in providing campaigns with exactly what we are wanting to promote! We have had excellent exposure online and leads have been phenomenal. They have worked within our budget and we are achieving some great results!",
    rating: 5
  },
  {
    name: "Stephanie Stamateris",
    text: "Monsta Media is THE media group. Their service is impeccable. They are a hard working group and are unbelievably honest with their deliverables. If you need digital marketing – look no further. I couldn't recommend them more because the results speak for themselves!",
    rating: 5
  },
  {
    name: "Marikq Gouveros",
    text: "I highly recommend Monsta Media Group! I found my experience with them to be professional, efficient and effective. They have a hard work ethic and always put their customers first. Highly recommended them.",
    rating: 5
  },
  {
    name: "Alex Shinder",
    text: "I have been with Monsta media for 4 weeks now with them managing my Google adwords, I have found a huge increase already in sales and inquiries. So far very professional and competent management",
    rating: 5
  },
  {
    name: "Jason Laurence",
    text: "After 20+ years in the fitness industry it's a huge relief to finally find a paid and social marketing company that actually does as they say and only said what they can do. I couldn't recommend Monsta more highly. They have a phenomenal team with outstanding time on task management.",
    rating: 5
  },
  {
    name: "Sev Koch",
    text: "I had the pleasure of working with Monsta Media when I started my business. One of the best investments I could have made was trusting these guys to bring in my clients and that is what they did! Would definitely work with Monsta Media again. Thank you Monsta Media 🙌🏽",
    rating: 5
  },
  {
    name: "Jen Dugard",
    text: "Working with Monsta has been a pleasure, the team have been ready and willing to take the time to figure out what works best for our business. They have taken the time to tweak ads and look at different approaches to get the best possible ROI. Great service.",
    rating: 5
  },
  {
    name: "Steve Kennett",
    text: "The team at Monsta Media Group are outstanding & supportive throughout the entire process. As a business owner, I just wanted someone to handle the entire marketing process for me, and most importantly a marketing agency that I could trust! I highly recommend Monsta Media as the go to digital marketing agency that you can trust to deliver!!",
    rating: 5
  },
  {
    name: "Barney Holland",
    text: "I recently started using Monsta for my social media marketing. These guys know their stuff! Really leading the way and the results speak for themselves.",
    rating: 5
  }
]

/**
 * Testimonials — light editorial carousel.
 * Desktop: 3 visible cards with prev/next. Mobile: swipeable snap row.
 * No glow, no glass — cream surface, hairline borders, serif quotes.
 */
export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleCount = 3
  const touchStartX = useRef<number | null>(null)

  const getVisible = () => {
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  // Auto-rotate carousel every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  // Handle keyboard arrow keys
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const renderCard = (t: Testimonial, dimmed: boolean) => (
    <div
      className="flex flex-col"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--hairline)',
        borderRadius: '16px',
        padding: '32px 28px',
        height: '100%',
        minHeight: 280,
        transition: 'opacity 0.4s ease',
        opacity: dimmed ? 0.55 : 1,
        boxShadow: '0 2px 12px rgba(28,24,18,0.04)',
      }}
    >
      {/* Quote mark */}
      <span aria-hidden="true" style={{ fontFamily: 'var(--font-display)', fontSize: 44, lineHeight: 1, color: 'var(--color-brand-pink)', marginBottom: 12 }}>
        &ldquo;
      </span>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--ink)', marginBottom: 24 }}>
        {t.text}
      </p>
      <div style={{ marginTop: 'auto' }}>
        <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15, color: 'var(--ink)', margin: 0 }}>
          {t.name}
        </h4>
        {/* Star Rating */}
        <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
          {Array.from({ length: t.rating || 5 }).map((_, i) => (
            <svg
              key={i}
              style={{ width: 15, height: 15, color: 'var(--color-brand-pink)' }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <section
      style={{
        background: 'var(--paper)',
        padding: '96px 24px 120px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div className="section-wrap" style={{ width: '100%' }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Client Love</div>
          <h2 className="h2-xl">
            Testimonials
          </h2>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:flex relative" style={{ justifyContent: 'center', alignItems: 'stretch' }}>
          {/* Prev */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonials"
            className="absolute flex items-center justify-center"
            style={{
              left: '-56px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid var(--hairline-strong)',
              background: 'var(--surface)',
              color: 'var(--ink)',
              fontSize: 18,
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-brand-pink)'
              e.currentTarget.style.color = 'var(--color-brand-pink)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--hairline-strong)'
              e.currentTarget.style.color = 'var(--ink)'
            }}
          >
            ←
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, maxWidth: 1080 }}>
            {getVisible().map((t, i) => (
              <div key={`${t.name}-${i}`} style={{ display: 'flex' }}>
                {renderCard(t, i === 1 ? false : i === 0 ? false : false)}
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={handleNext}
            aria-label="Next testimonials"
            className="absolute flex items-center justify-center"
            style={{
              right: '-56px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '1px solid var(--hairline-strong)',
              background: 'var(--surface)',
              color: 'var(--ink)',
              fontSize: 18,
              transition: 'border-color 0.25s ease, color 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-brand-pink)'
              e.currentTarget.style.color = 'var(--color-brand-pink)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--hairline-strong)'
              e.currentTarget.style.color = 'var(--ink)'
            }}
          >
            →
          </button>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative w-full">
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--hairline-strong)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 18, zIndex: 5 }}
          >
            ←
          </button>
          <div
            className="flex overflow-x-auto"
            style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', gap: 16, padding: '0 48px', scrollbarWidth: 'none' }}
            onTouchStart={(e) => { touchStartX.current = e.touches[0]?.clientX ?? null }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
              if (dx > 48) handlePrev()
              else if (dx < -48) handleNext()
              touchStartX.current = null
            }}
          >
            {testimonials.map((t) => (
              <div key={t.name} style={{ minWidth: '80vw', maxWidth: '80vw', scrollSnapAlign: 'center', display: 'flex' }}>
                {renderCard(t, false)}
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ width: 40, height: 40, borderRadius: '50%', border: '1px solid var(--hairline-strong)', background: 'var(--surface)', color: 'var(--ink)', fontSize: 18, zIndex: 5 }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}
