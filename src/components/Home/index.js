import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

/* Decorative radial web for the home page right side */
const HomeWebDecor = () => (
  <div className="home-web-wrap" aria-hidden="true">
    <svg className="home-web-decor" viewBox="0 0 320 320">
      <g stroke="var(--accent)" strokeWidth="0.9" fill="none">
        {/* 8 spokes */}
        <line x1="160" y1="160" x2="160" y2="10" />
        <line x1="160" y1="160" x2="266" y2="54" />
        <line x1="160" y1="160" x2="310" y2="160" />
        <line x1="160" y1="160" x2="266" y2="266" />
        <line x1="160" y1="160" x2="160" y2="310" />
        <line x1="160" y1="160" x2="54"  y2="266" />
        <line x1="160" y1="160" x2="10"  y2="160" />
        <line x1="160" y1="160" x2="54"  y2="54" />
        {/* Ring r≈40 */}
        <polygon points="160,120 188,132 200,160 188,188 160,200 132,188 120,160 132,132" />
        {/* Ring r≈80 */}
        <polygon points="160,80 217,103 240,160 217,217 160,240 103,217 80,160 103,103" />
        {/* Ring r≈120 */}
        <polygon points="160,40 245,75 280,160 245,245 160,280 75,245 40,160 75,75" />
        {/* Ring r≈150 (outer) */}
        <polygon points="160,10 266,54 310,160 266,266 160,310 54,266 10,160 54,54" />
      </g>
    </svg>
  </div>
)

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = 'urnima'.split('')
  const jobArray = 'SAP ABAP Developer.'.split('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container home-page">
        <HomeWebDecor />
        <div className="text-zone">
          <div className="intro-text">
            <h1>
              <span className={letterClass}>H</span>
              <span className={`${letterClass} _12`}>i</span>
              <span className={`${letterClass} _13`}>,</span>
              <br />
              <span className={`${letterClass} _14`}>I</span>
              <span className={`${letterClass} _15`}>'</span>
              <span className={`${letterClass} _16`}>m</span>

              <span className="p-initial"> P</span>
              <AnimatedLetters
                letterClass={letterClass}
                strArray={nameArray}
                idx={17}
              />
              <br />
              <AnimatedLetters
                letterClass={letterClass}
                strArray={jobArray}
                idx={23}
              />
            </h1>
          </div>
          <h2>
            SAP ABAP / S/4HANA / Node.js / <br /> Next.js / React / PostgreSQL
          </h2>
          <div className="cta-buttons">
            <Link to="/contact" className="flat-button">
              CONTACT ME
            </Link>
            <Link to="/resume" className="flat-button secondary">
              VIEW RESUME
            </Link>
          </div>
        </div>
      </div>
  )
}

export default Home
