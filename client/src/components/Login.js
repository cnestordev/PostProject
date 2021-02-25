import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import loginSchema from '../validation/loginSchema'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/users.actions'
import { Link } from 'react-router-dom'

import {
  Container,
  Header,
  Form,
  Input,
  Button,
  RedirectContainer,
  RedirectLink,
} from '../styles/login'

const Login = props => {
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

  const [serverError, setServerError] = useState('')

  useEffect(() => {
    loginSchema.isValid(formData).then(valid => {
      setDisabled(!valid)
    })
  }, [formData])

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
      console.log('entering TRY for LOGIN')
      const response = await axiosCall.post('/login', formData)
      console.log('successfully logged in')
      console.log(response.data)
      props.logInUser(response.data)
      history.push(prevPage)
    } catch (err) {
      console.log('entering CATCH for LOGIN')
      console.dir(err)
      console.dir(err.response.data.message)
      setServerError(err.response.data.message)
    }
  }

  return (
    <Container>
      <Header>Login User:</Header>
      {serverError.length > 0 && (
        <p className="serverErrorMessage">{serverError}</p>
      )}
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button disabled={disabled}>Login</Button>
      </Form>
      <div className="validationErrorsContainer">
        {errors.username.length > 0 && (
          <p className="validationErrorMessage">{errors.username}</p>
        )}
        {errors.password.length > 0 && (
          <p className="validationErrorMessage">{errors.password}</p>
        )}
      </div>
      <div>
        <RedirectContainer>
          <RedirectLink className="accountRedirect" to="/register">
            Create a account
          </RedirectLink>
        </RedirectContainer>
      </div>
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(Login)
