import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import formSchema from '../validation/FormSchema'

import Loader from 'react-loader-spinner'

const EditPost = props => {
  const id = props.match.params.id

  const [data, setData] = useState({
    title: '',
    author: 'predefined',
    authorId: 'predefined',
    timestamp: Math.round(new Date().getTime() / 1000),
    body: '',
    image: '',
    tags: [],
    likes: [],
    dislikes: [],
    comments: [],
  })

  const [errors, setErrors] = useState({
    title: '',
    tags: '',
  })

  const [loading, setLoading] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  const history = useHistory()

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    const response = await axios.get(`http://localhost:3001/posts/${id}/edit`)
    console.log(response.data.data)
    const { data } = response.data
    setData({
      title: data.title,
      timestamp: data.timestamp,
      tags: data.tags,
      image: data.image,
      body: data.body,
      authorId: 'predetermined',
      _id: data['_id'],
    })
  }, [])

  const handleChange = e => {
    const { name, value } = e.target

    yup
      .reach(formSchema, name)

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

    setData({
      ...data,
      [name]: value,
    })
  }

  const handleImage = async e => {
    e.preventDefault()
    setLoading(true)
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
    try {
      const res = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        formData
      )
      setData({
        ...data,
        image: res.data.secure_url,
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async e => {
    console.log('EDITING...')
    e.preventDefault()
    try {
      console.log('edit try')
      const response = await axios.put(
        `http://localhost:3001/posts/${id}/edit`,
        data
      )
      history.push(`/posts/${id}`)
    } catch (err) {
      console.log('EDIT POST ERROR')
      console.log(err)
    }
  }

  const handleDelete = async id => {
    console.log(id)
    const response = await axios.delete(
      `http://localhost:3001/posts/${id}/delete`
    )
    console.log(response)
  }

  return (
    <div className="editFormContainer">
      <h1 className="editHeader">Edit Form</h1>
      <form className="editFormElement" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          className="editInputText"
        />
        <textarea
          className="editTextarea"
          onChange={handleChange}
          name="body"
          value={data.body}
        />
        <input
          className="editFile"
          type="file"
          name="image"
          onChange={handleImage}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="tags"
          name="tags"
          value={data.tags}
          className="editInputText"
        />
        <button className="createPostBtn" disabled={disabled}>
          {sending ? (
            <Loader
              type="ThreeDots"
              color="c3c3c3"
              height={11}
              width={100}
              timeout={5000} //3 secs
            />
          ) : (
            'Update'
          )}
        </button>
      </form>
      <div className="validatinErrorsContainer">
        {errors.title.length > 0 && (
          <p className="validationErrorMessage">{errors.title}</p>
        )}
        {errors.tags.length > 0 && (
          <p className="validationErrorMessage">{errors.tags}</p>
        )}
      </div>
      <button onClick={() => handleDelete(data['_id'])}>DELETE</button>
    </div>
  )
}

export default EditPost
