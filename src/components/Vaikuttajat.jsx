import { useRef, useState, useEffect, useCallback } from 'react'
import '../styles/Vaikuttajat.css'

/* AudioContext singleton */
let _audioCtx = null
function getAudioCtx() {
  if (!_audioCtx) {
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (_audioCtx.state === 'suspended') _audioCtx.resume()
  return _audioCtx
}

function playCardSound() {
  try {
    const ctx = getAudioCtx()
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

function StackedCards() {
  const [activeCard, setActiveCard] = useState(influencers[0].id)
  const scrollRef = useRef(null)
  const cardRefs = useRef({})

  /* Scroll → activate nearest-centre card via IntersectionObserver */
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

  /* ── Mouse drag-to-scroll (PC) ─────────────────────────── */
  useEffect(() => {
    const track = scrollRef.current
    if (!track) return

    let isDown = false
    let startX = 0
    let scrollLeft = 0
    let moved = false

    const onMouseDown = (e) => {
      isDown = true
      moved = false
      startX = e.pageX - track.offsetLeft
      scrollLeft = track.scrollLeft
      track.style.cursor = 'grabbing'
      track.style.userSelect = 'none'
    }

    const onMouseMove = (e) => {
      if (!isDown) return
      const x = e.pageX - track.offsetLeft
      const walk = (x - startX) * 1.2
      if (Math.abs(walk) > 4) moved = true
      track.scrollLeft = scrollLeft - walk
    }

    const onMouseUp = () => {
      isDown = false
      track.style.cursor = 'grab'
      track.style.userSelect = ''
    }

    const onMouseLeave = () => {
      isDown = false
      track.style.cursor = 'grab'
      track.style.userSelect = ''
    }

    // Prevent click after drag
    const onClickCapture = (e) => {
      if (moved) {
        e.stopPropagation()
        moved = false
      }
    }

    track.addEventListener('mousedown', onMouseDown)
    track.addEventListener('mousemove', onMouseMove)
    track.addEventListener('mouseup', onMouseUp)
    track.addEventListener('mouseleave', onMouseLeave)
    track.addEventListener('click', onClickCapture, true)

    return () => {
      track.removeEventListener('mousedown', onMouseDown)
      track.removeEventListener('mousemove', onMouseMove)
      track.removeEventListener('mouseup', onMouseUp)
      track.removeEventListener('mouseleave', onMouseLeave)
      track.removeEventListener('click', onClickCapture, true)
    }
  }, [])

  /* ── Arrow button scroll ───────────────────────────────── */
  const scrollByPage = useCallback(() => {
    const track = scrollRef.current
    if (!track) return
    const cardWidth = 220 + 16 // card + gap
    track.scrollBy({ left: cardWidth * 4, behavior: 'smooth' })
  }, [])

  const onFirstInteraction = useCallback(() => {
    getAudioCtx()
  }, [])

  return (
    <div className="vi-wrapper" onPointerDown={onFirstInteraction}>
      {/* Browse hint */}
      <div className="vi-browse-hint" aria-hidden="true">
        <span className="vi-browse-hint__text">Selaa</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Scroll area: track + arrow */}
      <div className="vi-scroll-area">
        <div className="vi-scroll-track" ref={scrollRef}>
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

        {/* Arrow button — desktop only */}
        <button
          className="vi-arrow-btn"
          onClick={scrollByPage}
          aria-label="Selaa lisää"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M6 10h8M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
