"use client"
import { useEffect, useRef, useState } from 'react'
import './Tiimi.css'

const teamMembers = [
  {
    id: 1,
    role: 'Founder',
    name: 'Placeholder',
    tag: 'FOUNDER',
    shape: 'square',
  },
  {
    id: 2,
    role: 'Co-Founder',
    name: 'Placeholder',
    tag: 'CO-FOUNDER',
    shape: 'square',
  },
  {
    id: 3,
    role: 'Myyjä',
    name: 'Placeholder',
    tag: 'MYYJÄ',
    shape: 'square',
  },
  {
    id: 4,
    role: 'Myyjä',
    name: 'Placeholder',
    tag: 'MYYJÄ',
    shape: 'square',
  },
]

// Stacked cards data — placeholder-kortit, kuva tulee taustalle
const cards = [
  { id: 1, label: 'Placeholder' },
  { id: 2, label: 'Placeholder' },
  { id: 3, label: 'Placeholder' },
  { id: 4, label: 'Placeholder' },
  { id: 5, label: 'Placeholder' },
]

function useTickSound() {
  const audioCtx = useRef(null)

  function playTick() {
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtx.current
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06)
      gain.gain.setValueAtTime(0.18, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.1)
    } catch (_) {}
  }

  return playTick
}

function StackedCards() {
  const [activeCard, setActiveCard] = useState(null)
  const [prevCard, setPrevCard] = useState(null)
  const playTick = useTickSound()

  function handleEnter(id) {
    if (id !== activeCard) {
      setPrevCard(activeCard)
      setActiveCard(id)
      playTick()
    }
  }

  function handleLeave() {
    setPrevCard(activeCard)
    setActiveCard(null)
  }

  // Stack offset: each card peeks 30% of card width from behind previous
  const CARD_W = 220 // px, matches CSS
  const PEEK = CARD_W * 0.30 // 30% peek

  return (
    <div className="tiimi__stack-scene" onMouseLeave={handleLeave}>
      {cards.map((card, i) => {
        const isActive = activeCard === card.id
        const isInactive = activeCard !== null && !isActive

        // Left offset: first card is leftmost, each subsequent peeks right
        const baseLeft = i * PEEK

        return (
          <div
            key={card.id}
            className={`tiimi__card${isActive ? ' tiimi__card--active' : ''}${isInactive ? ' tiimi__card--dim' : ''}`}
            style={{
              left: `${baseLeft}px`,
              zIndex: isActive ? 50 : cards.length - i,
            }}
            onMouseEnter={() => handleEnter(card.id)}
          >
            {/* Placeholder bg image area */}
            <div className="tiimi__card-bg">
              <div className="tiimi__card-bg-placeholder" />
            </div>

            {/* Card content */}
            <div className="tiimi__card-inner">
              <span className="tiimi__card-label">{card.label}</span>
            </div>

            {/* Green accent line at bottom */}
            <div className="tiimi__card-accent" />
          </div>
        )
      })}
    </div>
  )
}

export default function Tiimi() {
  const founders = teamMembers.slice(0, 2)
  const sellers = teamMembers.slice(2, 4)

  return (
    <section className="tiimi">
      {/* Ambient bg matching hero */}
      <div className="tiimi__bg" aria-hidden="true" />

      <div className="tiimi__container">

        {/* Section eyebrow */}
        <p className="tiimi__eyebrow">TIIMI</p>
        <h2 className="tiimi__title">
          Ihmiset<br />
          <span className="tiimi__title-glow">→Tuloksien takana</span>
        </h2>

        {/* Row 1: Founder + Co-Founder */}
        <div className="tiimi__avatars tiimi__avatars--top">
          {founders.map((m) => (
            <div key={m.id} className="tiimi__avatar-card">
              <div className="tiimi__avatar-img tiimi__avatar-img--square">
                <div className="tiimi__avatar-placeholder">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="10" stroke="rgba(74,222,128,0.4)" strokeWidth="2" />
                    <path d="M4 44c0-11 8.954-20 20-20s20 8.954 20 20" stroke="rgba(74,222,128,0.4)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="tiimi__avatar-info">
                <span className="tiimi__avatar-tag">{m.tag}</span>
                <span className="tiimi__avatar-name">{m.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Myyjä + Myyjä */}
        <div className="tiimi__avatars tiimi__avatars--bottom">
          {sellers.map((m) => (
            <div key={m.id} className="tiimi__avatar-card">
              <div className="tiimi__avatar-img tiimi__avatar-img--square">
                <div className="tiimi__avatar-placeholder">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="18" r="10" stroke="rgba(74,222,128,0.4)" strokeWidth="2" />
                    <path d="M4 44c0-11 8.954-20 20-20s20 8.954 20 20" stroke="rgba(74,222,128,0.4)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="tiimi__avatar-info">
                <span className="tiimi__avatar-tag">{m.tag}</span>
                <span className="tiimi__avatar-name">{m.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stacked cards section */}
        <div className="tiimi__cards-section">
          <p className="tiimi__cards-label">REFERENSSIT</p>
          <StackedCards />
        </div>

      </div>
    </section>
  )
}
