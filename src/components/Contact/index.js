import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Backdrop } from '@mui/material'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

/*
 * Spider SVG modelled on the original Spiderman chest emblem:
 *   – Small oval head (cephalothorax)
 *   – Thin waist oval
 *   – Rounded abdomen below
 *   – 4 legs per side, each a two-segment polyline with ONE sharp bend
 *   – Top 2 pairs sweep UP from the body then angle back out/down
 *   – Bottom 2 pairs sweep DOWN then angle out further
 *   – Very wide horizontal spread (fills a 200-unit viewBox)
 */
const SpiderSVG = () => (
  <svg viewBox="0 0 200 155" className="spider-svg" aria-hidden="true">
    {/* Head */}
    <ellipse cx="100" cy="21" rx="12" ry="10" className="s-body" />
    {/* Waist — thin connector between head and abdomen */}
    <ellipse cx="100" cy="35" rx="6"  ry="5"  className="s-body" />
    {/* Abdomen */}
    <ellipse cx="100" cy="65" rx="18" ry="24" className="s-body" />

    {/* ── Left legs: attach → knee → tip ── */}
    {/* Leg 1: shoots UP-LEFT, knee high above body, tip angles back down */}
    <polyline points="90,42  46,5   12,28"  className="s-leg" />
    {/* Leg 2: goes left with slight upward, knee at mid-height, tip left-down */}
    <polyline points="86,54  32,44  3,70"   className="s-leg" />
    {/* Leg 3: goes left-down, knee at body level, tip continues down */}
    <polyline points="86,68  30,80  3,108"  className="s-leg" />
    {/* Leg 4: shoots DOWN-LEFT, knee below body, tip angles out-down */}
    <polyline points="89,80  46,110 14,144" className="s-leg" />

    {/* ── Right legs: exact mirror (x → 200 − x) ── */}
    <polyline points="110,42 154,5   188,28"  className="s-leg" />
    <polyline points="114,54 168,44  197,70"  className="s-leg" />
    <polyline points="114,68 170,80  197,108" className="s-leg" />
    <polyline points="111,80 154,110 186,144" className="s-leg" />
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
    const t = setTimeout(onClose, 8000)
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

      <Backdrop sx={{ background: 'rgba(6,5,4,0.78)', backdropFilter: 'blur(8px)', zIndex: 1400 }} open={loading}>
        <div className="spidey-loader loader-active" style={{ position: 'static', transform: 'none', opacity: 1, transition: 'none' }}>
          <svg viewBox="0 0 60 60" width="64" height="64" aria-hidden="true">
            <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'slSpinCW 2.5s linear infinite' }}>
              <line x1="30" y1="30" x2="30" y2="4"  stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <line x1="30" y1="30" x2="53" y2="17" stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <line x1="30" y1="30" x2="53" y2="43" stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <line x1="30" y1="30" x2="30" y2="56" stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <line x1="30" y1="30" x2="7"  y2="43" stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <line x1="30" y1="30" x2="7"  y2="17" stroke="var(--accent)" strokeWidth="1"   strokeLinecap="round" opacity="0.65" />
              <polygon points="30,6 51,18 51,42 30,54 9,42 9,18" fill="none" stroke="var(--accent)" strokeWidth="0.8"  strokeLinejoin="round" opacity="0.55" />
            </g>
            <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'slSpinCCW 1.8s linear infinite' }}>
              <polygon points="30,15 43,22.5 43,37.5 30,45 17,37.5 17,22.5" fill="none" stroke="var(--accent)" strokeWidth="0.95" strokeLinejoin="round" opacity="0.75" />
              <polygon points="30,22 37,26 37,34 30,38 23,34 23,26"          fill="none" stroke="var(--accent)" strokeWidth="1.1"  strokeLinejoin="round" />
            </g>
            <circle cx="30" cy="30" r="28" fill="none" stroke="#dc2626" strokeWidth="1.5"
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'slPulseOut 1.4s ease-out infinite' }} />
            <circle cx="30" cy="30" r="4.5" fill="#dc2626"
              style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'slSpiderPulse 0.7s ease-in-out infinite alternate' }} />
          </svg>
        </div>
      </Backdrop>

      {sent && <SuccessScreen onClose={() => setSent(false)} />}
    </>
  )
}

export default Contact
