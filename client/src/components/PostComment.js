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
  const history = useHistory()

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

  const errorData = {
    hasError: false,
    message: '',
    status: '',
  }

  const [errors, setErrors] = useState(initialErrorValues)

  const [disabled, setDisabled] = useState(true)

  const [serverError, setServerError] = useState(errorData)

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
    // console.log('making POST request to comments')
    const id = props.postId
    try {
      const response = await axiosCall.post(
        `/posts/${id}/comments`,
        commentData
      )
      // console.log('success')
      setCommentData(commentDataValues)
      // console.log(response.data)
      setComments(response.data.data.comments)
    } catch (err) {
      console.log('entering error on POST comments')
    }
  }

  return (
    <>
      <Container>
        {Object.keys(props.user).length > 0 ? (
          <Form
            autoComplete="off"
            className="postCommentForm"
            onSubmit={handleSubmit}
          >
            <TextArea
              dark={props.user.darkMode}
              onChange={handleChange}
              name="body"
              value={commentData.body}
              placeholder={errors.body}
            />
            <Button dark={props.user.darkMode} disabled={disabled}>
              comment
            </Button>
          </Form>
        ) : (
          <LoginPrompt />
        )}
      </Container>
      <Comments
        dark={props.user.darkMode}
        postId={props.postId}
        data={comments}
      />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(PostComment)
