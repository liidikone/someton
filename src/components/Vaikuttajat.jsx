import { useRef, useState, useEffect, useCallback } from 'react'
import '../styles/Vaikuttajat.css'

/* ── AudioContext singleton ─────────────────────────────────
   Create + resume synchronously inside a user-gesture handler
   so the context is RUNNING before we ever call playCardSound. */
let _audioCtx = null
let _audioReady = false

function initAudio() {
  if (_audioCtx) return
  _audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const onState = () => {
    if (_audioCtx.state === 'running') { _audioReady = true }
  }
  _audioCtx.addEventListener('statechange', onState)
  _audioCtx.resume().then(onState)
}

function playCardSound() {
  if (!_audioCtx || !_audioReady) return
  try {
    const ctx = _audioCtx
    const now = ctx.currentTime
    const dur = 0.09
    const bufferSize = Math.floor(ctx.sampleRate * dur)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const bp = ctx.createBiquadFilter()
    bp.type = 'bandpass'
    bp.Q.value = 0.6
    bp.frequency.setValueAtTime(4200, now)
    bp.frequency.exponentialRampToValueAtTime(1500, now + dur)
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.1, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur)
    noise.connect(bp)
    bp.connect(gain)
    gain.connect(ctx.destination)
    noise.start(now)
    noise.stop(now + dur)
  } catch (_) {}
}

const influencers = [
  { id: 1,  label: 'Anniina',  img: '/sisallontuottaja_01.avif' },
  { id: 2,  label: 'Pauliina', img: '/sisallontuottaja_01.avif' },
  { id: 3,  label: 'Santeri',  img: '/sisallontuottaja_01.avif' },
  { id: 4,  label: 'Veera',    img: '/sisallontuottaja_01.avif' },
  { id: 5,  label: null, img: null },
  { id: 6,  label: null, img: null },
  { id: 7,  label: null, img: null },
  { id: 8,  label: null, img: null },
  { id: 9,  label: null, img: null },
  { id: 10, label: null, img: null },
  { id: 11, label: null, img: null },
  { id: 12, label: null, img: null },
  { id: 13, label: null, img: null },
  { id: 14, label: null, img: null },
  { id: 15, label: null, img: null },
  { id: 16, label: null, img: null },
]

/* card width + gap in px – must match CSS */
const CARD_W = 220
const CARD_GAP = 16

function StackedCards() {
  const [activeCard, setActiveCard] = useState(influencers[0].id)
  const scrollRef  = useRef(null)
  const cardRefs   = useRef({})
  const rafRef     = useRef(null)

  /* ── Drag-to-scroll ── */
  const drag = useRef({ on: false, startX: 0, startLeft: 0 })

  const onMouseDown = (e) => {
    if (!scrollRef.current) return
    drag.current = { on: true, startX: e.pageX, startLeft: scrollRef.current.scrollLeft }
    scrollRef.current.style.cursor = 'grabbing'
  }
  const onMouseMove = (e) => {
    if (!drag.current.on || !scrollRef.current) return
    e.preventDefault()
    scrollRef.current.scrollLeft = drag.current.startLeft - (e.pageX - drag.current.startX) * 1.3
  }
  const onMouseUp = () => {
    drag.current.on = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  /* ── Arrow button: scroll exactly one card to the right ── */
  const handleArrow = useCallback(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: CARD_W + CARD_GAP, behavior: 'smooth' })
  }, [])

  /* ── IntersectionObserver → active card ── */
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null, bestRatio = 0
        entries.forEach((e) => {
          if (e.intersectionRatio > bestRatio) { bestRatio = e.intersectionRatio; best = e }
        })
        if (best && bestRatio > 0.5) {
          const id = Number(best.target.dataset.cardId)
          setActiveCard((prev) => {
            if (prev !== id) { playCardSound(); return id }
            return prev
          })
        }
      },
      { root: container, threshold: [0.5, 0.8], rootMargin: '0px -30% 0px -30%' }
    )

    Object.values(cardRefs.current).forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  return (
    <div
      className="vi-wrapper"
      onPointerDown={initAudio}
    >
      {/* Browse hint */}
      <div className="vi-browse-hint" aria-hidden="true">
        <span className="vi-browse-hint__text">Selaa</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Outer overflow-visible shell — MUST wrap the track so shadows aren't clipped */}
      <div className="vi-scroll-shell">
        {/* Inner track: overflow-x scroll but padded so shadows survive */}
        <div
          className="vi-scroll-track"
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {influencers.map((card) => {
            const isActive = activeCard === card.id
            const isDim    = !isActive
            const isEmpty  = !card.img

            return (
              <div
                key={card.id}
                data-card-id={card.id}
                ref={(el) => { cardRefs.current[card.id] = el }}
                className={
                  'vi-card' +
                  (isActive ? ' vi-card--active' : '') +
                  (isDim    ? ' vi-card--dim'    : '') +
                  (isEmpty  ? ' vi-card--empty'  : ' vi-card--filled')
                }
                onClick={() => {
                  if (activeCard !== card.id) { setActiveCard(card.id); playCardSound() }
                }}
              >
                {isEmpty ? (
                  <div className="vi-card__inset">
                    <span className="vi-card__qmark">?</span>
                  </div>
                ) : (
                  <>
                    {/* Inner scaler: handles zoom without card clipping */}
                    <div className="vi-card__scaler">
                      <div className="vi-card__bg" style={{ backgroundImage: `url('${card.img}')` }} />
                    </div>
                    <div className="vi-card__overlay" />
                    <div className="vi-card__body">
                      <span className="vi-card__label">{card.label}</span>
                    </div>
                    <div className="vi-card__accent" />
                  </>
                )}
              </div>
            )
          })}
        </div>

        {/* Arrow — outside track, inside shell */}
        <button
          className="vi-arrow-btn"
          aria-label="Scroll right"
          onClick={handleArrow}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10h12M11 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Vaikuttajat() {
  return (
    <section className="vaikuttajat" id="vaikuttajat">
      <div className="vaikuttajat__inner">
        <div className="vaikuttajat__header">
          <h2 className="vaikuttajat__title">
            SOMET<span className="vaikuttajat__title-on">ON</span>
            <span className="vaikuttajat__title-accent">vaikuttajilla</span>
          </h2>
          <p className="vaikuttajat__lead">
            Vaikuttajaverkostomme koostuu valituista ammattilaisista, jotka ymmärtävät digitaalisen
            sisällön tekemisen, yleisöjen käyttäytymisen ja toimivien lyhytvideoiden rakentamisen.
            He luovat yrityksesi näköistä, koukuttavaa sisältöä, joka herättää kiinnostusta ja
            kasvattaa näkyvyyttä.
          </p>
        </div>
        <StackedCards />
      </div>
    </section>
  )
}
