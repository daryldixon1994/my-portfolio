import { useEffect, useState } from 'react'
import Loader from 'react-loaders'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'
import AnimatedLetters from '../AnimatedLetters'
import './index.scss'

const Contact = () => {
  const [letterClass, setLetterClass] = useState('text-animate')
  const [sender, setSender] = useState('')
  const [senderSubject, setSubject] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [messageClient, setMessageClient] = useState('')
  const form = useRef()
  useEffect(() => {
    return setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 3000)
  }, [])

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .send(
        'service_rwefvf5',
        'template_jz7vn4c',
        {
          from_name: sender,
          from_email: senderEmail,
          subject: senderSubject,
          message: messageClient,
        },
        'user_Q9dsjS0ROjStsxsZRWjzj'
      )
      .then(
        () => {
          alert('Message successfully sent!')
          window.location.reload(false)
        },
        () => {
          alert('Failed to send the message, please try again')
        }
      )
      .catch((err) => console.dir(err))
  }

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
              idx={15}
            />
          </h1>
          <p>
            I am interested in freelance opportunities - especially ambitious or
            large projects. However, if you have other request or question,
            don't hesitate to contact me using below form either.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input
                    placeholder="Name"
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setSender(e.target.value)
                    }}
                    required
                  />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="from_name"
                    onChange={(e) => setSenderEmail(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    onChange={(e) => {
                      setSubject(e.target.value)
                    }}
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    onChange={(e) => {
                      setMessageClient(e.target.value)
                    }}
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
        <div className="info-map">
          Mohamed Anwar Jabri,
          <br />
          Tunisia,
          <br />
          Béja North, 9000 <br />
          <br />
          <span>kmohamedanouar@gmail.com</span>
        </div>
        <div className="map-wrap">
          <MapContainer center={[36.733, 9.1844]} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[36.7333, 9.1844]}>
              <Popup>Sloba lives here, come over for a cup of coffee :</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <Loader type="pacman" />
    </>
  )
}

export default Contact
