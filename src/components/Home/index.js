import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

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
