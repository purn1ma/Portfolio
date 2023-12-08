import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'

import LogoTitle from '../../assets/images/P_logo.png' //P-logo-32px.svg
import AnimatedLetters from '../AnimatedLetters'
// import Logo from './Logo/P_logo.png' // ./Logo
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const nameArray = 'urnima'.split('')
  const jobArray = 'Software Developer.'.split('')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 5100)
  }, [])

  return (
    <>
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

              <img src={LogoTitle} alt="developer" />
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
            Frontend / Backend / Database / <br /> ReactJs / JavaScript /
            NodeJs

          </h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
        </div>
        {/* <Logo /> */}
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Home
