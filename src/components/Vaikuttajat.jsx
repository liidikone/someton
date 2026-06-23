import '../styles/Vaikuttajat.css'

const influencers = [
  { id: 1,  label: 'Anniina',  img: '/sisallontuottaja_01.avif' },
  { id: 2,  label: 'Pauliina', img: '/sisallontuottaja_01.avif' },
  { id: 3,  label: 'Santeri',  img: '/sisallontuottaja_01.avif' },
  { id: 4,  label: 'Veera',    img: '/sisallontuottaja_01.avif' },
  { id: 5,  label: null, img: null },
  { id: 6,  label: null, img: null },
  { id: 7,  label: null, img: null },
  { id: 8,  label: null, img: null },
  { id: 9,  label: null, img: null },
  { id: 10, label: null, img: null },
  { id: 11, label: null, img: null },
  { id: 12, label: null, img: null },
  { id: 13, label: null, img: null },
  { id: 14, label: null, img: null },
  { id: 15, label: null, img: null },
  { id: 16, label: null, img: null },
]

function VaikuttajaCard({ label, img }) {
  const isEmpty = !img

  if (isEmpty) {
    return (
      <div className="vi-card vi-card--empty">
        <div className="vi-card__inset">
          <span className="vi-card__qmark">?</span>
        </div>
      </div>
    )
  }

  return (
    <div className="vi-card vi-card--filled">
      <div className="vi-card__bg" style={{ backgroundImage: `url('${img}')` }} />
      <div className="vi-card__overlay" />
      <div className="vi-card__body">
        <span className="vi-card__label">{label}</span>
      </div>
    </div>
  )
}

export default function Vaikuttajat() {
  const row1 = influencers.slice(0, 8)
  const row2 = influencers.slice(8, 16)

  return (
    <section className="vaikuttajat" id="vaikuttajat">
      <div className="vaikuttajat__inner">

        <div className="vaikuttajat__header">
          <h2 className="vaikuttajat__title">Vaikuttajat</h2>
          <p className="vaikuttajat__lead">
            Vaikuttajaverkostomme koostuu valituista ammattilaisista, jotka ymmärtävät digitaalisen
            sisällön tekemisen, yleisöjen käyttäytymisen ja toimivien lyhytvideoiden rakentamisen.
            He luovat yrityksesi näköistä, koukuttavaa sisältöä, joka herättää kiinnostusta ja
            kasvattaa näkyvyyttä.
          </p>
        </div>

        <div className="vi-grid">
          {row1.map(c => <VaikuttajaCard key={c.id} label={c.label} img={c.img} />)}
        </div>
        <div className="vi-grid">
          {row2.map(c => <VaikuttajaCard key={c.id} label={c.label} img={c.img} />)}
        </div>

      </div>
    </section>
  )
}
