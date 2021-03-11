import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import registerSchema from '../validation/registerSchema'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/users.actions'

import {
  Container,
  Header,
  Form,
  Input,
  Button,
  RedirectContainer,
  RedirectLink,
  ErrorContainer,
  ServerError,
  ValidationError,
} from '../styles/login'

import { Section } from '../styles'
import Popup from './Popup'

const Register = props => {
  const history = useHistory()

  // finds user's last page location, otherwise defaults to /posts
  const prevPage = props.location.state
    ? props.location.state.from.pathname
    : '/posts'

  const initialValues = {
    username: '',
    password: '',
    email: '',
  }

  const defaultErrorValues = {
    username: '',
    password: '',
    email: '',
  }

  const [formData, setFormData] = useState(initialValues)

  const [errors, setErrors] = useState(defaultErrorValues)

  const [disabled, setDisabled] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {
    registerSchema.isValid(formData).then(valid => {
      setDisabled(!valid)
    })
  }, [formData])

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [5000])
    }
  }, [error])

  const handleChange = e => {
    const { name, value } = e.target

    yup
      .reach(registerSchema, name)

      .validate(value)

      .then(valid => {
        setErrors({
          ...errors,
          [name]: '',
        })
      })

      .catch(err => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        })
      })

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await axiosCall.post('/api/register', formData)
      await props.logInUser(response.data.userData)
      history.push(prevPage)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <Section>
      {error && <Popup message={error} />}
      <Container>
        <Header>Reigster User:</Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            placeholder="username*"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="password*"
            onChange={handleChange}
          />
          <p style={{ fontSize: '1.4rem' }}>* required field</p>
          <p style={{ fontSize: '1.2rem' }}>
            By entering your email, you agree to receive a confirmation email.
          </p>
          <Button registerBtn={true} disabled={disabled}>
            Register
          </Button>
        </Form>
        <ErrorContainer>
          {errors.username.length > 0 && (
            <ValidationError>{errors.username}</ValidationError>
          )}
          {errors.password.length > 0 && (
            <ValidationError>{errors.password}</ValidationError>
          )}
          {errors.email.length > 0 && (
            <ValidationError>{errors.email}</ValidationError>
          )}
        </ErrorContainer>
        <RedirectContainer>
          <RedirectLink className="accountRedirect" to="/login">
            Already have an account? Log in
          </RedirectLink>
        </RedirectContainer>
      </Container>
    </Section>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(Register)
