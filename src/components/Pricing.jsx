import '../styles/Pricing.css'

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing__inner">
        <p className="pricing__label">Label</p>
        <h2 className="pricing__title">
          Heading line one<br />
          <em>Heading line two</em>
        </h2>
        <div className="pricing__guarantee">
          <a href="#" className="pricing__guarantee-link">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: '#fff', flexShrink: 0}}>
              <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="pricing__guarantee-text">Placeholder</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{color: '#fff', flexShrink: 0}}>
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
        <div className="pricing__grid">
          {/* Card 1 */}
          <div className="pricing__card">
            <div className="pricing__card-top">
              <h3 className="pricing__card-title">Plan name</h3>
              <p className="pricing__card-desc">Placeholder description text goes here.</p>
            </div>
            <div className="pricing__price-features-row">
              <div>
                <div className="pricing__card-price">
                  <span className="pricing__amount">0€</span>
                  <span className="pricing__per">PER<br />MONTH</span>
                </div>
                <p className="pricing__messages">Placeholder details<br /><span>Placeholder note</span></p>
              </div>
              <ul className="pricing__features">
                <li>Feature placeholder</li>
                <li>Feature placeholder</li>
                <li>Feature placeholder</li>
                <li>Feature placeholder</li>
                <li>Feature placeholder</li>
              </ul>
            </div>
            <div className="pricing__card-actions">
              <a href="#" className="btn btn--outline">Button 1</a>
              <a href="#" className="pricing__link">Button 2</a>
            </div>
          </div>
          {/* Card 2 */}
          <div className="pricing__card">
            <div className="pricing__card-top">
              <h3 className="pricing__card-title">Plan name</h3>
              <span className="pricing__from">From</span>
              <span className="pricing__amount">0€</span>
            </div>
            <div className="pricing__price-plus">
              <span className="pricing__plus-sign">+</span>
              <span className="pricing__amount pricing__amount--secondary">Add-on placeholder</span>
              <span className="pricing__per">ADD-ON<br />PER MONTH<br /><a href="#" className="pricing__plans-link">Placeholder</a></span>
            </div>
            <div className="pricing__card-actions">
              <a href="#" className="btn btn--outline">Button 1</a>
              <a href="#" className="pricing__link">Button 2</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
