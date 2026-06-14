import { useState } from 'react'
import '../styles/Navbar.css'

const navLinks = [
  { href: '#features', label: 'Link 1' },
  { href: '#about',    label: 'Link 2' },
  { href: '#pricing',  label: 'Link 3' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const closeMenu  = () => setMenuOpen(false)

  const navClass = [
    'navbar',
    menuOpen ? 'navbar--menu-open' : '',
  ].filter(Boolean).join(' ')

  return (
    <nav className={navClass} id="navbar">
      <div className="navbar__inner">

        {/* Logo – vasemmalle */}
        <a href="/" className="navbar__logo" aria-label="Home">
          <span className="navbar__logo-text">LOGO</span>
        </a>

        {/* Linkit + CTA-napit – oikealle */}
        <div className="navbar__right">
          <nav className="navbar__nav" aria-label="Päävalikko">
            <ul className="navbar__list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="navbar__link">{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__ctas">
            <a href="#" className="navbar__link navbar__link--cta-outline">
              Button 1
            </a>
            <a href="#" className="navbar__link navbar__link--cta">
              Button 2
            </a>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label="Avaa valikko"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile-menu${menuOpen ? ' navbar__mobile-menu--open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-label="Mobiilinavigaatio"
      >
        <ul className="navbar__mobile-list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className="navbar__mobile-link" onClick={closeMenu}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#" className="navbar__mobile-link navbar__mobile-link--cta-outline" onClick={closeMenu}>
              Button 1
            </a>
          </li>
          <li>
            <a href="#" className="navbar__mobile-link navbar__mobile-link--cta" onClick={closeMenu}>
              Button 2
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
