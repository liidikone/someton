import '../styles/About.css'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__header">
          <p className="about__label">LABEL</p>
          <h2 className="about__title">Heading goes here</h2>
        </div>
        <div className="about__mission">
          <p className="about__mission-text">
            Placeholder text for the mission statement goes here. Replace this with your own content.
          </p>
        </div>
        <div className="about__team">
          <div className="about__member">
            <div className="about__photo" />
            <div className="about__member-info">
              <p className="about__member-name">Name</p>
              <p className="about__member-role">ROLE</p>
              <p className="about__member-bio">
                Placeholder bio text goes here.
              </p>
            </div>
          </div>
          <div className="about__member">
            <div className="about__photo" />
            <div className="about__member-info">
              <p className="about__member-name">Name</p>
              <p className="about__member-role">ROLE</p>
              <p className="about__member-bio">
                Placeholder bio text goes here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
