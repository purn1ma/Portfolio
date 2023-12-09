import {
  faJsSquare,
  faNodeJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'

import './index.scss'
import { mdb, pgsql, prsm } from '../../assets/logos'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
      <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
          <p>Hey there, I am Purnmima! Welcome to my little Universe. </p>
          <p>
            {' '}
            Recently turned 23, I'm currently in the final year of engineering
            at BBD NIIT, Lucknow. Still experimenting with things out there. I have
            always been fascinated by the world around me all my life and the
            physics behind everything blows my mind out. I am super excited to
            work on new stuff.
          </p>
          <p>
            {' '}
            If you have some time please checkout my few projects! <br /> Got a
            project in your mind? Let's make it real.
          </p>
        </div>
        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1">
              <img src={mdb} alt='MongoDB' />
            </div>
            <div className="face2">
              <img src={pgsql} alt='PostgreSQL' />
            </div>
            <div className="face3">
              <img src={prsm} alt='Prisma' />
            </div>
            <div className="face4">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face5">
              <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
            </div>
            <div className="face6">
              <FontAwesomeIcon icon={faNodeJs} color="#5FA04E" />
            </div>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default About
