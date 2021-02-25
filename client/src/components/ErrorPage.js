import React from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  IconHeader,
  SubHeader,
  Status,
  Message,
  Btn,
} from '../styles/errorPage'

const ErrorPage = ({ status, message }) => {
  return (
    <Container>
      <IconHeader>
        <i className="fas fa-exclamation-circle"></i>
      </IconHeader>
      <SubHeader>Something Went Wrong!</SubHeader>
      <Status>Error {status}</Status>
      <Message>{message}</Message>
      <Link to="/posts">
        <Btn>Go Back</Btn>
      </Link>
    </Container>
  )
}

export default ErrorPage
