import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'
import axios from 'axios'

const Register = () => {
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
      const response = await axiosCall.post('/register', formData)
      console.log('successful try for REGISTER')
      console.log(response.data)
    } catch (err) {
      console.log('entering CATCH for REGISTER')
      console.log(err.response.data.message)
    }
  }

  return (
    <div>
      <h1>Reigster User:</h1>
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
        <button>Register</button>
      </form>
    </div>
  )
}

export default Register
