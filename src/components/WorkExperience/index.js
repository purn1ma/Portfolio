import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const EXPERIENCE = [
  {
    company: 'Genpact India Pvt. Ltd',
    role: 'SAP ABAP Developer',
    period: 'Sep 2024 – Present',
    location: 'Noida, India',
    points: [
      'Enhanced 15+ interactive ABAP ALV reports across FI, MM, and SD workflows, improving data visibility for 40+ business users.',
      'Diagnosed and resolved defects in standard and custom ABAP programs through root-cause debugging, reducing recurring production issues by ~15%.',
      'Built 20+ user-exit and BADI enhancements to meet functional requirements without modifying standard SAP objects.',
      'Built IDoc/BAPI interfaces integrating 6+ external systems, Smart Forms, and LSMW migrations handling 50K+ records.',
      'Optimized SELECT statements and internal-table processing, cutting runtime of high-volume reports by ~25%.',
      'Translated 30+ functional specifications from FI, MM, and SD consultants into deployable ABAP solutions across DEV, QA, and production.',
    ],
  },
]

const UPSKILLING = [
  'S/4HANA Clean-Core Architecture',
  'CDS Views & Annotations',
  'RESTful ABAP Programming (RAP)',
  'OData Services (V2 & V4)',
  'SAP Fiori / UI5',
]

const WorkExperience = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  useEffect(() => {
    document.title = 'Experience — Purnima Shrivastava'
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container experience-page">
        <div className="exp-title">
          <h1>
            <AnimatedLetters
              strArray={'Experience'.split('')}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
        </div>
        <div className="experience-timeline">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="experience-card">
              <div className="exp-header">
                <span className="exp-company">{exp.company}</span>
                <div className="exp-meta">
                  <span className="exp-role">{exp.role}</span>
                  <span className="exp-period">{exp.period}</span>
                  <span className="exp-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {exp.location}
                  </span>
                </div>
              </div>
              <ul className="exp-points">
                {exp.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="upskilling-card">
            <div className="up-header">
              <span className="up-label">Currently Upskilling</span>
              <span className="up-sub">S/4HANA · Clean-Core · Modern SAP Stack</span>
            </div>
            <div className="up-tags">
              {UPSKILLING.map((item, i) => (
                <span key={i} className="up-tag">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

export default WorkExperience
