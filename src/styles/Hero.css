"use client"
import { useEffect, useRef, useState } from 'react'
import '../styles/Hero.css'

export default function Hero() {
  const [chatOpen, setChatOpen] = useState(false)
  const observerRef = useRef(null)

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

  // Tarkkaile chat-widgetin avaus/sulkeminen Shadow DOM:ista
  useEffect(() => {
    // Pollaa DOM:ia — widget asettuu Shadow DOM:iin, joten MutationObserver
    // ei näe sisäisiä muutoksia. Tarkistetaan body-luokka tai data-attribuutti.
    const interval = setInterval(() => {
      const widgetHost = document.querySelector('synabs-widget, [data-synabs-open], .synabs-widget-host')
      if (widgetHost) {
        const isOpen =
          widgetHost.getAttribute('data-open') === 'true' ||
          widgetHost.classList.contains('open') ||
          document.body.classList.contains('synabs-open')
        setChatOpen(isOpen)
      }
    }, 200)

    // Kuuntele myös custom event jota widget saattaa lähettää
    const handleOpen = () => setChatOpen(true)
    const handleClose = () => setChatOpen(false)
    window.addEventListener('synabs:open', handleOpen)
    window.addEventListener('synabs:close', handleClose)

    return () => {
      clearInterval(interval)
      window.removeEventListener('synabs:open', handleOpen)
      window.removeEventListener('synabs:close', handleClose)
    }
  }, [])

  // Logo-lista ref_01 → ref_10
  const refs = Array.from({ length: 10 }, (_, i) => `/ref_0${i + 1}.avif`.replace('ref_010', 'ref_10'))

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

      {/* Referenssi-wheel */}
      <div className="hero__ref-wheel" aria-hidden="true">
        <div className="hero__ref-track">
          {/* Tuplaa logot saumattomaan looppiin */}
          {[...refs, ...refs].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="hero__ref-logo"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <div className="hero__powered-group">
        <img src="/synabs.png" alt="Synabs" className="hero__powered-logo" />

        <div className="hero__powered-btn-wrap">
          {/* Label napin vieressä (ei enää absoluuttisesti yllä) */}
          <p className={`hero__powered-label${chatOpen ? ' is-hidden' : ''}`}>
            Kysymyksiä?<br />Kysy AI agentilta
          </p>
        </div>
      </div>
    </section>
  )
}
