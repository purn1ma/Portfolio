import useWindowDimensions from '../../hooks/useWindowDimension'
import Sidebar from '../Sidebar'
import BottomBar from '../BottomBar'
import { Outlet } from 'react-router-dom'

import './index.scss'

const Layout = () => {
  const { width } = useWindowDimensions()
  return (
    <div className="app">
      <div className="navbar">
        {width > 480 && <Sidebar />}
        {width <= 480 && <BottomBar />}
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
    </div>
  )
}

export default Layout
