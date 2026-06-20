"use client"
import { useEffect, useState } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    function loadSynabsWidget() {
      if (document.querySelector('script[src="https://synabs-admin.vercel.app/widget.js"]')) return

      const script = document.createElement('script')
      script.src = 'https://synabs-admin.vercel.app/widget.js'
      script.setAttribute('data-api-base', 'https://synabs-admin.vercel.app')
      script.setAttribute('data-bot-slug', 'liidikone')
      script.async = true
      document.body.appendChild(script)
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      loadSynabsWidget()
    } else {
      document.addEventListener('DOMContentLoaded', loadSynabsWidget)
      return () => document.removeEventListener('DOMContentLoaded', loadSynabsWidget)
    }
  }, [])

  // Kuuntele chat-widgetin avaus/sulkeminen
  useEffect(() => {
    const handleOpen  = () => setChatOpen(true)
    const handleClose = () => setChatOpen(false)
    window.addEventListener('synabs:open',  handleOpen)
    window.addEventListener('synabs:close', handleClose)
    return () => {
      window.removeEventListener('synabs:open',  handleOpen)
      window.removeEventListener('synabs:close', handleClose)
    }
  }, [])

  // ref_01.avif … ref_10.avif
  const logos = Array.from({ length: 10 }, (_, i) =>
    `/ref_${String(i + 1).padStart(2, '0')}.avif`
  )

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

      {/* Referenssilogo-wheel — vasemmalta, 70% leveyttä */}
      <div className="hero__ref-wheel" aria-hidden="true">
        <div className="hero__ref-track">
          {[...logos, ...logos].map((src, i) => (
            <img key={i} src={src} alt="" className="hero__ref-logo" loading="lazy" />
          ))}
        </div>
      </div>

      <div className="hero__powered-group">
        <img src="/synabs.png" alt="Synabs" className="hero__powered-logo" />
        <p className={`hero__powered-label${chatOpen ? ' is-hidden' : ''}`}>
          Kysymyksiä?<br />Kysy AI agentilta
        </p>
      </div>
    </section>
  )
}
