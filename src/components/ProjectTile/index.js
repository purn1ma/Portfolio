import { Card } from '@mui/material'
import React from 'react'
import './index.scss'

const ProjectTile = ({ title, techstack, snapshot, link }) => {
  return (
    <Card
      className="project-tile-container"
      onClick={() => {
        window.open(link, '_blank')
      }}
    >
      <div className="project-info">
        <div className="project-title">
          <h2>{title}</h2>
        </div>
        <div className="project-techstack">
          {techstack.map((stack, key) => (
            <div key={key} className = "techstack-skill">
              {stack} {key !== techstack.length - 1 ? <span>&#9679;</span> : ''}
            </div>
          ))}
        </div>
      </div>
      <div className="project-snapshot">
        <img src={snapshot} alt="" />
      </div>
    </Card>
  )
}

export default ProjectTile
