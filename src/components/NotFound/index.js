import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 — Purnima Shrivastava'
  }, [])

  return (
    <div className="not-found-page">
      <svg className="nf-web" viewBox="0 0 260 260" aria-hidden="true">
        <g stroke="var(--accent)" strokeWidth="0.8" fill="none" opacity="0.35">
          <line x1="130" y1="130" x2="130" y2="10" />
          <line x1="130" y1="130" x2="223" y2="67" />
          <line x1="130" y1="130" x2="223" y2="193" />
          <line x1="130" y1="130" x2="130" y2="250" />
          <line x1="130" y1="130" x2="37"  y2="193" />
          <line x1="130" y1="130" x2="37"  y2="67" />
          <polygon points="130,100 156,115 156,145 130,160 104,145 104,115" />
          <polygon points="130,65  175,92  175,148 130,175 85,148  85,92" />
          <polygon points="130,10  223,67  223,193 130,250 37,193  37,67" />
        </g>
      </svg>

      <div className="nf-content">
        <span className="nf-code">404</span>
        <h1 className="nf-heading">Page Not Found</h1>
        <p className="nf-sub">Looks like this strand of the web goes nowhere.</p>
        <Link to="/" className="nf-button">Back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound
