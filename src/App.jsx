import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tiimi from './components/Tiimi'

function RouteBackground() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.documentElement.classList.toggle('bg-light', pathname !== '/')
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <RouteBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/tiimi" element={<Tiimi />} />
      </Routes>
    </BrowserRouter>
  )
}
