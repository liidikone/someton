import '../styles/Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <img
          src="/leadikone-bg.avif"
          alt=""
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero__content">
        <h1 className="hero__title">
          SOMESANKARIT<br />
          →LIIDIKONE<br />
        </h1>
        <p className="hero__lead">
          Muuta näyttökerrat rahaksi.
        </p>
        <div className="hero__buttons">
          <a href="#" className="btn btn--white">Button 1</a>
          <a href="#" className="btn btn--outline">Button 2</a>
        </div>
      </div>
    </section>
  )
}
