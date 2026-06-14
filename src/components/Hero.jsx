import { useState } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  const [callOpen, setCallOpen] = useState(false)

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img
          src="/leadikone-bg.avif"
          alt=""
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          SOMESANKARIT<br />
          <span className="hero__title-glow">→LIIDIKONE</span>
        </h1>
        <div className="hero__lead-row">
        <p className="hero__lead">
            Muuta näyttökerrat rahaksi.
          </p>
          <div className="hero__buttons">
            <button className="btn btn--white hero__cta-btn" onClick={() => setCallOpen(true)}>Soita</button>
          </div>
        </div>
      </div>

      {/* Call modal */}
      {callOpen && (
        <div className="hero__call-overlay" onClick={() => setCallOpen(false)}>
          <div className="hero__call-box" onClick={e => e.stopPropagation()}>
            <p className="hero__call-label">Soita meille</p>
            <a href="tel:0501233455" className="hero__call-number">050 123 345 5</a>
            <button className="hero__call-close" onClick={() => setCallOpen(false)}>✕</button>
          </div>
        </div>
      )}

      <div className="hero__powered">
        <span>Powered by <a href="https://synabs.fi" target="_blank" rel="noopener noreferrer">Synabs.fi</a></span>
      </div>
    </section>
  )
}
