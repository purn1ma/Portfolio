import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { faJsSquare, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AnimatedLetters from '../AnimatedLetters'
import { sap, nextjs, pgsql } from '../../assets/logos'
import './index.scss'

/*
 * 6 tech tiles positioned at outer-ring nodes of a hexagonal spider web.
 * `origin` is the CSS transform-origin for the pendulum hover swing —
 * always the tile face pointing toward the web centre (the spoke attachment).
 */
const TILES = [
  { id: 0, icon: <img src={sap}    alt="SAP ABAP"    />, label: 'SAP ABAP',   top: '6.7%',  left: '50%',   origin: '50% 100%', delay: '0s'    },
  { id: 1, icon: <img src={nextjs} alt="Next.js" className="logo-next" />, label: 'Next.js',    top: '28.3%', left: '87.7%', origin: '0% 100%',  delay: '-0.8s' },
  { id: 2, icon: <FontAwesomeIcon icon={faReact}    color="#5ED4F4" />, label: 'React',      top: '71.7%', left: '87.7%', origin: '0% 0%',    delay: '-1.6s' },
  { id: 3, icon: <img src={pgsql}  alt="PostgreSQL"  />, label: 'PostgreSQL', top: '93.3%', left: '50%',   origin: '50% 0%',   delay: '-2.4s' },
  { id: 4, icon: <FontAwesomeIcon icon={faNodeJs}   color="#5FA04E" />, label: 'Node.js',   top: '71.7%', left: '12.3%', origin: '100% 0%',  delay: '-3.2s' },
  { id: 5, icon: <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />, label: 'JavaScript', top: '28.3%', left: '12.3%', origin: '100% 100%',delay: '-4.0s' },
]

/* Hexagonal web with hanging tech tiles — live on the home page right side */
const HomeTechTiles = () => (
  <div className="home-tech-web" aria-label="Tech stack">
    {/* 6-spoke hexagonal web backdrop */}
    <svg className="htw-svg" viewBox="0 0 300 300" aria-hidden="true">
      <g stroke="var(--accent)" strokeWidth="0.85" fill="none">
        <line x1="150" y1="150" x2="150" y2="20"  />
        <line x1="150" y1="150" x2="263" y2="85"  />
        <line x1="150" y1="150" x2="263" y2="215" />
        <line x1="150" y1="150" x2="150" y2="280" />
        <line x1="150" y1="150" x2="37"  y2="215" />
        <line x1="150" y1="150" x2="37"  y2="85"  />
        {/* Inner ring r≈30 */}
        <polygon points="150,120 176,135 176,165 150,180 124,165 124,135" />
        {/* Mid ring r≈75 */}
        <polygon points="150,75 215,113 215,188 150,225 85,188 85,113" />
        {/* Outer ring r≈130 */}
        <polygon points="150,20 263,85 263,215 150,280 37,215 37,85" />
        {/* Anchor knots at tile attachment points */}
        <circle cx="150" cy="20"  r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        <circle cx="263" cy="85"  r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        <circle cx="263" cy="215" r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        <circle cx="150" cy="280" r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        <circle cx="37"  cy="215" r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        <circle cx="37"  cy="85"  r="3.5" fill="var(--accent)" stroke="none" opacity="0.55" />
        {/* Spider at centre */}
        <circle cx="150" cy="150" r="5"   fill="var(--accent)" stroke="none" opacity="0.28" />
      </g>
    </svg>

    {TILES.map(t => (
      <div
        key={t.id}
        className="htw-tile"
        style={{ top: t.top, left: t.left, '--origin': t.origin, animationDelay: t.delay }}
      >
        <div className="htw-card">{t.icon}</div>
        <span className="htw-label">{t.label}</span>
      </div>
    ))}
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
        <div className="cta-buttons">
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
          <Link to="/resume" className="flat-button secondary">
            VIEW RESUME
          </Link>
        </div>
      </div>
      <HomeTechTiles />
    </div>
  )
}

export default Home
