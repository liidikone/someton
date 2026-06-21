import { useRef, useState } from 'react'
import '../styles/Tiimi.css'

const teamMembers = [
  { id: 1, tag: 'FOUNDER',    name: 'Placeholder' },
  { id: 2, tag: 'CO-FOUNDER', name: 'Placeholder' },
  { id: 3, tag: 'MYYJÄ',      name: 'Placeholder' },
  { id: 4, tag: 'MYYJÄ',      name: 'Placeholder' },
]

const contentTeam = [
  { id: 5, tag: 'SISÄLLÖNTUOTTAJA', name: 'Placeholder' },
  { id: 6, tag: 'SISÄLLÖNTUOTTAJA', name: 'Placeholder' },
  { id: 7, tag: 'SISÄLLÖNTUOTTAJA', name: 'Placeholder' },
]

const cards = [
  { id: 1, label: 'sisallontuottaja_01', img: '/sisallontuottaja_01.avif' },
  { id: 2, label: 'sisallontuottaja_02', img: '/sisallontuottaja_02.avif' },
  { id: 3, label: 'sisallontuottaja_03', img: '/sisallontuottaja_03.avif' },
  { id: 4, label: 'sisallontuottaja_04', img: '/sisallontuottaja_04.avif' },
]

const CARD_W = 260
const PEEK   = Math.round(CARD_W * 0.40)

function useTickSound() {
  const audioCtx = useRef(null)
  return function playTick() {
    try {
      if (!audioCtx.current) audioCtx.current = new (window.AudioContext || window.webkitAudioContext)()
      const ctx = audioCtx.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(920, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(460, ctx.currentTime + 0.07)
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.11)
    } catch (_) {}
  }
}

function StackedCards() {
  const [activeCard, setActiveCard] = useState(null)
  const playTick = useTickSound()
  const stackWidth = CARD_W + (cards.length - 1) * PEEK

  function handleEnter(id) {
    if (id !== activeCard) { setActiveCard(id); playTick() }
  }

  return (
    <div
      className="tc-scene"
      style={{ width: stackWidth + 'px', height: '380px' }}
      onMouseLeave={() => setActiveCard(null)}
    >
      {cards.map((card, i) => {
        const isActive   = activeCard === card.id
        const isDim      = activeCard !== null && !isActive
        return (
          <div
            key={card.id}
            className={'tc-card' + (isActive ? ' tc-card--active' : '') + (isDim ? ' tc-card--dim' : '')}
            style={{ left: i * PEEK + 'px', zIndex: isActive ? 50 : cards.length - i }}
            onMouseEnter={() => handleEnter(card.id)}
          >
            <div className="tc-card__bg" style={{ backgroundImage: `url('${card.img}')` }} />
            <div className="tc-card__overlay" />
            <div className="tc-card__body">
              <span className="tc-card__label">{card.label}</span>
            </div>
            <div className="tc-card__accent" />
          </div>
        )
      })}
    </div>
  )
}

function Member({ tag, name }) {
  return (
    <div className="tm-card">
      <div className="tm-avatar">
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="18" r="10" stroke="#cccccc" strokeWidth="2" />
          <path d="M4 44c0-11 8.954-20 20-20s20 8.954 20 20" stroke="#cccccc" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="tm-role">{tag}</p>
      <p className="tm-name">{name}</p>
      <p className="tm-bio">Placeholder bio text goes here.</p>
    </div>
  )
}

export default function Tiimi() {
  return (
    <section className="tiimi-page">
      <div className="tiimi-page__inner">

        <div className="tiimi-page__header">
          <p className="tiimi-page__eyebrow">TIIMI</p>
          <h1 className="tiimi-page__title">Ihmiset<br />tuloksien takana</h1>
        </div>

        <div className="tiimi-page__mission">
          <p className="tiimi-page__mission-text">
            Somesankarit on tiimi, joka muuttaa some-näkyvyyden mitattavaksi liiketoiminnaksi.
            Jokainen meistä tuo pöytään oman erikoisosaamisensa — yhdessä teemme tulosta.
          </p>
        </div>

        <div className="tiimi-page__grid tiimi-page__grid--founders">
          {teamMembers.slice(0, 2).map(m => <Member key={m.id} {...m} />)}
        </div>

        <div className="tiimi-page__grid tiimi-page__grid--sellers">
          {teamMembers.slice(2, 4).map(m => <Member key={m.id} {...m} />)}
        </div>

        <div className="tiimi-page__grid tiimi-page__grid--creators">
          {contentTeam.map(m => <Member key={m.id} {...m} />)}
        </div>

        <hr className="tiimi-page__hr" />

        <div className="tiimi-page__cards-section">
          <p className="tiimi-page__eyebrow">SISÄLLÖNTUOTTAJAT</p>
          <h2 className="tiimi-page__cards-title">Sisältö, joka myy</h2>
          <StackedCards />
        </div>

      </div>
    </section>
  )
}
