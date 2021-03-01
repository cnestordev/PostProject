import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import * as yup from 'yup'
import formSchema from '../validation/FormSchema'

import Loader from 'react-loader-spinner'
import imageUploader from '../util/imageUploader'
import axiosCall from '../api/axiosCall'

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

const CreatePost = ({ user, dark }) => {
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

  const defaultErrorValues = {
    hasError: false,
    message: '',
    status: '',
  }

  const history = useHistory()

  const [imageData, setImageData] = useState(null)

  const [querying, setQuerying] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  const [serverError, setServerError] = useState(defaultErrorValues)

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    if (data.title || data.tags.length > 0) {
      // console.log('sending post to server, data sending:')
      // console.log(data)
      try {
        // console.log('entering try')
        const response = await axiosCall.post('/posts/new', data)
        // console.log(response)
        const { postId } = response.data
        setSending(false)
        history.push(`/posts/${postId}`)
      } catch (err) {
        console.log('ERROR, entering catch')
        console.log(err.response.data.message)
        setSending(false)
        setServerError({
          hasError: true,
          message: err.response.data.message,
          status: err.response.data.status,
        })
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
    // console.log('creating NEW post...')
    e.preventDefault()
    setServerError(defaultErrorValues)
    setSending(true)
    // console.log('starting upload image function')
    const img = await imageUploader(imageData, 'main')
    // console.log('image function has been returned, url is: ', img)
    setData({
      ...data,
      image: img,
    })
    setQuerying(true)
    return
  }

  return (
    <Container dark={dark}>
      <Header dark={dark}>Create Post</Header>
      {serverError.hasError && (
        <ServerMessage>{serverError.message}</ServerMessage>
      )}
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
              color="#c3c3c3"
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
        {errors.title.length > 0 && <ErrorMessage>{errors.title}</ErrorMessage>}
        {errors.tags.length > 0 && <ErrorMessage>{errors.tags}</ErrorMessage>}
      </ErrorContainer>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(CreatePost)
