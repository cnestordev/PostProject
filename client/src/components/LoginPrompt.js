import React from 'react'
import { useLocation } from 'react-router-dom'

import {
  Container,
  Header,
  PromptLinkContainer,
  PromptLink,
} from '../styles/loginPrompt'

const LoginPrompt = () => {
  const location = useLocation()

  return (
    <Container>
      <Header>You must be logged in to post a comment</Header>
      <PromptLinkContainer>
        <PromptLink
          to={{
            pathname: '/login',
            state: { from: { pathname: location.pathname } },
          }}
        >
          Login
        </PromptLink>
        <PromptLink
          to={{
            pathname: '/register',
            state: { from: { pathname: location.pathname } },
          }}
        >
          Register
        </PromptLink>
      </PromptLinkContainer>
    </Container>
  )
}

export default LoginPrompt
