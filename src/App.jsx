import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tiimi from './components/Tiimi'
import Palvelut from './components/Palvelut'

const ROUTE_ORDER = ['/', '/tiimi', '/palvelut']

function RouteBackground() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.classList.toggle('bg-light', pathname !== '/')
  }, [pathname])
  return null
}

function PageComponent({ path }) {
  if (path === '/')         return <Hero />
  if (path === '/tiimi')    return <Tiimi />
  if (path === '/palvelut') return <Palvelut />
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  const [current, setCurrent]   = useState(location.pathname)
  const [previous, setPrevious] = useState(null)
  const [direction, setDirection] = useState('forward')
  const [transitioning, setTransitioning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (location.pathname === current) return

    const prevIndex = ROUTE_ORDER.indexOf(current)
    const nextIndex = ROUTE_ORDER.indexOf(location.pathname)
    const dir = nextIndex > prevIndex ? 'forward' : 'backward'

    clearTimeout(timerRef.current)
    setPrevious(current)
    setCurrent(location.pathname)
    setDirection(dir)
    setTransitioning(true)

    timerRef.current = setTimeout(() => {
      setPrevious(null)
      setTransitioning(false)
    }, 420)
  }, [location.pathname])

  return (
    <div className="slide-container">
      {/* Vanha sivu — lähtee ulos */}
      {transitioning && previous && (
        <div
          key={previous}
          className={`slide-page slide-exit slide-exit--${direction}`}
        >
          <PageComponent path={previous} />
        </div>
      )}
      {/* Uusi sivu — tulee sisään */}
      <div
        key={current}
        className={`slide-page${transitioning ? ` slide-enter slide-enter--${direction}` : ''}`}
      >
        <PageComponent path={current} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteBackground />
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
