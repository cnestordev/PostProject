import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import contactSchema from '../validation/contactSchema'

import { Container, Header } from '../styles/box'
import { Form, Input, Textarea, Button, P } from '../styles/contact'
import loginSchema from '../validation/contactSchema'

const Contact = () => {
  const defaultFormValues = {
    name: '',
    email: '',
    body: '',
  }

  const [formData, setFormData] = useState(defaultFormValues)

  const defaultErrorValues = {
    name: '',
    email: '',
    body: '',
  }

  const [errors, setErrors] = useState(defaultErrorValues)

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    contactSchema.isValid(formData).then(valid => {
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

  return (
    <Container>
      <Form>
        <Header>Questions? Get in touch.</Header>
        <Input
          onChange={handleChange}
          value={formData.name}
          type="text"
          name="name"
          placeholder="name"
        />
        {errors.name && <P>{errors.name}</P>}
        <Input
          onChange={handleChange}
          value={formData.email}
          type="email"
          name="email"
          placeholder="email"
        />
        {errors.email && <P>{errors.email}</P>}
        <Textarea onChange={handleChange} value={formData.body} name="body" />
        {errors.body && <P>{errors.body}</P>}
        <Button disabled={disabled}>Send</Button>
      </Form>
    </Container>
  )
}

export default Contact
