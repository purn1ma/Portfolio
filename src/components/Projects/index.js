import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import AnimatedLetters from '../AnimatedLetters'
import { PROJECTS } from '../../assets/objects'
import wip from '../../assets/images/WIP.png'
import './index.scss'

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [imgSrcs, setImgSrcs] = useState(
    () => Object.fromEntries(PROJECTS.map((p, i) => [i, p.snapshot]))
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleImgError = (i, fallback) => {
    setImgSrcs(prev => ({ ...prev, [i]: fallback || wip }))
  }

  return (
    <div className="container projects-page">
        <div className="my-projects-title">
          <h1>
            <AnimatedLetters
              strArray={'My Projects'.split('')}
              letterClass={letterClass}
              idx={15}
            />
          </h1>
        </div>
        <div className="projects-list">
          {PROJECTS.map((project, i) => (
            <div key={i} className={`project-row${i % 2 === 1 ? ' reverse' : ''}`}>
              <div className="project-image">
                <img
                  src={imgSrcs[i]}
                  alt={project.title}
                  onError={() => handleImgError(i, project.fallback)}
                />
              </div>
              <div className="project-details">
                <span className="project-number">0{i + 1}</span>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.techstack.map((tech, j) => (
                    <span key={j} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                      <FontAwesomeIcon icon={faGithub} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="project-link live">
                      <FontAwesomeIcon icon={faUpRightFromSquare} /> Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Projects
