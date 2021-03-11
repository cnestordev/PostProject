import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as yup from 'yup'
import formSchema from '../validation/FormSchema'

import Loader from 'react-loader-spinner'
import imageUploader from '../util/imageUploader'
import axiosCall from '../api/axiosCall'

import Popup from './Popup'

import {
  Container,
  Header,
  Form,
  InputText,
  TextArea,
  File,
  Button,
  ErrorContainer,
  ErrorMessage,
  ServerMessage,
} from '../styles/createPost'

import { Section } from '../styles'

const CreatePost = ({ dark }) => {
  const [data, setData] = useState({
    title: '',
    author: 'predefined',
    authorId: 'predefined',
    timestamp: '',
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

  const history = useHistory()

  const [imageData, setImageData] = useState(null)

  // used to trigger the useEffect after image uploaded to Cloudinary, the useEffect will complete the upload to MongoDB.
  const [querying, setQuerying] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  // network errors
  const [error, setError] = useState('')

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    if (data.title || data.tags.length > 0) {
      try {
        const response = await axiosCall.post('/api/posts/new', data)
        const { postId } = response.data
        setSending(false)
        history.push(`/posts/${postId}`)
      } catch (err) {
        setSending(false)
        setError(err.response.data.message)
        setDisabled(true)
      }
    }
  }, [querying])

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
    e.preventDefault()
    setSending(true)
    const img = await imageUploader(imageData, 'main')
    setData({
      ...data,
      image: img,
    })
    setQuerying(true)
    return
  }

  return (
    <Section>
      {error && <Popup message={error} />}
      <Container dark={dark}>
        <Header dark={dark}>Create Post</Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <InputText
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Title"
            value={data.title}
            dark={dark}
          />
          <TextArea
            dark={dark}
            onChange={handleChange}
            name="body"
            value={data.body}
          />
          <File
            type="file"
            name="image"
            onChange={handleImage}
            accept="image/x-png,image/gif,image/jpeg"
            dark={dark}
          />
          <InputText
            onChange={handleChange}
            type="text"
            placeholder="tags"
            name="tags"
            value={data.tags}
            dark={dark}
          />
          <Button dark={dark} disabled={disabled || sending}>
            {sending ? (
              <Loader
                type="ThreeDots"
                color="#777"
                height={11}
                width={100}
                timeout={5000} //5 secs
              />
            ) : (
              'Create'
            )}
          </Button>
        </Form>
        <ErrorContainer>
          {errors.title.length > 0 && (
            <ErrorMessage>{errors.title}</ErrorMessage>
          )}
          {errors.tags.length > 0 && <ErrorMessage>{errors.tags}</ErrorMessage>}
        </ErrorContainer>
      </Container>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(CreatePost)
