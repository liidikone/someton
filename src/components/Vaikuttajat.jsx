import { useRef, useState, useEffect, useCallback } from 'react'
import '../styles/Vaikuttajat.css'

const CARDS_PER_PAGE = 16
const TOTAL_CARDS = 16
const TOTAL_PAGES = Math.ceil(TOTAL_CARDS / CARDS_PER_PAGE)

/* ── AudioContext singleton ──────────────────────────────────
   We create the context on the first real user gesture (pointerdown)
   so it's never suspended when we actually want to play a sound.   */
let _audioCtx = null
let _audioReady = false

function initAudioCtx() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume synchronously on the gesture tick
  if (_audioCtx.state === 'suspended') {
    _audioCtx.resume()
  }
  _audioReady = _audioCtx.state === 'running'
  return _audioCtx
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

/* ── Desktop: how many cards fit (show 4) ─────────────────── */
const DESKTOP_VISIBLE = 4

function StackedCards() {
  const [activeCard, setActiveCard] = useState(influencers[0].id)
  const scrollRef = useRef(null)
  const cardRefs  = useRef({})

  /* ── Arrow-button auto-scroll state ── */
  const arrowScrollRef = useRef(null)
  const [arrowActive, setArrowActive] = useState(false)

  /* ── Drag-to-scroll state ── */
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 })

  /* ── Init audio on first pointer ── */
  const onFirstInteraction = useCallback(() => {
    initAudioCtx()
    // After resume() the promise resolves async, so mark ready via listener
    if (_audioCtx && _audioCtx.state !== 'running') {
      _audioCtx.addEventListener('statechange', () => {
        if (_audioCtx.state === 'running') _audioReady = true
      }, { once: true })
    } else if (_audioCtx) {
      _audioReady = true
    }
  }, [])

  /* ── IntersectionObserver: active = most-visible card ── */
  useEffect(() => {
    if (!scrollRef.current) return
    const container = scrollRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        let best = null
        let bestRatio = 0
        entries.forEach((e) => {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio
            best = e
          }
        })
        if (best && bestRatio > 0.5) {
          const id = Number(best.target.dataset.cardId)
          setActiveCard((prev) => {
            if (prev !== id) {
              playCardSound()
              return id
            }
            return prev
          })
        }
      },
      {
        root: container,
        threshold: [0.5, 0.8],
        rootMargin: '0px -30% 0px -30%',
      }
    )

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  /* ── Drag-to-scroll (desktop) ── */
  const onMouseDown = useCallback((e) => {
    if (!scrollRef.current) return
    dragRef.current = {
      active: true,
      startX: e.pageX - scrollRef.current.offsetLeft,
      startScrollLeft: scrollRef.current.scrollLeft,
    }
    scrollRef.current.style.cursor = 'grabbing'
    scrollRef.current.style.userSelect = 'none'
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current.active || !scrollRef.current) return
    e.preventDefault()
    const x    = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - dragRef.current.startX) * 1.4
    scrollRef.current.scrollLeft = dragRef.current.startScrollLeft - walk
  }, [])

  const onMouseUp = useCallback(() => {
    if (!scrollRef.current) return
    dragRef.current.active = false
    scrollRef.current.style.cursor = 'grab'
    scrollRef.current.style.userSelect = ''
  }, [])

  /* ── Arrow button: hold to scroll smoothly ── */
  const startArrowScroll = useCallback(() => {
    setArrowActive(true)
    const scroll = () => {
      if (!arrowScrollRef.current) return
      if (!scrollRef.current) return
      const track = scrollRef.current
      track.scrollLeft += 3
      arrowScrollRef.current = requestAnimationFrame(scroll)
    }
    arrowScrollRef.current = requestAnimationFrame(scroll)
  }, [])

  const stopArrowScroll = useCallback(() => {
    setArrowActive(false)
    if (arrowScrollRef.current) {
      cancelAnimationFrame(arrowScrollRef.current)
      arrowScrollRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      if (arrowScrollRef.current) cancelAnimationFrame(arrowScrollRef.current)
    }
  }, [])

  return (
    <div
      className="vi-wrapper"
      onPointerDown={onFirstInteraction}
    >
      {/* Browse hint */}
      <div className="vi-browse-hint" aria-hidden="true">
        <span className="vi-browse-hint__text">Selaa</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Scroll row + arrow button wrapper */}
      <div className="vi-scroll-area">
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
            const isDim    = activeCard !== null && !isActive
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
                  if (activeCard !== card.id) {
                    setActiveCard(card.id)
                    playCardSound()
                  }
                }}
              >
                {isEmpty ? (
                  <div className="vi-card__inset">
                    <span className="vi-card__qmark">?</span>
                  </div>
                ) : (
                  <>
                    <div className="vi-card__bg" style={{ backgroundImage: `url('${card.img}')` }} />
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

        {/* Desktop arrow button */}
        <button
          className={`vi-arrow-btn${arrowActive ? ' vi-arrow-btn--active' : ''}`}
          aria-label="Scroll right"
          onMouseDown={startArrowScroll}
          onMouseUp={stopArrowScroll}
          onMouseLeave={stopArrowScroll}
          onTouchStart={startArrowScroll}
          onTouchEnd={stopArrowScroll}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 11h12M12 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
