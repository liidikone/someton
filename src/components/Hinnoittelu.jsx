import { useState } from 'react'
import '../styles/Hinnoittelu.css'

/* ── LYHYTVIDEOT ─────────────────────────────────────────── */
function VideoPackage() {
  const [videos, setVideos] = useState(4)
  const [months, setMonths] = useState(1)
  const [platforms, setPlatforms] = useState([])
  const [wantInfluencer, setWantInfluencer] = useState(false)
  const [wantManagement, setWantManagement] = useState(false)

  const basePrices = { 4: 800, 6: 1100, 8: 1400 }
  const discounts = { 1: 0, 3: 0.05, 6: 0.10 }
  const platformList = ['TikTok', 'Instagram', 'Facebook', 'LinkedIn']

  const togglePlatform = (p) =>
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const base = basePrices[videos]
  const monthly = base * (1 - discounts[months])
  const platformTotal = platforms.length * 100
  const influencerTotal = wantInfluencer ? 200 : 0
  const managementMonthly = wantManagement ? 100 : 0
  const totalPerMonth = monthly + managementMonthly
  const totalOneTime = platformTotal + influencerTotal
  const grandTotal = totalPerMonth * months + totalOneTime

  return (
    <div className="hp-package">
      <div className="hp-package__header">
        <span className="hp-package__icon">🎬</span>
        <div>
          <h3 className="hp-package__title">Lyhytvideot</h3>
          <p className="hp-package__sub">Näkyvyyttä sosiaalisessa mediassa</p>
        </div>
      </div>

      <div className="hp-configurator">

        <div className="hp-config-group">
          <label className="hp-label">Videoiden määrä / kk</label>
          <div className="hp-pills">
            {[4, 6, 8].map(v => (
              <button
                key={v}
                className={`hp-pill${videos === v ? ' hp-pill--active' : ''}`}
                onClick={() => setVideos(v)}
              >
                <span className="hp-pill__count">{v} kpl</span>
                <span className="hp-pill__price">{basePrices[v]}€</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hp-config-group">
          <label className="hp-label">Sopimuksen kesto</label>
          <div className="hp-pills">
            {[
              { m: 1, label: '1 kk' },
              { m: 3, label: '3 kk', badge: '-5%' },
              { m: 6, label: '6 kk', badge: '-10%' },
            ].map(({ m, label, badge }) => (
              <button
                key={m}
                className={`hp-pill${months === m ? ' hp-pill--active' : ''}`}
                onClick={() => setMonths(m)}
              >
                <span className="hp-pill__count">{label}</span>
                {badge && <span className="hp-pill__badge">{badge}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="hp-config-group">
          <label className="hp-label">Alustat <span className="hp-label-note">— 100€/kpl (kertamaksu)</span></label>
          <div className="hp-pills hp-pills--wrap">
            {platformList.map(p => (
              <button
                key={p}
                className={`hp-pill hp-pill--sm${platforms.includes(p) ? ' hp-pill--active' : ''}`}
                onClick={() => togglePlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="hp-config-group">
          <label className="hp-label">Lisäpalvelut</label>
          <div className="hp-toggles">
            <button
              className={`hp-toggle${wantInfluencer ? ' hp-toggle--active' : ''}`}
              onClick={() => setWantInfluencer(v => !v)}
            >
              <span className="hp-toggle__check">{wantInfluencer ? '✓' : '+'}</span>
              <span className="hp-toggle__text">
                Haluan teiltä vaikuttajan videoille
              </span>
              <span className="hp-toggle__price">200€</span>
            </button>
            <button
              className={`hp-toggle${wantManagement ? ' hp-toggle--active' : ''}`}
              onClick={() => setWantManagement(v => !v)}
            >
              <span className="hp-toggle__check">{wantManagement ? '✓' : '+'}</span>
              <span className="hp-toggle__text">
                SOMETON ylläpitää tiliäni ja postaa videot
              </span>
              <span className="hp-toggle__price">100€/kk</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hp-summary">
        <div className="hp-summary__rows">
          <div className="hp-summary__row">
            <span>{videos} videota/kk × {months} kk</span>
            <span>{(monthly * months).toFixed(0)}€</span>
          </div>
          {platforms.length > 0 && (
            <div className="hp-summary__row">
              <span>Alustat ({platforms.join(', ')})</span>
              <span>{platformTotal}€</span>
            </div>
          )}
          {wantInfluencer && (
            <div className="hp-summary__row">
              <span>Vaikuttaja</span>
              <span>200€</span>
            </div>
          )}
          {wantManagement && (
            <div className="hp-summary__row">
              <span>Tilien ylläpito × {months} kk</span>
              <span>{managementMonthly * months}€</span>
            </div>
          )}
        </div>
        <div className="hp-summary__total">
          <span>Yhteensä</span>
          <span className="hp-summary__price">{grandTotal.toFixed(0)}€</span>
        </div>
      </div>
    </div>
  )
}

/* ── VERKKOSIVUT ─────────────────────────────────────────── */
const websiteDetails = [
  {
    heading: 'Suunnittelu',
    items: [
      'Tavoitteiden ja kohderyhmän määrittely',
      'Sivuston rakenteen suunnittelu (wireframe)',
      'Visuaalinen ilme: värit, fontit, tyyli',
    ],
  },
  {
    heading: 'Tekninen toteutus',
    items: [
      'Responsiivinen koodi (toimii mobiilissa ja tietokoneella)',
      'Yhteydenottolomake ja muut toiminnallisuudet',
    ],
  },
  {
    heading: 'Sisältö',
    items: [
      'Tekstien ja kuvien lisääminen sivuille',
      'SEO-optimointi hakukonenäkyvyyttä varten',
    ],
  },
  {
    heading: 'Julkaisu',
    items: [
      'Verkkotunnus ja hosting kuntoon',
      'Testaus eri selaimilla ja laitteilla',
      'Julkaisu ja käyttöönotto',
    ],
  },
]

function WebsitePackage() {
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState('1-5')
  const [analytics, setAnalytics] = useState([])

  const pagePrices = { '1-5': 800, '6-10': 1500, '10+': 2500 }
  const analyticsList = ['Google Analytics + opetus', 'Microsoft Clarity + opetus']

  const toggleAnalytics = (a) =>
    setAnalytics(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  const total = pagePrices[pages] + analytics.length * 100 + 49

  return (
    <div className="hp-package">
      <div className="hp-package__header">
        <span className="hp-package__icon">🌐</span>
        <div>
          <h3 className="hp-package__title">Verkkosivut</h3>
          <p className="hp-package__sub">Modernit sivut jotka tuottavat liidejä</p>
        </div>
      </div>

      <div className="hp-configurator">

        <div className="hp-config-group">
          <label className="hp-label">Sivujen määrä</label>
          <div className="hp-pills">
            {[
              { k: '1-5', label: '1–5 sivua', price: 800 },
              { k: '6-10', label: '6–10 sivua', price: 1500 },
              { k: '10+', label: '+10 sivua', price: 2500 },
            ].map(({ k, label, price }) => (
              <button
                key={k}
                className={`hp-pill${pages === k ? ' hp-pill--active' : ''}`}
                onClick={() => setPages(k)}
              >
                <span className="hp-pill__count">{label}</span>
                <span className="hp-pill__price">{price}€</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hp-config-group">
          <button className="hp-expand-btn" onClick={() => setOpen(v => !v)}>
            <span>Mitä sisältyy pakettiin?</span>
            <span className={`hp-expand-btn__arrow${open ? ' hp-expand-btn__arrow--open' : ''}`}>↓</span>
          </button>
          {open && (
            <div className="hp-details">
              {websiteDetails.map(({ heading, items }) => (
                <div key={heading} className="hp-details__group">
                  <h4 className="hp-details__heading">{heading.toUpperCase()}</h4>
                  <ul className="hp-details__list">
                    {items.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hp-config-group">
          <label className="hp-label">
            Ylläpito <span className="hp-label-note">— 49€/kk (pakollinen)</span>
          </label>
          <div className="hp-included-tag">
            ✓ Sisältyy — tekninen tuki, päivitykset ja ylläpito
          </div>
        </div>

        <div className="hp-config-group">
          <label className="hp-label">Analytiikka <span className="hp-label-note">— 100€/kpl</span></label>
          <div className="hp-pills hp-pills--wrap">
            {analyticsList.map(a => (
              <button
                key={a}
                className={`hp-pill hp-pill--sm${analytics.includes(a) ? ' hp-pill--active' : ''}`}
                onClick={() => toggleAnalytics(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="hp-summary">
        <div className="hp-summary__rows">
          <div className="hp-summary__row">
            <span>Verkkosivut ({pages} sivua)</span>
            <span>{pagePrices[pages]}€</span>
          </div>
          <div className="hp-summary__row">
            <span>Ylläpito</span>
            <span>49€/kk</span>
          </div>
          {analytics.map(a => (
            <div className="hp-summary__row" key={a}>
              <span>{a}</span>
              <span>100€</span>
            </div>
          ))}
        </div>
        <div className="hp-summary__total">
          <span>Aloitushinta sis. ylläpito</span>
          <span className="hp-summary__price">{total}€</span>
        </div>
      </div>
    </div>
  )
}

/* ── AI AGENTTI ──────────────────────────────────────────── */
function AIPackage() {
  return (
    <div className="hp-package hp-package--coming">
      <div className="hp-package__header">
        <span className="hp-package__icon">🤖</span>
        <div>
          <h3 className="hp-package__title">AI agentti</h3>
          <p className="hp-package__sub hp-package__sub--muted">
            <em>Tulossa pian</em>
          </p>
        </div>
      </div>
      <div className="hp-coming-body">
        <p className="hp-coming-text">
          AI agentti integroituna verkkosivuille
        </p>
      </div>
    </div>
  )
}

/* ── MAIN EXPORT ─────────────────────────────────────────── */
export default function Hinnoittelu() {
  return (
    <section className="hinnoittelu" id="hinnoittelu">
      <div className="hinnoittelu__inner">

        <div className="hinnoittelu__header">
          <span className="hinnoittelu__eyebrow">Palvelupaketit</span>
          <h2 className="hinnoittelu__title">
            Valitse oma<br />
            <span className="hinnoittelu__title-accent">→kasvupakettisi</span>
          </h2>
          <p className="hinnoittelu__lead">
            Selkeät kokonaisuudet — räätälöi tarpeesi mukaan ja näe hinta heti.
          </p>
        </div>

        <div className="hinnoittelu__grid">
          <VideoPackage />
          <WebsitePackage />
          <AIPackage />
        </div>

      </div>
    </section>
  )
}
