import { useState, useEffect, useRef } from 'react'
import CTAButton from './CTAButton'

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

// ===== SPACING & MARGIN CONFIGURATION =====
const spacingConfig = {
  // Section Container
  section: {
    px: '24px',      // px-6
    pt: '5px',      // Reduced from 80px
    pb: '20px',      // Reduced from 64px - less bottom padding
    my: '40px',      // my-10
  },

  // Heading Container
  heading: {
    mb: '20px',      // Reduced from 48px
    py: '0px',       // Reduced from 8px - no padding
    fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
  },

  // Carousel Container
  carousel: {
    mb: '64px',      // mb-16
    mt: '20px',      // Reduced from 120px - less space between heading and carousel
    gapBetweenCards: '24px', // gap-6
    perspective: '1200px',
  },

  // Navigation Arrows
  arrows: {
    width: '32px',   // Smaller from w-16
    height: '32px',  // Smaller from h-16
    borderWidth: '2px',
    iconSize: '20px', // Icon size
  },

  // LEFT & RIGHT CARDS (Side Cards)
  sideCard: {
    width: '256px',  // Reduced from 288px
    height: '280px', // Reduced from 320px
    padding: '20px', // Reduced from 24px
    borderRadius: '16px', // rounded-2xl
    scale: 0.75,
    opacity: 0.4,
    textSize: '13px', // Smaller from text-xs
    textSizeAuthor: '12px', // Smaller
    textSizeStars: '16px', // Star size in px
    lineClamp: 6,
    
    // Inner Spacing
    textBottomMargin: '24px', // Reduced from 32px
    topBorder: '10px',        // Reduced from 12px
    starSpacing: '6px',       // Reduced from 8px
    starGap: '4px',           // gap-1
  },

  // CENTER CARD (Main Focus)
  centerCard: {
    width: '336px',  // Reduced from 384px
    height: '380px', // Reduced from 420px
    padding: '28px', // Reduced from 32px
    borderRadius: '24px', // rounded-3xl
    scale: 1.1,
    borderWidth: '2px',
    
    // Inner Spacing
    textSize: '14px', // Smaller from text-base
    textSizeAuthor: '14px', // Smaller
    textSizeStars: '22px', // Star size in px
    textBottomMargin: '15px', // Reduced from 32px
    topBorder: '14px',        // Reduced from 16px
    starSpacing: '14px',      // Reduced from 16px
    starGap: '4px',           // gap-1
  },

  // Navigation Text
  navText: {
    fontSize: 'text-xs',
    mb: '32px',      // mb-8
  },
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  // Removed unused mobileIndex state
  const visibleCount = 3
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const getVisibleTestimonials = () => {
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

  // Removed handleMobilePrev and handleMobileNext since mobileIndex state is gone

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
    touchEndX.current = null
  }

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    // Swipe navigation variables removed (no longer used)

    // Mobile swipe navigation handlers removed (no longer needed)

    touchStartX.current = null
    touchEndX.current = null
  }

  const renderTestimonialCard = (testimonial: Testimonial, style?: React.CSSProperties) => (
    <div
      className="group relative backdrop-blur-sm flex flex-col shadow-2xl"
      style={{
        backgroundColor: 'rgb(15 23 42 / 0.8)',
        borderWidth: spacingConfig.centerCard.borderWidth,
        borderColor: 'rgb(255 20 147 / 0.5)',
        height: spacingConfig.centerCard.height,
        padding: spacingConfig.centerCard.padding,
        borderRadius: spacingConfig.centerCard.borderRadius,
        boxShadow: '0 25px 50px -12px rgb(255 20 147 / 0.2)',
        ...style,
      }}
    >
      {/* Testimonial Text */}
      <p
        className="text-gray-200 leading-relaxed font-light"
        style={{
          fontSize: spacingConfig.centerCard.textSize,
          marginBottom: spacingConfig.centerCard.textBottomMargin,
          textAlign: 'center',
        }}
      >
        {testimonial.text}
      </p>

      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: spacingConfig.centerCard.starSpacing,
        }}
      >
        {/* Author - Bottom */}
        <div
          className="border-t text-center"
          style={{
            borderColor: 'rgb(255 20 147 / 0.3)',
            paddingTop: spacingConfig.centerCard.topBorder,
          }}
        >
          <h4
            className="text-white font-bold"
            style={{ fontSize: spacingConfig.centerCard.textSizeAuthor }}
          >
            {testimonial.name}
          </h4>
        </div>

        {/* Star Rating */}
        <div
          className="flex justify-center"
          style={{ gap: spacingConfig.centerCard.starGap }}
        >
          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
            <svg
              key={i}
              className="text-yellow-400 fill-current"
              style={{
                width: spacingConfig.centerCard.textSizeStars,
                height: spacingConfig.centerCard.textSizeStars,
              }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
      </div>

      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
        style={{ borderRadius: spacingConfig.centerCard.borderRadius }}
      />
    </div>
  )

  return (
    <section 
      className="relative bg-black" 
      style={{
        padding: `${spacingConfig.section.pt} ${spacingConfig.section.px} calc(${spacingConfig.section.pb} + 80px)`,
        margin: `${spacingConfig.section.my} 0`,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-black via-slate-950 to-black" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[#ff1493]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Section Title */}
        <div
          className="relative z-30"
          style={{
            marginBottom: spacingConfig.heading.mb,
            paddingTop: spacingConfig.heading.py,
            paddingBottom: spacingConfig.heading.py,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <img
            src="/images/testimonials-icon.png"
            alt="Testimonials"
            loading="lazy"
            style={{
              width: '300px',
              height: '150px',
              marginBottom: '16px',
              display: 'block',
            }}
          />
          <h2
            style={{
              fontSize: spacingConfig.heading.fontSize,
              fontFamily: 'Montserrat',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '0.01rem',
              margin: 0,
            }}
          >
            Testimonials
          </h2>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden relative z-20 w-full px-6" style={{ marginBottom: '0px', marginTop: spacingConfig.carousel.mt }}>
          <div
            className="relative w-full"
            style={{ margin: '0 auto', maxWidth: '100vw' }}
          >
            {/* Overlay navigation arrows */}
            <button
              onClick={() => {
                const container = document.getElementById('testimonial-scroll-container');
                if (container) {
                  container.scrollBy({ left: -window.innerWidth * 0.92, behavior: 'smooth' });
                }
              }}
              aria-label="Previous testimonial"
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white w-8 h-8 flex items-center justify-center bg-black/60 rounded-full z-30"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.8)', minWidth: 32, minHeight: 32 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <div
              id="testimonial-scroll-container"
              className="flex overflow-x-auto w-full hide-scrollbar"
              style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', gap: 0, justifyContent: 'center' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  style={{
                    minWidth: '92vw',
                    maxWidth: '92vw',
                    boxSizing: 'border-box',
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    scrollSnapAlign: 'center',
                  }}
                >
                  <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
                    {renderTestimonialCard(testimonial)}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const container = document.getElementById('testimonial-scroll-container');
                if (container) {
                  container.scrollBy({ left: window.innerWidth * 0.92, behavior: 'smooth' });
                }
              }}
              aria-label="Next testimonial"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white w-8 h-8 flex items-center justify-center bg-black/60 rounded-full z-30"
              style={{ textShadow: '0 0 12px rgba(255,255,255,0.8)', minWidth: 32, minHeight: 32 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop Carousel */}
        <div 
          className="hidden md:flex relative z-20" 
          style={{ 
            marginBottom: spacingConfig.carousel.mb,
            marginTop: spacingConfig.carousel.mt,
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-30 transition-all duration-300"
            style={{
              left: '-40px',
              width: spacingConfig.arrows.width,
              height: spacingConfig.arrows.height,
              border: '2px solid white',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '2px solid #ff1493';
              e.currentTarget.style.backgroundColor = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '2px solid white';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Previous testimonials"
          >
            <svg className="fill-current" style={{ width: spacingConfig.arrows.iconSize, height: spacingConfig.arrows.iconSize }} viewBox="0 0 24 24">
              <path d="M15 4l-8 8 8 8" fill="currentColor" />
            </svg>
          </button>

          <div 
            className="flex justify-center items-center"
            style={{
              gap: spacingConfig.carousel.gapBetweenCards,
              perspective: spacingConfig.carousel.perspective,
            }}
          >
            {/* Left Card */}
            <div 
              className="shrink-0 transition-all duration-700 ease-out"
              style={{
                width: spacingConfig.sideCard.width,
                opacity: spacingConfig.sideCard.opacity,
                transform: `scale(${spacingConfig.sideCard.scale})`,
              }}
            >
              <div 
                className="group relative border hover:border-[#ff1493]/40 transition-all duration-500 backdrop-blur-sm flex flex-col"
                style={{
                  backgroundColor: 'rgb(15 23 42 / 0.4)',
                  borderColor: 'rgb(55 65 81 / 0.5)',
                  height: spacingConfig.sideCard.height,
                  padding: spacingConfig.sideCard.padding,
                  borderRadius: spacingConfig.sideCard.borderRadius,
                }}
              >
                {/* Testimonial Text */}
                <p 
                  className="text-gray-300 leading-relaxed font-light"
                  style={{
                    fontSize: spacingConfig.sideCard.textSize,
                    marginBottom: spacingConfig.sideCard.textBottomMargin,
                    display: '-webkit-box',
                    WebkitLineClamp: spacingConfig.sideCard.lineClamp,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  {getVisibleTestimonials()[0]?.text}
                </p>

                <div 
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacingConfig.sideCard.starSpacing,
                  }}
                >
                  {/* Author - Bottom */}
                  <div 
                    className="border-t border-gray-700/50 text-center"
                    style={{ paddingTop: spacingConfig.sideCard.topBorder }}
                  >
                    <h4 
                      className="text-white font-semibold"
                      style={{ fontSize: spacingConfig.sideCard.textSizeAuthor }}
                    >
                      {getVisibleTestimonials()[0]?.name}
                    </h4>
                  </div>

                  {/* Star Rating */}
                  <div 
                    className="flex justify-center"
                    style={{ gap: spacingConfig.sideCard.starGap }}
                  >
                    {Array.from({ length: getVisibleTestimonials()[0]?.rating || 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className="text-yellow-400 fill-current" 
                        style={{
                          width: spacingConfig.sideCard.textSizeStars,
                          height: spacingConfig.sideCard.textSizeStars,
                        }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Center Card - Main Focus */}
            <div
              className="shrink-0 transition-all duration-700 ease-out z-20"
              key={`center-${currentIndex}`}
              style={{
                width: spacingConfig.centerCard.width,
                transformOrigin: 'center center',
                transform: `scale(${spacingConfig.centerCard.scale})`,
              }}
            >
              {renderTestimonialCard(getVisibleTestimonials()[1])}
            </div>

            {/* Right Card */}
            <div 
              className="shrink-0 transition-all duration-700 ease-out"
              style={{
                width: spacingConfig.sideCard.width,
                opacity: spacingConfig.sideCard.opacity,
                transform: `scale(${spacingConfig.sideCard.scale})`,
              }}
            >
              <div 
                className="group relative border hover:border-[#ff1493]/40 transition-all duration-500 backdrop-blur-sm flex flex-col"
                style={{
                  backgroundColor: 'rgb(15 23 42 / 0.4)',
                  borderColor: 'rgb(55 65 81 / 0.5)',
                  height: spacingConfig.sideCard.height,
                  padding: spacingConfig.sideCard.padding,
                  borderRadius: spacingConfig.sideCard.borderRadius,
                }}
              >
                {/* Testimonial Text */}
                <p 
                  className="text-gray-300 leading-relaxed font-light"
                  style={{
                    fontSize: spacingConfig.sideCard.textSize,
                    marginBottom: spacingConfig.sideCard.textBottomMargin,
                    display: '-webkit-box',
                    WebkitLineClamp: spacingConfig.sideCard.lineClamp,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textAlign: 'center',
                  }}
                >
                  {getVisibleTestimonials()[2]?.text}
                </p>

                <div 
                  style={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: spacingConfig.sideCard.starSpacing,
                  }}
                >
                  {/* Author - Bottom */}
                  <div 
                    className="border-t border-gray-700/50 text-center"
                    style={{ paddingTop: spacingConfig.sideCard.topBorder }}
                  >
                    <h4 
                      className="text-white font-semibold"
                      style={{ fontSize: spacingConfig.sideCard.textSizeAuthor }}
                    >
                      {getVisibleTestimonials()[2]?.name}
                    </h4>
                  </div>

                  {/* Star Rating */}
                  <div 
                    className="flex justify-center"
                    style={{ gap: spacingConfig.sideCard.starGap }}
                  >
                    {Array.from({ length: getVisibleTestimonials()[2]?.rating || 5 }).map((_, i) => (
                      <svg 
                        key={i} 
                        className="text-yellow-400 fill-current" 
                        style={{
                          width: spacingConfig.sideCard.textSizeStars,
                          height: spacingConfig.sideCard.textSizeStars,
                        }}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-30 transition-all duration-300"
            style={{
              right: '-40px',
              width: spacingConfig.arrows.width,
              height: spacingConfig.arrows.height,
              border: '2px solid white',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = '2px solid #ff1493';
              e.currentTarget.style.backgroundColor = '#ff1493';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = '2px solid white';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label="Next testimonials"
          >
            <svg className="fill-current" style={{ width: spacingConfig.arrows.iconSize, height: spacingConfig.arrows.iconSize }} viewBox="0 0 24 24">
              <path d="M9 4l8 8-8 8" fill="currentColor" />
            </svg>
          </button>
        </div>


        {/* Desktop Carousel Close */}
        </div>

      {/* Hide scrollbar for mobile carousel */}
      <style>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Webkit */
        }
      `}</style>

      {/* CTA Section - pinned to bottom */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          padding: '4px 0 2px 0', // Reduced padding
          pointerEvents: 'auto',
          zIndex: 30,
        }}
      >
        <CTAButton
          text="Start Your MONSTA Results Today"
          variant="primary"
          size="md"
          ripple
        />
      </div>
    </section>
  );
}
