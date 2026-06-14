import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Pricing from './components/Pricing'
import CTA from './components/CTA'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Pricing />
      <CTA />
    </>
  )
}
