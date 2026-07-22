import '../styles/Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__top">
          <a href="#hero" className="footer__logo-link" aria-label="Etusivulle">
            <img src="/logo.avif" alt="Someton" className="footer__logo" />
          </a>
          <p className="footer__slogan">Muuta näyttökerrat rahaksi</p>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <span className="footer__copy">© {year} SOMETON Oy. Kaikki oikeudet pidätetään.</span>

          <div className="footer__links">
            <a href="/tietosuoja" className="footer__link">Tietosuoja</a>
          </div>

          <a
            href="https://www.tiktok.com/@onsometon"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__tiktok"
            aria-label="TikTok"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
            </svg>
          </a>
        </div>

      </div>
    </footer>
  )
}
