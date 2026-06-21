import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useWindowDimensions from '../../hooks/useWindowDimension'
import Sidebar from '../Sidebar'
import BottomBar from '../BottomBar'
import ThemeToggle from '../ThemeToggle'
import './index.scss'

/*
 * Spinning hexagonal spider-web loader — replaces the old Pac-Man.
 * 6 spokes + 3 concentric hexagonal rings, spider dot at centre.
 * The whole SVG rotates via CSS; colours are CSS-variable-driven so
 * both dark and light themes look correct.
 *
 * Ring radii: 8 / 15 / 22 units inside a 50×50 viewBox (centre 25,25)
 * Hex vertices computed at 60° intervals: sin/cos of 0,60,120,180,240,300°
 */
const SpideyLoader = ({ active }) => (
  <div className={`spidey-loader ${active ? 'loader-active' : 'loader-hidden'}`}>
    <svg viewBox="0 0 50 50" width="52" height="52" aria-hidden="true">
      {/* Spokes */}
      <line x1="25" y1="25" x2="25" y2="3"  className="sl-spoke" />
      <line x1="25" y1="25" x2="44" y2="14" className="sl-spoke" />
      <line x1="25" y1="25" x2="44" y2="36" className="sl-spoke" />
      <line x1="25" y1="25" x2="25" y2="47" className="sl-spoke" />
      <line x1="25" y1="25" x2="6"  y2="36" className="sl-spoke" />
      <line x1="25" y1="25" x2="6"  y2="14" className="sl-spoke" />
      {/* Ring 1  r = 8 */}
      <polygon points="25,17 32,21 32,29 25,33 18,29 18,21"               className="sl-ring" />
      {/* Ring 2  r = 15 */}
      <polygon points="25,10 38,17.5 38,32.5 25,40 12,32.5 12,17.5"       className="sl-ring" />
      {/* Ring 3  r = 22 */}
      <polygon points="25,3 44,14 44,36 25,47 6,36 6,14"                   className="sl-ring" />
      {/* Spider at centre */}
      <circle cx="25" cy="25" r="3.5" className="sl-spider" />
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
