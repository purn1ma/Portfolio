import { faJsSquare, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'

import './index.scss'
import { sap, nextjs, pgsql } from '../../assets/logos'

const About = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  return (
    <div className="container about-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
          <p>Hey there, I'm Purnima! Welcome to my little corner of the web.</p>
          <p>
            I'm an SAP ABAP Developer at Genpact, where I build and enhance
            RICEF objects — reports, user exits, BADIs, IDoc/BAPI interfaces,
            and Smart Forms — across FI, MM, and SD modules in SAP ECC. I'm
            actively upskilling toward S/4HANA and clean-core development with
            CDS Views, RAP, OData, and Fiori.
          </p>
          <p>
            Outside of SAP, I enjoy building things on the web with Next.js,
            Node.js, PostgreSQL, and React. Got a project in mind? Let's make
            it real.
          </p>
        </div>
        <div className="stage-cube-cont">
          <div className="cube-hexbg" aria-hidden="true" />
          <div className="cubespinner">
            <div className="face1">
              <img src={sap} alt='SAP ABAP' />
            </div>
            <div className="face2">
              <img src={nextjs} alt='Next.js' className="logo-next" />
            </div>
            <div className="face3">
              <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
            </div>
            <div className="face4">
              <img src={pgsql} alt='PostgreSQL' />
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
  )
}

export default About
