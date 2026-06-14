import { useEffect, useRef, useState } from 'react'
import '../styles/Features.css'

const features = [
  { number: '1', title: 'Placeholder feature text goes here.' },
  { number: '2', title: 'Placeholder feature text goes here.' },
  { number: '3', title: 'Placeholder feature text goes here.' },
  { number: '4', title: 'Placeholder feature text goes here.' },
]

export default function Features() {
  const sectionRef = useRef(null)
  const [visibleRows, setVisibleRows] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          features.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows(prev => [...prev, i])
            }, i * 600)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const ARROW_POINTS = "0,0 238,0 260,40 238,80 0,80"

  return (
    <section className="features" id="features" ref={sectionRef}>
      <div className="features__header">
        <h2 className="features__heading">
          Heading line one<br />
          <em>Heading line two</em>
        </h2>
      </div>

      <div className="features__arrows">
        {features.map((f, i) => {
          const isVisible = visibleRows.includes(i)
          return (
            <div
              className={`features__arrow-wrap features__arrow-wrap--${i + 1}${isVisible ? ' features__arrow-wrap--visible' : ''}`}
              key={f.number}
            >
              <svg
                className="features__arrow-svg"
                viewBox="0 0 260 80"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <polygon
                  points={ARROW_POINTS}
                  fill="var(--color-black)"
                />
                <polygon
                  points={ARROW_POINTS}
                  fill="none"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth="1.5"
                  strokeLinejoin="miter"
                />
              </svg>

              <div className="features__arrow-content">
                <span className="features__arrow-number">{f.number}</span>
                <div className="features__arrow-text">
                  <h3 className="features__arrow-title">{f.title}</h3>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
