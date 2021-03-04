import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import ImageEdit from './ImageEdit'

import { Section } from '../styles'

const EditPost = ({ user, match, dark }) => {
  const id = match.params.id

  const defaultErrorValues = {
    hasError: false,
    message: '',
    status: '',
  }

  const [data, setData] = useState({
    title: '',
    author: '',
    authorId: '',
    _id: '',
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

  const [imageData, setImageData] = useState(null)

  // const [loading, setLoading] = useState(false)

  const [sending, setSending] = useState(false)

  const [disabled, setDisabled] = useState(true)

  const [edited, setHasEdited] = useState(false)

  const [serverError, setServerError] = useState(defaultErrorValues)

  const history = useHistory()

  useEffect(async () => {
    try {
      const response = await axiosCall.get(`/posts/${id}/edit`)
      // console.log(response.data.data)
      const { data } = response.data
      setData({
        title: data.title,
        timestamp: data.timestamp,
        tags: data.tags,
        image: data.image,
        body: data.body,
        author: data.author,
        authorId: data.authorId,
        _id: data['_id'],
        editCount: data.editCount,
      })
    } catch (err) {
      console.log('ENTERING CATCH, failure to populate edit form')
      console.dir(err.response.data.message)
      setServerError({
        hasError: true,
        message: err.response.data.message,
        status: err.response.data.status,
      })
    }
  }, [])

  useEffect(() => {
    formSchema.isValid(data).then(valid => {
      setDisabled(!valid)
    })
  }, [data])

  useEffect(async () => {
    if (data.title || data.tags.length > 0) {
      try {
        const response = await axiosCall.put(`/posts/${id}/edit`, data)
        setSending(false)
        history.push(`/posts/${id}`)
      } catch (err) {
        console.log('EDIT POST ERROR')
        console.dir(err)
        setSending(false)
        setServerError({
          hasError: true,
          message: err.response.data.message,
          status: err.response.data.status,
        })
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
    e.preventDefault()
    setSending(true)
    let img = await imageUploader(imageData, 'main')
    img = Object.keys(img).length ? img : data.image
    setData({
      ...data,
      image: img,
      editCount: data.editCount + 1,
    })
    setHasEdited(true)
    return
  }

  return (
    <Section>
      <Container dark={dark}>
        <Header dark={dark}>Edit Form</Header>
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
          <ImageEdit
            dark={dark}
            handler={handleImage}
            postId={data._id}
            image={data.image}
            setData={setData}
            data={data}
          />
          <InputText
            dark={dark}
            onChange={handleChange}
            type="text"
            placeholder="tags"
            name="tags"
            value={data.tags}
          />
          <Button dark={dark} disabled={disabled || sending}>
            {sending ? (
              <Loader type="ThreeDots" color="c3c3c3" height={11} width={100} />
            ) : (
              'Update'
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

export default connect(mapStateToProps, null)(EditPost)
