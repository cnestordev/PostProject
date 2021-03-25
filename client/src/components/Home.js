import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axiosCall from '../api/axiosCall'

import Box from './Box'
import Contact from './Contact'
import Popup from './Popup'

import { view, account, engage, share, manage } from '../util/messages'

import { Section } from '../styles'

import {
  Container,
  Top,
  Bottom,
  Header,
  Icon,
  Subheader,
  P,
  Cta,
} from '../styles/home'

const Home = ({ dark }) => {
  // email provider error
  const [error, setError] = useState('')

  const location = useLocation()

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [5000])
    }
  }, [error])

  useEffect(async () => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1))
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }, [location])

  return (
    <Section>
      {error && <Popup message={error} />}
      <Container>
        <Top dark={dark}>
          <Header dark={dark}>Hello</Header>
          <Icon className="fas fa-smile" />
          <Subheader dark={dark}>Welcome to my app</Subheader>
          <P dark={dark}>Take a look at what it's about</P>
        </Top>
        <Bottom>
          <Box dark={dark} data={view} />
          <Box dark={dark} data={account} />
          <Box dark={dark} data={engage} />
          <Box dark={dark} data={share} />
          <Box dark={dark} data={manage} />
          <Contact toggler={setError} dark={dark} />
          <Cta dark={dark} to="/posts">
            Get Started
          </Cta>
        </Bottom>
      </Container>
    </Section>
  )
}

export default Home
