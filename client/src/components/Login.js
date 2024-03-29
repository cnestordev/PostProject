import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import loginSchema from '../validation/loginSchema'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/users.actions'
import { popup_timer } from '../util/shared'

import Popup from './Popup'

import {
  Container,
  Header,
  Form,
  Input,
  Button,
  RedirectContainer,
  RedirectLink,
  ServerError,
  ErrorContainer,
  ValidationError,
} from '../styles/login'

import { Section } from '../styles'

const Login = props => {
  // Find the previous page user visited, or default to /posts
  const prevPage = props.location.state
    ? props.location.state.from.pathname
    : '/posts'
  const history = useHistory()

  const initialValues = {
    username: '',
    password: '',
  }

  const defaultErrorValues = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialValues)

  const [errors, setErrors] = useState(defaultErrorValues)

  const [disabled, setDisabled] = useState(true)

  // network errors
  const [error, setError] = useState('')

  // Yup validation
  useEffect(() => {
    loginSchema.isValid(formData).then(valid => {
      setDisabled(!valid)
    })
  }, [formData])

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [popup_timer])
    }
  }, [error])

  const handleChange = e => {
    const { name, value } = e.target

    yup
      .reach(loginSchema, name)

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
      const response = await axiosCall.post('/api/login', formData)
      props.logInUser(response.data)
      history.push(prevPage)
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <Section>
      {error && <Popup message={error} />}
      <Container dark={props.dark}>
        <Header dark={props.dark}>Login User:</Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Input
            dark={props.dark}
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <Input
            dark={props.dark}
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <Button dark={props.dark} disabled={disabled}>
            Login
          </Button>
        </Form>
        <ErrorContainer className="validationErrorsContainer">
          {errors.username.length > 0 && (
            <ValidationError>{errors.username}</ValidationError>
          )}
          {errors.password.length > 0 && (
            <ValidationError>{errors.password}</ValidationError>
          )}
        </ErrorContainer>
        <div>
          <RedirectContainer>
            <RedirectLink
              dark={props.dark}
              className="accountRedirect"
              to="/register"
            >
              Don't have an account? Register here
            </RedirectLink>
          </RedirectContainer>
        </div>
      </Container>
    </Section>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(Login)
