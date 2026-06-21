import '../styles/Palvelut.css'

const services = [
  { id: 1, title: 'Lyhytvideot',            text: 'Lisäävät näkyvyyttä ja kasvattavat liidien määrää' },
  { id: 2, title: 'Verkkosivut',            text: 'Rakennettu tuottamaan liidejä funnelien avulla' },
  { id: 3, title: 'Kehyttävät AI Agentit',  text: 'Automatisoivat asiakaspalvelua ja liidien keruuta' },
]

function ServiceCard({ title, text }) {
  return (
    <div className="ps-card">
      <div className="ps-card__bg" />
      <div className="ps-card__overlay" />
      <div className="ps-card__body">
        <h3 className="ps-card__title">{title}</h3>
        <p className="ps-card__text">{text}</p>
      </div>
    </div>
  )
}

export default function Palvelut() {
  return (
    <section className="palvelut-page">
      <div className="palvelut-page__inner">

        <div className="palvelut-page__header">
          <h1 className="palvelut-page__title">Kun asiakkaat etsivät,<br />sinä olet näkyvillä</h1>
        </div>

        <div className="palvelut-page__mission">
          <p className="palvelut-page__mission-text">
            Et voi välttää digitaalista muutosta, jossa ihmiset kohtaavat jatkuvasti sisältöjä eri kanavissa,
            kuten hakukoneissa, sosiaalisessa mediassa, verkkosivuilla ja mainonnassa. Autamme sinua olemaan
            mukana juuri siellä, missä asiakkaiden kiinnostus syntyy. Liidikone pitää huolen siitä, että
            markkinointisi, materiaalisi ja työkalusi pysyvät ajan tasalla, jotta tavoitat oikeat ihmiset oikeaan aikaan.
          </p>
        </div>

        <div className="palvelut-page__services">
          {services.map(s => <ServiceCard key={s.id} {...s} />)}
        </div>

      </div>
    </section>
  )
}
