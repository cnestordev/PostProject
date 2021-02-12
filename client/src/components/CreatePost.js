import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import formSchema from '../validation/FormSchema'

import Loader from 'react-loader-spinner'
import imageUploader from '../util/imageUploader'

const CreatePost = () => {
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

  const history = useHistory()

  const [imageData, setImageData] = useState(null)

  const [loading, setLoading] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    try {
      console.log('entering try')
      const response = await axios.post('http://localhost:3001/posts/new', data)
      console.log(response)
      setSending(false)
      history.push('/posts')
    } catch (err) {
      console.log('ERROR, entering catch')
      console.dir(err)
    }
  }, [data.image])

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
    console.log('creating NEW post...')
    e.preventDefault()
    setSending(true)
    console.log('starting upload image function')
    const img = await imageUploader(imageData)
    console.log('image function has been returned, url is: ', img)
    setData({
      ...data,
      image: img,
    })
    return
  }

  return (
    <div className="createFormContainer">
      <h1 className="createHeader">Create Post</h1>
      <form className="createFormElement" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          className="createInputText"
        />
        <textarea
          className="createTextarea"
          onChange={handleChange}
          name="body"
        />
        <input
          className="createFile"
          type="file"
          name="image"
          onChange={handleImage}
          accept="image/x-png,image/gif,image/jpeg"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="tags"
          name="tags"
          className="createFile"
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
            'Create'
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
    </div>
  )
}

export default CreatePost
