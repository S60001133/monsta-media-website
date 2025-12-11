export default function WhyPartner() {
  return (
    <div style={{ backgroundColor: '#ffffff', width: '100%' }}>
      <style>{`
        .section {
          max-width: 900px;
          margin: 0 auto;
          padding-top: 60px;
          padding-bottom: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }
        .headline-primary {
          margin-top: 0;
          margin-bottom: 10px;
          text-align: center;
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 2.1rem;
          font-weight: 700;
          letter-spacing: -0.015em;
          line-height: 1.1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #000000;
        }

        .headline-secondary {
          margin-top: 10px;
          margin-bottom: 6px;
          text-align: center;
          font-family: 'Montserrat', Arial, sans-serif;
          font-size: 2.7rem;
          font-weight: 900;
          letter-spacing: -0.025em;
          line-height: 1.05;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #ff1493;
        }

        #col-scugP7uMqf {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          justify-content: center;
          width: 100%;
        }
        .feature-box {
          box-sizing: border-box;
          border-radius: 16px;
          background: #fff;
          transition: transform 0.5s cubic-bezier(0.18,0.89,0.32,1.28);
          min-width: 260px;
          max-width: 650px;
          width: 100%;
          padding: 28px 16px;
          border: none;
          box-shadow: none;
          text-align: center;
        }
        .feature-box:hover {
          transform: scale(1.07);
          z-index: 2;
        }
        .feature-box-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          margin-bottom: 10px;
        }
        .icon {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
        }
        .icon img {
          width: 48px;
          height: 48px;
          display: block;
        }
        @media (max-width: 800px) {
          .section, .container, .features-row {
            gap: 12px;
          }
          .headline-primary {
            font-size: 1.17rem;
          }
          .headline-secondary {
            font-size: 1.55rem;
          }
          .feature-box {
            max-width: 98vw;
            padding: 18px 4vw;
          }
        }
        .feature-box h3 {
          margin: 0;
          font-size: 1.35rem;
          font-weight: 700;
          font-family: 'Montserrat', Arial, sans-serif;
          text-align: center;
          letter-spacing: -0.02em;
          color: #3a8dbd;
        }

        .feature-box p {
          margin-bottom: 0;
          font-size: 1.12rem;
          font-family: 'Nunito', Arial, sans-serif;
          line-height: 1.6;
          font-weight: 400;
          text-align: center;
          color: #000000;
        }
      `}</style>

      <div className="section">
        <div className="headline-primary">Why Partner with Monsta Media?</div>
        <div className="headline-secondary">We Deliver MONSTA Results.</div>
        <div className="container">
          <div className="features-row">
            <div className="feature-box">
              <div className="feature-box-header">
                <span className="icon">
                  <img src="https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e386b49e440.svg" alt="AI-Focused Expertise Icon" loading="lazy" />
                </span>
                <h3>AI-Focused Expertise</h3>
              </div>
              <p>We live and breathe AI! For Marketing, Research, and Automations. We know what works.</p>
            </div>
            <div className="feature-box">
              <div className="feature-box-header">
                <span className="icon">
                  <img src="https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d1ba950d30ee1248.svg" alt="No-Nonsense Approach Icon" loading="lazy" />
                </span>
                <h3>No-Nonsense Approach</h3>
              </div>
              <p>Clear strategies that deliver measurable results. Get more calls. Get more leads. Get more ROI's.</p>
            </div>
            <div className="feature-box">
              <div className="feature-box-header">
                <span className="icon">
                  <img src="https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d77957688c4f72.svg" alt="Australian Owned & Operated Icon" loading="lazy" />
                </span>
                <h3>Australian Owned & Operated</h3>
              </div>
              <p>Based in Parramatta, Sydney, we understand the Aussie market and are here for locals.</p>
            </div>
            <div className="feature-box">
              <div className="feature-box-header">
                <span className="icon">
                  <img src="https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/69117933d4d779de898c4f71.svg" alt="Your Growth Partner Icon" loading="lazy" />
                </span>
                <h3>Your Growth Partner</h3>
              </div>
              <p>Committed to your success, acting as an extension of your team.</p>
            </div>
            <div className="feature-box">
              <div className="feature-box-header">
                <span className="icon">
                  <img src="https://storage.googleapis.com/msgsndr/YN0FzeCcwo9zWABV3800/media/6911793375ec1e783449e441.svg" alt="Transparent Reporting Icon" loading="lazy" />
                </span>
                <h3>Transparent Reporting</h3>
              </div>
              <p>You'll always know how your marketing investment is performing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
