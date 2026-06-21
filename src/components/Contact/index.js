import React, { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Backdrop, CircularProgress } from '@mui/material'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const STARS = [
  { left: '8%',  top: '12%', animationDelay: '0.0s', width: '3px', height: '3px' },
  { left: '88%', top: '18%', animationDelay: '0.4s', width: '4px', height: '4px' },
  { left: '22%', top: '72%', animationDelay: '0.7s', width: '2px', height: '2px' },
  { left: '72%', top: '62%', animationDelay: '0.2s', width: '3px', height: '3px' },
  { left: '50%', top: '8%',  animationDelay: '0.6s', width: '2px', height: '2px' },
  { left: '12%', top: '48%', animationDelay: '1.0s', width: '4px', height: '4px' },
  { left: '92%', top: '78%', animationDelay: '0.3s', width: '2px', height: '2px' },
  { left: '38%', top: '88%', animationDelay: '0.9s', width: '3px', height: '3px' },
  { left: '62%', top: '32%', animationDelay: '0.5s', width: '4px', height: '4px' },
  { left: '4%',  top: '65%', animationDelay: '0.8s', width: '2px', height: '2px' },
  { left: '78%', top: '92%', animationDelay: '0.1s', width: '3px', height: '3px' },
  { left: '32%', top: '22%', animationDelay: '1.1s', width: '2px', height: '2px' },
  { left: '55%', top: '55%', animationDelay: '0.35s', width: '3px', height: '3px' },
  { left: '18%', top: '30%', animationDelay: '0.75s', width: '2px', height: '2px' },
  { left: '96%', top: '45%', animationDelay: '0.55s', width: '4px', height: '4px' },
]

const SuccessScreen = ({ onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 4200)
    return () => clearTimeout(t)
  }, [onClose])

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-stars">
        {STARS.map((s, i) => (
          <span key={i} className="success-star" style={s} />
        ))}
      </div>

      <div className="success-content">
        <div className="rocket-scene">
          <div className="rocket-emoji">🚀</div>
          <div className="rocket-trail">
            <span /><span /><span /><span />
          </div>
        </div>

        <p className="success-code">
          <span className="code-prompt">&gt;</span> message.send()
        </p>
        <h2 className="success-heading">Delivered!</h2>
        <p className="success-sub">I'll get back to you soon.</p>
        <p className="success-dismiss">tap anywhere to close</p>
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
    const timer = setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
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
            <a
              href="https://www.linkedin.com/in/purnima-shrivastava/"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
              <div className="item-icon"><FontAwesomeIcon icon={faLinkedin} /></div>
              <div className="item-text">
                <span className="item-label">LinkedIn</span>
                <span className="item-value">purnima-shrivastava</span>
              </div>
            </a>
            <a
              href="https://github.com/purn1ma"
              target="_blank"
              rel="noreferrer"
              className="contact-item"
            >
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

      <Backdrop
        sx={{ color: 'var(--accent)', zIndex: 1400 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {sent && <SuccessScreen onClose={() => setSent(false)} />}
    </>
  )
}

export default Contact
