import { useRef, useState } from 'react'
import '../styles/Vaikuttajat.css'

const CARD_W = 260
const PEEK   = Math.round(CARD_W * 0.40)

function useCardSound() {
  const audioCtx = useRef(null)
  function getCtx() {
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (audioCtx.current.state === 'suspended') audioCtx.current.resume()
    return audioCtx.current
  }
  return function playCardSound() {
    try {
      const ctx = getCtx()
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
      const bandpass = ctx.createBiquadFilter()
      bandpass.type = 'bandpass'
      bandpass.Q.value = 0.6
      bandpass.frequency.setValueAtTime(4200, now)
      bandpass.frequency.exponentialRampToValueAtTime(1500, now + dur)
      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.1, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + dur)
      noise.connect(bandpass)
      bandpass.connect(noiseGain)
      noiseGain.connect(ctx.destination)
      noise.start(now)
      noise.stop(now + dur)
    } catch (_) {}
  }
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
  const [activeCard, setActiveCard] = useState(null)
  const playCardSound = useCardSound()
  const stackWidth = CARD_W + (influencers.length - 1) * PEEK

  function handleEnter(id) {
    if (id !== activeCard) { setActiveCard(id); playCardSound() }
  }

  return (
    <div
      className="vi-scene"
      style={{ width: stackWidth + 'px', height: '380px' }}
      onMouseLeave={() => setActiveCard(null)}
    >
      {influencers.map((card, i) => {
        const isActive = activeCard === card.id
        const isDim    = activeCard !== null && !isActive
        const isEmpty  = !card.img

        return (
          <div
            key={card.id}
            className={
              'vi-card' +
              (isActive ? ' vi-card--active' : '') +
              (isDim    ? ' vi-card--dim'    : '') +
              (isEmpty  ? ' vi-card--empty'  : ' vi-card--filled')
            }
            style={{ left: i * PEEK + 'px', zIndex: isActive ? 50 : influencers.length - i }}
            onMouseEnter={() => handleEnter(card.id)}
          >
            {isEmpty ? (
              <>
                <div className="vi-card__inset">
                  <span className="vi-card__qmark">?</span>
                </div>
              </>
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
  )
}

export default function Vaikuttajat() {
  return (
    <section className="vaikuttajat" id="vaikuttajat">
      <div className="vaikuttajat__inner">

        <div className="vaikuttajat__header">
          <h2 className="vaikuttajat__title">Vaikuttajat</h2>
          <p className="vaikuttajat__lead">
            Vaikuttajaverkostomme koostuu valituista ammattilaisista, jotka ymmärtävät digitaalisen
            sisällön tekemisen, yleisöjen käyttäytymisen ja toimivien lyhytvideoiden rakentamisen.
            He luovat yrityksesi näköistä, koukuttavaa sisältöä, joka herättää kiinnostusta ja
            kasvattaa näkyvyyttä.
          </p>
        </div>

        <div className="vi-scene-wrap">
          <StackedCards />
        </div>

      </div>
    </section>
  )
}
