import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Backdrop, CircularProgress } from '@mui/material'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

/* Spider chest-emblem SVG — no eyes, tapered abdomen, segmented legs */
const SpiderSVG = () => (
  <svg viewBox="-5 0 110 90" className="spider-svg" aria-hidden="true">
    {/* Head */}
    <ellipse cx="50" cy="13" rx="11" ry="9" className="s-body" />
    {/* Abdomen — tapered teardrop shape like the suit logo */}
    <path
      d="M 34 21 C 32 36, 38 64, 50 75 C 62 64, 68 36, 66 21 C 60 18, 40 18, 34 21 Z"
      className="s-body"
    />
    {/* Suit web lines on abdomen — subtle texture */}
    <path d="M 42 28 L 58 28" className="s-detail" />
    <path d="M 40 38 L 60 38" className="s-detail" />
    <path d="M 41 49 L 59 49" className="s-detail" />
    <path d="M 44 59 L 56 59" className="s-detail" />
    {/* Left legs — two segments each */}
    <path d="M 36 26 L 16 17 L 1 23"   className="s-leg" />
    <path d="M 35 37 L 13 35 L -2 41"  className="s-leg" />
    <path d="M 35 50 L 13 53 L -1 61"  className="s-leg" />
    <path d="M 36 62 L 19 73 L 5 81"   className="s-leg" />
    {/* Right legs — mirror */}
    <path d="M 64 26 L 84 17 L 99 23"  className="s-leg" />
    <path d="M 65 37 L 87 35 L 102 41" className="s-leg" />
    <path d="M 65 50 L 87 53 L 101 61" className="s-leg" />
    <path d="M 64 62 L 81 73 L 95 81"  className="s-leg" />
  </svg>
)

/* Reusable corner web SVG — same geometry rotated per corner */
const CornerWeb = ({ className }) => (
  <svg className={`corner-web ${className}`} viewBox="0 0 110 110" preserveAspectRatio="xMaxYMin meet">
    <line className="w-spoke" x1="110" y1="0" x2="0"   y2="0"   style={{ animationDelay: '0.00s' }} />
    <line className="w-spoke" x1="110" y1="0" x2="0"   y2="28"  style={{ animationDelay: '0.07s' }} />
    <line className="w-spoke" x1="110" y1="0" x2="0"   y2="60"  style={{ animationDelay: '0.14s' }} />
    <line className="w-spoke" x1="110" y1="0" x2="22"  y2="110" style={{ animationDelay: '0.21s' }} />
    <line className="w-spoke" x1="110" y1="0" x2="60"  y2="110" style={{ animationDelay: '0.28s' }} />
    <line className="w-spoke" x1="110" y1="0" x2="110" y2="110" style={{ animationDelay: '0.35s' }} />
    <polyline className="w-ring" points="84,0 85,7 87,13 91,17 96,20 110,21"   style={{ animationDelay: '0.50s' }} />
    <polyline className="w-ring" points="58,0 60,14 64,27 71,36 83,42 110,44"  style={{ animationDelay: '0.68s' }} />
    <polyline className="w-ring" points="32,0 35,21 41,40 52,55 69,64 110,67"  style={{ animationDelay: '0.86s' }} />
    <polyline className="w-ring" points="6,0  10,28 18,54 32,72 55,85 110,88"  style={{ animationDelay: '1.04s' }} />
  </svg>
)

const SuccessScreen = ({ onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 5500)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="spidey-overlay" onClick={onClose}>

      {/* Suit hex-web texture layer */}
      <div className="spidey-hex-bg" aria-hidden="true" />

      {/* Corner webs — top-right and bottom-left */}
      <CornerWeb className="corner-web--tr" />
      <CornerWeb className="corner-web--bl" />

      {/* Spider swings in on web thread */}
      <div className="spider-drop">
        <div className="web-thread" />
        <SpiderSVG />
      </div>

      {/* THWIP with starburst explosion behind it */}
      <div className="thwip-wrapper">
        <span className="thwip-bubble">THWIP!</span>
      </div>

      {/* Message */}
      <div className="spidey-content">
        <p className="spidey-tagline">your friendly neighbourhood developer</p>
        <h2 className="spidey-heading">Message Sent!</h2>
        <p className="spidey-sub">I'll swing back to you shortly</p>
        <p className="spidey-dismiss">tap anywhere to close</p>
      </div>
    </div>
  )
}

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [loading, setLoading] = React.useState(false)
  const [sent, setSent] = React.useState(false)
  const refForm = useRef()

  useEffect(() => {
    const timer = setTimeout(() => setLetterClass('text-animate-hover'), 3000)
    return () => clearTimeout(timer)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    setLoading(true)
    emailjs
      .sendForm(
        'solitude_of_barnacle',
        'portfolio',
        refForm.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false)
          setSent(true)
          refForm.current.reset()
        },
        (err) => {
          setLoading(false)
          console.log(err)
          alert('Failed to send the message, please try again.')
        }
      )
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              strArray={'Contact me'.split('')}
              idx={15}
              letterClass={letterClass}
            />
          </h1>
          <p>
            Thanks for stopping by. If you have a question, want to collaborate,
            or just want to say hi — drop me a line. I'm always happy to chat
            about technology and the things we can build with it.
          </p>
          <div className="contact-form">
            <form onSubmit={sendEmail} ref={refForm}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input type="email" name="email" placeholder="Email" required />
                </li>
                <li>
                  <input type="text" name="subject" placeholder="Subject" required />
                </li>
                <li>
                  <textarea placeholder="Message" name="message" required />
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>

        <div className="contact-info">
          <p className="connect-label">or find me here</p>
          <div className="contact-items">
            <a href="https://www.linkedin.com/in/purnima-shrivastava/" target="_blank" rel="noreferrer" className="contact-item">
              <div className="item-icon"><FontAwesomeIcon icon={faLinkedin} /></div>
              <div className="item-text">
                <span className="item-label">LinkedIn</span>
                <span className="item-value">purnima-shrivastava</span>
              </div>
            </a>
            <a href="https://github.com/purn1ma" target="_blank" rel="noreferrer" className="contact-item">
              <div className="item-icon"><FontAwesomeIcon icon={faGithub} /></div>
              <div className="item-text">
                <span className="item-label">GitHub</span>
                <span className="item-value">purn1ma</span>
              </div>
            </a>
            <div className="contact-item static">
              <div className="item-icon"><FontAwesomeIcon icon={faLocationDot} /></div>
              <div className="item-text">
                <span className="item-label">Location</span>
                <span className="item-value">Noida, India</span>
              </div>
            </div>
          </div>
          <div className="availability">
            <span className="availability-dot" />
            Open to new opportunities
          </div>
        </div>
      </div>

      <Backdrop sx={{ color: 'var(--accent)', zIndex: 1400 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {sent && <SuccessScreen onClose={() => setSent(false)} />}
    </>
  )
}

export default Contact
