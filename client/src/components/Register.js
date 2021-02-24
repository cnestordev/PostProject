import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import registerSchema from '../validation/registerSchema'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../redux/actions/users.actions'
import { Link } from 'react-router-dom'

const Register = props => {
  const history = useHistory()

  const prevPage = props.location.state
    ? props.location.state.from.pathname
    : '/posts'
  console.log(prevPage)
  console.log(props)

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
    registerSchema.isValid(formData).then(valid => {
      setDisabled(!valid)
    })
  }, [formData])

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
      const response = await axiosCall.post('/register', formData)
      console.log('successful try for REGISTER')
      console.log(response.data.userData)
      props.logInUser(response.data.userData)
      history.push(prevPage)
    } catch (err) {
      console.log('entering CATCH for REGISTER')
      console.log(err.response.data.message)
      setServerError(err.response.data.message)
    }
  }

  return (
    <div className="registerContainer">
      <h1 className="registerHeader">Reigster User:</h1>
      {serverError.length > 0 && (
        <p className="serverErrorMessage">{serverError}</p>
      )}
      <form autoComplete="off" className="registerForm" onSubmit={handleSubmit}>
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
        <button disabled={disabled}>Register</button>
      </form>
      <div className="validatinErrorsContainer">
        {errors.username.length > 0 && (
          <p className="validationErrorMessage">{errors.username}</p>
        )}
        {errors.password.length > 0 && (
          <p className="validationErrorMessage">{errors.password}</p>
        )}
      </div>
      <div className="redirectContainer">
        <Link className="accountRedirect" to="/login">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(Register)
