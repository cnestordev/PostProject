import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import loginSchema from '../validation/loginSchema'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/users.actions'
import { Link } from 'react-router-dom'

const Login = props => {
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
      history.push('/posts')
    } catch (err) {
      console.log('entering CATCH for LOGIN')
      console.log(err)
    }
  }

  return (
    <div className="loginContainer">
      <h1 className="loginHeader">Login User:</h1>
      <form autoComplete="off" className="loginForm" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
        />
        <button disabled={disabled}>Login</button>
      </form>
      <div className="validatinErrorsContainer">
        {errors.username.length > 0 && (
          <p className="validationErrorMessage">{errors.username}</p>
        )}
        {errors.password.length > 0 && (
          <p className="validationErrorMessage">{errors.password}</p>
        )}
      </div>
      <div>
        <div className="redirectContainer">
          <Link className="accountRedirect" to="/register">
            Create a account
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(Login)
