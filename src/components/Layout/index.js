import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Loader from 'react-loaders'
import useWindowDimensions from '../../hooks/useWindowDimension'
import Sidebar from '../Sidebar'
import BottomBar from '../BottomBar'
import ThemeToggle from '../ThemeToggle'
import './index.scss'

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
      <Loader type="pacman" active={isLoading} />
    </div>
  )
}

export default Layout
