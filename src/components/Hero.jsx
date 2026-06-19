import { useEffect } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  useEffect(() => {
    // Ladataan AI agentti -widget vain kerran, vaikka Hero rendertyisi useasti
    if (document.querySelector('[data-synabs-widget-slug="liidikone"]')) return

    const script = document.createElement('script')
    script.src = 'https://synabs-admin.vercel.app/widget.js'
    script.setAttribute('data-api-base', 'https://synabs-admin.vercel.app')
    script.setAttribute('data-bot-slug', 'liidikone')
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img src="/leadikone-bg.avif" alt="" loading="eager" fetchPriority="high" />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          SOMESANKARIT<br />
          <span className="hero__title-glow">→LIIDIKONE</span>
        </h1>
        <p className="hero__lead">Muuta näyttökerrat rahaksi</p>
      </div>

      <div className="hero__powered-group">
        <img src="/synabs.png" alt="Synabs" className="hero__powered-logo" />
        <p className="hero__powered-label">
          Kysymyksiä?<br />AI agentti vastaa
        </p>
      </div>
    </section>
  )
}
