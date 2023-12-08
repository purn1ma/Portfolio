import React, { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import emailjs from '@emailjs/browser'

import './index.scss'
import AnimatedLetters from '../AnimatedLetters'
import { Backdrop, CircularProgress } from '@mui/material'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [open, setOpen] = React.useState(false)

  const refForm = useRef()
  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()
    setOpen(true)

    emailjs
      .sendForm(
        'solitude_of_barnacle',
        'portfolio',
        refForm.current,
        'wHWSZM8RlMlQIg_xu'
      )
      .then(
        () => {
          alert('Message Successfully sent!')
          window.location.reload(false)
          setOpen(false)
        },
        (e) => {
          setOpen(false)
          console.log(e)
          alert('Failed to send the message, please try again!')
        }
      )
  }
  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              strArray={("Contact me!").split("")}
              idx={15}
              letterClass={letterClass}
            />
          </h1>
          <p>
            Thanks for stopping by! If you have a question, comment, or just
            want to say hi, then drop me a line. I'm always excited to chat
            about technology and the amazing things we can create with it.
          </p>
          <div className="contact-form">
            <form onSubmit={sendEmail} ref={refForm}>
              <ul>
                <li className="half">
                  <input type="text" name="name" placeholder="Name" required />
                </li>
                <li className="half">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                  />
                </li>
                <li>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <Loader type="pacman" />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {/* <Loader type="pacman" /> */}
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default Contact
