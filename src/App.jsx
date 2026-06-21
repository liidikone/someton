import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/globals.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Tiimi from './components/Tiimi'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/tiimi" element={<Tiimi />} />
      </Routes>
    </BrowserRouter>
  )
}
