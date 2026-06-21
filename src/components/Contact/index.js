import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Backdrop, CircularProgress } from '@mui/material'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const SpiderSVG = () => (
  <svg viewBox="0 0 100 88" className="spider-svg" aria-hidden="true">
    {/* Head */}
    <ellipse cx="50" cy="22" rx="13" ry="10" className="s-body" />

    {/* Eyes — Spiderman pointed-inward style */}
    <path d="M 36 19 L 43 17 L 48 21 L 48 27 L 43 30 L 36 27 Z" className="s-eye" />
    <path d="M 52 21 L 57 17 L 64 19 L 64 27 L 57 30 L 52 27 Z" className="s-eye" />

    {/* Abdomen */}
    <ellipse cx="50" cy="51" rx="15" ry="19" className="s-body" />

    {/* Left legs */}
    <path d="M 37 28 Q 22 22, 7 20"  className="s-leg" />
    <path d="M 36 38 Q 18 38, 3 40"  className="s-leg" />
    <path d="M 36 52 Q 18 56, 3 62"  className="s-leg" />
    <path d="M 37 64 Q 22 72, 8 80"  className="s-leg" />

    {/* Right legs */}
    <path d="M 63 28 Q 78 22, 93 20" className="s-leg" />
    <path d="M 64 38 Q 82 38, 97 40" className="s-leg" />
    <path d="M 64 52 Q 82 56, 97 62" className="s-leg" />
    <path d="M 63 64 Q 78 72, 92 80" className="s-leg" />
  </svg>
)

const SuccessScreen = ({ onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="spidey-overlay" onClick={onClose}>

      {/* Corner web — top-right */}
      <svg className="corner-web" viewBox="0 0 110 110" preserveAspectRatio="xMaxYMin meet">
        <line className="w-spoke" x1="110" y1="0" x2="0"   y2="0"   style={{ animationDelay: '0.00s' }} />
        <line className="w-spoke" x1="110" y1="0" x2="0"   y2="28"  style={{ animationDelay: '0.07s' }} />
        <line className="w-spoke" x1="110" y1="0" x2="0"   y2="60"  style={{ animationDelay: '0.14s' }} />
        <line className="w-spoke" x1="110" y1="0" x2="22"  y2="110" style={{ animationDelay: '0.21s' }} />
        <line className="w-spoke" x1="110" y1="0" x2="60"  y2="110" style={{ animationDelay: '0.28s' }} />
        <line className="w-spoke" x1="110" y1="0" x2="110" y2="110" style={{ animationDelay: '0.35s' }} />
        <polyline className="w-ring" points="84,0 85,7 87,13 91,17 96,20 110,21"    style={{ animationDelay: '0.50s' }} />
        <polyline className="w-ring" points="58,0 60,14 64,27 71,36 83,42 110,44"  style={{ animationDelay: '0.68s' }} />
        <polyline className="w-ring" points="32,0 35,21 41,40 52,55 69,64 110,67"  style={{ animationDelay: '0.86s' }} />
        <polyline className="w-ring" points="6,0  10,28 18,54 32,72 55,85 110,88"  style={{ animationDelay: '1.04s' }} />
      </svg>

      {/* Spider drops on web thread */}
      <div className="spider-drop">
        <div className="web-thread" />
        <SpiderSVG />
      </div>

      {/* THWIP! */}
      <div className="thwip-bubble">THWIP!</div>

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
