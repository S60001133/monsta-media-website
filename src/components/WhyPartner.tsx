import { Stagger, StaggerItem } from './Reveal'
import Reveal from './Reveal'
import TiltCard from './TiltCard'

const FEATURES = [
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e386b49e440.svg',
    title: 'AI-Focused Expertise',
    body: 'We live and breathe AI! For Marketing, Research, and Automations. We know what works.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d1ba950d30ee1248.svg',
    title: 'No-Nonsense Approach',
    body: 'Clear strategies that deliver measurable results. Get more calls. Get more leads. Get more ROI\'s.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d77957688c4f72.svg',
    title: 'Australian Owned & Operated',
    body: 'Based in Parramatta, Sydney, we understand the Aussie market and are here for locals.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d779de898c4f71.svg',
    title: 'Your Growth Partner',
    body: 'Committed to your success, acting as an extension of your team.',
  },
  {
    icon: 'https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e783449e441.svg',
    title: 'Transparent Reporting',
    body: 'You\'ll always know how your marketing investment is performing.',
  },
]

export default function WhyPartner() {
  return (
    <div style={{ backgroundColor: '#030305', width: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Neon divider */}
      <div className="neon-divider mx-auto" style={{ maxWidth: '1100px', width: '80%' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', paddingTop: '72px', paddingBottom: '72px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <Reveal variant="up" amount={0.3}>
          <div className="hud-label" style={{ textAlign: 'center' }}>Why Partner with Monsta Media?</div>
        </Reveal>
        <Reveal variant="up" delay={0.1} amount={0.3}>
          <h2
            style={{
              margin: 0,
              textAlign: 'center',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(1.6rem, 4.5vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            We Deliver{' '}
            <span className="text-gradient-animated" style={{ display: 'inline-block' }}>MONSTA Results.</span>
          </h2>
        </Reveal>

        <div style={{ width: '100%', marginTop: '32px' }}>
          <Stagger className="features-grid" gap={0.12} amount={0.1}>
            {FEATURES.map((f) => (
              <StaggerItem key={f.title} className="feature-cell">
                <TiltCard className="feature-box neon-border" radius={16} maxTilt={7} scale={1.03} glowColor="rgba(255, 20, 147, 0.16)">
                  <div style={{ padding: '26px 22px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <span className="hud-corners" style={{ display: 'inline-flex', padding: '10px', borderRadius: 12, background: 'rgba(255,20,147,0.08)' }}>
                      <img src={f.icon} alt={`${f.title} Icon`} loading="lazy" style={{ width: 44, height: 44, display: 'block', filter: 'drop-shadow(0 0 10px rgba(255,20,147,0.6))' }} />
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, fontFamily: 'Montserrat, sans-serif', color: '#ffffff' }}>{f.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.72)' }}>{f.body}</p>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>

      <style>{`
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          width: 100%;
        }
        .feature-cell {
          height: 100%;
        }
        .feature-box {
          height: 100%;
          background: linear-gradient(160deg, #0b0b18 0%, #07070f 100%);
        }
        @media (max-width: 560px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
