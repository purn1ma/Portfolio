import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const RESUME_URL = 'https://drive.google.com/file/d/1sNIIGFmVnrxeciIHkOL9Ggq6_-BgPqao'

const Resume = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.title = 'Resume — Purnima Shrivastava'
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container resume-page">
        <div className="resume-header">
          <h1>
            <AnimatedLetters
              strArray={'Resume'.split('')}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
          <a
            href={`${RESUME_URL}/view?usp=sharing`}
            target="_blank"
            rel="noreferrer"
            className="flat-button"
          >
            OPEN FULL SCREEN&nbsp;
            <FontAwesomeIcon icon={faUpRightFromSquare} size="xs" />
          </a>
        </div>
        <div className="resume-preview">
          {!loaded && (
            <div className="resume-skeleton" aria-label="Loading resume…">
              <div className="skeleton-shimmer" />
            </div>
          )}
          <iframe
            src={`${RESUME_URL}/preview`}
            title="Purnima Shrivastava Resume"
            frameBorder="0"
            allowFullScreen
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </div>
      </div>
  )
}

export default Resume
