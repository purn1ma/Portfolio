import React, { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import ProjectTile from '../ProjectTile'

import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleDown,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons'
import useWindowDimensions from '../../hooks/useWindowDimension'

import { PROJECTS } from '../../assets/objects'

const Projects = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const { width } = useWindowDimensions()

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  return (
    <>
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
        <div className="project-container-skeleton">
          <div className="projects-container">
            {PROJECTS.map((project, key) => (
              <ProjectTile
                title={project.title}
                techstack={project.techstack}
                snapshot={project.snapshot}
                link={project.link}
                key={key}
              />
            ))}
          </div>
          <div className="project-arrows">
            <FontAwesomeIcon
              icon={width > 480 ? faArrowAltCircleUp : faArrowAltCircleLeft}
              size={'xl'}
            />
            <FontAwesomeIcon
              icon={width > 480 ? faArrowAltCircleDown : faArrowAltCircleRight}
              size={'xl'}
            />
          </div>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Projects
