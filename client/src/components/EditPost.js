import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import formSchema from '../validation/FormSchema'

import Loader from 'react-loader-spinner'
import imageUploader from '../util/imageUploader'

const EditPost = props => {
  const id = props.match.params.id

  const [data, setData] = useState({
    title: '',
    author: 'predefined',
    authorId: 'predefined',
    timestamp: Math.round(new Date().getTime() / 1000),
    body: '',
    image: '',
    tags: '',
    likes: [],
    dislikes: [],
    comments: [],
  })

  const [errors, setErrors] = useState({
    title: '',
    tags: '',
  })

  const [imageData, setImageData] = useState(null)

  const [loading, setLoading] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  const [edited, setHasEdited] = useState(false)

  const history = useHistory()

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
      author: 'predetermined',
      authorId: 'predetermined',
      _id: data['_id'],
      editCount: data.editCount,
    })
  }, [])

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    if (data.title || data.tags.length > 0) {
      try {
        console.log('edit try')
        const response = await axios.put(
          `http://localhost:3001/posts/${id}/edit`,
          data
        )
        setSending(false)
        history.push(`/posts/${id}`)
      } catch (err) {
        console.log('EDIT POST ERROR')
        console.dir(err)
      }
    }
  }, [edited])

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
    const image = e.target.files[0]
    setImageData(image)
  }

  const handleSubmit = async e => {
    console.log('EDITING...')
    e.preventDefault()
    setSending(true)
    const img = (await imageUploader(imageData)) || data.image
    setData({
      ...data,
      image: img,
      editCount: data.editCount + 1,
    })
    setHasEdited(true)
    return
  }

  const handleDelete = async id => {
    console.log(id)
    const response = await axios.delete(
      `http://localhost:3001/posts/${id}/delete`
    )
    console.log(response)
    history.push('/posts')
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
        <button className="createPostBtn" disabled={disabled || sending}>
          {sending ? (
            <Loader type="ThreeDots" color="c3c3c3" height={11} width={100} />
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
