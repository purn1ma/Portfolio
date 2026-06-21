import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useWindowDimensions from '../../hooks/useWindowDimension'
import Sidebar from '../Sidebar'
import BottomBar from '../BottomBar'
import ThemeToggle from '../ThemeToggle'
import './index.scss'

/*
 * Two-layer counter-rotating web + expanding pulse ring:
 *   – Outer layer (spokes + outer hex ring): spins clockwise at 2.5 s/rev
 *   – Inner layer (two smaller hex rings): spins counter-clockwise at 1.8 s/rev
 *   – Red pulse ring: expands from centre outward and fades (web-shot energy)
 *   – Red spider dot at centre: throbs between 0.7× and 1.3×
 *
 * ViewBox 60×60, centre (30,30).
 * Hex ring radii: 8 (inner), 15 (mid), 24 (outer) — vertices at 60° intervals.
 * Spokes extend to r = 26 (past the outer ring to the edge).
 */
const SpideyLoader = ({ active }) => (
  <div className={`spidey-loader ${active ? 'loader-active' : 'loader-hidden'}`}>
    <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true">

      {/* Outer layer — clockwise */}
      <g className="sl-outer">
        <line x1="30" y1="30" x2="30" y2="4"  className="sl-spoke" />
        <line x1="30" y1="30" x2="53" y2="17" className="sl-spoke" />
        <line x1="30" y1="30" x2="53" y2="43" className="sl-spoke" />
        <line x1="30" y1="30" x2="30" y2="56" className="sl-spoke" />
        <line x1="30" y1="30" x2="7"  y2="43" className="sl-spoke" />
        <line x1="30" y1="30" x2="7"  y2="17" className="sl-spoke" />
        {/* Outer ring  r = 24 */}
        <polygon points="30,6 51,18 51,42 30,54 9,42 9,18" className="sl-ring-outer" />
      </g>

      {/* Inner layer — counter-clockwise */}
      <g className="sl-inner">
        {/* Mid ring  r = 15 */}
        <polygon points="30,15 43,22.5 43,37.5 30,45 17,37.5 17,22.5" className="sl-ring-mid" />
        {/* Inner ring  r = 8 */}
        <polygon points="30,22 37,26 37,34 30,38 23,34 23,26"          className="sl-ring-in" />
      </g>

      {/* Red pulse ring — expands & fades like a web shot */}
      <circle cx="30" cy="30" r="28" className="sl-pulse" />

      {/* Spider dot — throbs */}
      <circle cx="30" cy="30" r="4.5" className="sl-spider" />
    </svg>
  </div>
)

const Layout = () => {
  const { width } = useWindowDimensions()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 450)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className="app">
      <div className="navbar">
        {width > 480 && <Sidebar />}
        {width <= 480 && <BottomBar />}
        {width <= 480 && (
          <div style={{ position: 'fixed', top: 14, right: 14, zIndex: 1001 }}>
            <ThemeToggle />
          </div>
        )}
      </div>
      <div className="page">
        <span className="tags top-tags">
          <span className="top-tag-doctype"> &lt;!doctype portfolio&gt;</span>
          <br />
          <span className="top-tag-html"> &lt;html&gt;</span>
          <br />
          <span className="body-tag"> &lt;body&gt;</span>
        </span>

        <Outlet />

        <span className="tags bottom-tags">
          <span className="body-tag"> &lt;/body&gt;</span>
          <br />
          <span className="bottom-tag-html"> &lt;/html&gt;</span>
          <br />
          <span className="bottom-thanks"> Thanks for visiting my page!</span>
        </span>
      </div>
      <SpideyLoader active={isLoading} />
    </div>
  )
}

export default Layout
