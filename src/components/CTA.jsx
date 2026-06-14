import '../styles/CTA.css'

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta__bg" aria-hidden="true" />
      <div className="cta__overlay">
        <div className="cta__content">
          <h2 className="cta__title">
            Heading line<br />
            Goes here
          </h2>
          <p className="cta__quote">Placeholder text for the call to action goes here.</p>
          <div className="cta__buttons">
            <a href="#" className="btn btn--white">Button 1</a>
            <a href="#" className="btn btn--outline">Button 2</a>
          </div>
        </div>
      </div>
    </section>
  )
}
