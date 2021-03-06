import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import commentSchema from '../validation/CommentSchema'
import Comments from './Comments'
import LoginPrompt from './LoginPrompt'

import { Container, Form, TextArea, Button } from '../styles/postComment'

const PostComment = props => {
  const commentDataValues = {
    body: '',
    author: 'tbd',
    authorId: 'tbd',
    timestamp: '',
  }

  const [commentData, setCommentData] = useState(commentDataValues)

  const initialErrorValues = {
    body: '',
  }

  const [errors, setErrors] = useState(initialErrorValues)

  const [disabled, setDisabled] = useState(true)

  const [serverError, setServerError] = useState('')

  const [comments, setComments] = useState(props.postData.comments)

  useEffect(() => {
    commentSchema.isValid(commentData).then(valid => {
      setDisabled(!valid)
    })
  }, [commentData])

  const handleChange = e => {
    const { name, value } = e.target

    yup
      .reach(commentSchema, name)

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

    setCommentData({
      ...commentData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const id = props.postId
    try {
      const response = await axiosCall.post(
        `/posts/${id}/comments`,
        commentData
      )
      setCommentData(commentDataValues)
      setComments(response.data.data.comments)
    } catch (err) {
      setServerError(err.response.data.message)
    }
  }

  return (
    <>
      <Container>
        {Object.keys(props.user).length > 1 ? (
          <Form
            autoComplete="off"
            className="postCommentForm"
            onSubmit={handleSubmit}
          >
            <TextArea
              dark={props.dark}
              onChange={handleChange}
              name="body"
              value={commentData.body}
              placeholder={'post a comment'}
            />
            {serverError && (
              <p
                style={{
                  fontSize: '1.5rem',
                  color: 'red',
                  textAlign: 'center',
                }}
              >
                {serverError}
              </p>
            )}
            {errors.body && (
              <p
                style={{
                  fontSize: '1.5rem',
                  color: 'red',
                  textAlign: 'center',
                }}
              >
                {errors.body}
              </p>
            )}
            <Button dark={props.dark} disabled={disabled}>
              comment
            </Button>
          </Form>
        ) : (
          <LoginPrompt />
        )}
      </Container>
      <Comments dark={props.dark} postId={props.postId} data={comments} />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(PostComment)
