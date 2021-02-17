import React, { useState } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import axios from 'axios'

const Login = () => {
  const initialValues = {
    username: '',
    password: '',
  }

  const [formData, setFormData] = useState(initialValues)

  const handleChange = e => {
    const { name, value } = e.target
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
      console.log('successfully logged')
      console.log(response.data)
    } catch (err) {
      console.log('entering CATCH for LOGIN')
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Login User:</h1>
      <form onSubmit={handleSubmit}>
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
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
