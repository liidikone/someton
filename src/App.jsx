import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

function AnimatedRoutes() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  const [displayLocation, setDisplayLocation] = useState(location)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (location.pathname === displayLocation.pathname) return

    const prevIndex = ROUTE_ORDER.indexOf(prevPathRef.current)
    const nextIndex = ROUTE_ORDER.indexOf(location.pathname)
    const direction = nextIndex > prevIndex ? 'forward' : 'backward'

    document.documentElement.setAttribute('data-direction', direction)
    setAnimating(true)
    setDisplayLocation(location)
    prevPathRef.current = location.pathname

    const timer = setTimeout(() => {
      setAnimating(false)
      document.documentElement.removeAttribute('data-direction')
    }, 420)

    return () => clearTimeout(timer)
  }, [location])

  return (
    <div className="page-wrapper">
      <div className={animating ? 'page-enter' : undefined} key={displayLocation.key}>
        <Routes location={displayLocation}>
          <Route path="/" element={<Hero />} />
          <Route path="/tiimi" element={<Tiimi />} />
          <Route path="/palvelut" element={<Palvelut />} />
        </Routes>
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
