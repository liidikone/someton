import { useState } from 'react'
import '../styles/Tiimi.css'

const teamMembers = [
  { id: 1, tag: 'FOUNDER',          name: 'Santeri Koskinen', img: '/santeri.avif', phone: '+358 50 409 1209', email: 'on@someton.net' },
  { id: 2, tag: 'CO-FOUNDER',       name: 'Jani Karkulahti',  img: '/jani.avif',    phone: '+358 40 578 7376', email: 'on@someton.net' },
  { id: 3, tag: 'ASIAKASPÄÄLLIKKÖ', name: 'Riku Peltomaa',    img: '/riku.avif',    email: 'on@someton.net' },
  // { id: 4, tag: 'ASIAKASPÄÄLLIKKÖ', name: 'Placeholder', email: 'kasvu@placeholder.com' },
]

const influencers = [
  { id: 1, tag: 'VAIKUTTAJA', name: 'Anniina Mäkelä',  img: '/anniina.avif',  email: 'on@someton.net' },
  { id: 2, tag: 'VAIKUTTAJA', name: 'Pauliina Mäkelä', img: '/pauliina.avif', email: 'on@someton.net' },
  // { id: 3, tag: 'VAIKUTTAJA', name: 'Henkilö X', email: 'vaikuttaja@someton.com' },
  // { id: 4, tag: 'VAIKUTTAJA', name: 'Henkilö X', email: 'vaikuttaja@someton.com' },
]


function Member({ tag, name, img, phone, email }) {
  return (
    <div className="tm-card">
      <div className="tm-avatar">
        {img ? (
          <img src={img} alt={name} className="tm-avatar__img" />
        ) : (
          <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="18" r="10" stroke="#999999" strokeWidth="2" />
            <path d="M4 44c0-11 8.954-20 20-20s20 8.954 20 20" stroke="#999999" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <p className="tm-role">{tag}</p>
      <p className="tm-name">{name}</p>
      <div className="tm-contact">
        {phone && <a href={`tel:${phone.replace(/\s+/g, '')}`} className="tm-contact__link">{phone}</a>}
        {email && <a href={`mailto:${email}`} className="tm-contact__link">{email}</a>}
      </div>
    </div>
  )
}

export default function Tiimi() {
  return (
    <section className="tiimi-page" id="tiimi">
      <div className="tiimi-page__inner">

        <div className="tiimi-page__header">
          <h2 className="tiimi-page__title">
            KOKO<span className="tiimi-page__title-on">ON</span>PANO
          </h2>
        </div>

        <div className="tiimi-page__mission">
          <p className="tiimi-page__mission-text">
            SOMET<span className="tiimi-page__title-on">ON</span> ei arvaile algoritmeja, me ymmärrämme niitä. Hyödynnämme tekoälyä datan käsittelyssä, analysoinnissa ja jalostamisessa yhdistäen faktat luovuuteen, jotta syntyy vaikuttavaa ja erottuvaa sisältöä.
          </p>
        </div>

        {/* Tiimi + vaikuttajat yhdessä gridissä */}
        <div className="tiimi-page__grid tiimi-page__grid--all">
          {[...teamMembers, ...influencers].map((m, i) => <Member key={i} {...m} />)}
        </div>

      </div>
    </section>
  )
}
