import { Link } from 'react-router-dom'
import {
  faBriefcase,
  faEnvelope,
  faFileAlt,
  faFolder,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemeToggle from '../ThemeToggle'
import TransitionLink from '../TransitionLink'
import './index.scss'

const PSMark = () => (
  <svg
    width="44"
    height="46"
    viewBox="0 0 44 46"
    fill="none"
    className="ps-mark"
    aria-label="Purnima Shrivastava"
  >
    <text
      x="22" y="14"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Space Grotesk', system-ui, sans-serif"
      fontWeight="700"
      fontSize="21"
      fill="var(--accent)"
    >P</text>
    <rect x="8" y="21.5" width="28" height="1" rx="0.5" fill="var(--accent)" opacity="0.22"/>
    <text
      x="22" y="33"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="'Space Grotesk', system-ui, sans-serif"
      fontWeight="700"
      fontSize="21"
      fill="var(--accent)"
    >S</text>
  </svg>
)

const Sidebar = () => {
  return (
    <div className="nav-bar">
      <Link className="logo" to="/">
        <PSMark />
      </Link>
      <nav>
        <TransitionLink to="/">
          <FontAwesomeIcon icon={faHome} />
        </TransitionLink>
        <TransitionLink to="/about" className="about-link">
          <FontAwesomeIcon icon={faUser} />
        </TransitionLink>
        <TransitionLink to="/experience" className="experience-link">
          <FontAwesomeIcon icon={faBriefcase} />
        </TransitionLink>
        <TransitionLink to="/projects" className="projects-link">
          <FontAwesomeIcon icon={faFolder} />
        </TransitionLink>
        <TransitionLink to="/contact" className="contact-link">
          <FontAwesomeIcon icon={faEnvelope} />
        </TransitionLink>
      </nav>
      <ul>
        <li>
          <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/purnima-shrivastava/">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://github.com/purn1ma">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li>
          <a target="_blank" rel="noreferrer" href="https://drive.google.com/file/d/1sNIIGFmVnrxeciIHkOL9Ggq6_-BgPqao/view?usp=sharing">
            <FontAwesomeIcon icon={faFileAlt} />
          </a>
        </li>
      </ul>
      <div className="theme-toggle-wrap">
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Sidebar
