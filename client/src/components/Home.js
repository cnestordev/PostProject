import axios from 'axios'
import React, { useState, useEffect } from 'react'
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
} from '../styles/home'

const Home = ({ dark }) => {
  // email provider error
  const [error, setError] = useState('')

  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [5000])
    }
  }, [error])

  useEffect(async () => {
    try {
      const res = await axiosCall.get('/api/', {
        withCredentials: true,
      })
    } catch (err) {
      console.log('hit ERROR on Home component')
      console.dir(err)
    }
  }, [])

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
        </Bottom>
      </Container>
    </Section>
  )
}

export default Home
