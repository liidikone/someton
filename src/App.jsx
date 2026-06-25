import { useEffect } from 'react'
import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Palvelut from './components/Palvelut'
import Vaikuttajat from './components/Vaikuttajat'
import Hinnoittelu from './components/Hinnoittelu'
import Tiimi from './components/Tiimi'
import Footer from './components/Footer'
import Tietosuoja from './components/Tietosuoja'

const path = window.location.pathname

export default function App() {
  useEffect(() => {
    document.documentElement.classList.remove('bg-light')
  }, [])

  if (path === '/tietosuoja') {
    return <Tietosuoja />
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Palvelut />
        <Vaikuttajat />
        <Hinnoittelu />
        <Tiimi />
      </main>
      <Footer />
    </>
  )
}
