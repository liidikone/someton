import '../styles/Palvelut.css'

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

      </div>
    </section>
  )
}
