import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import commentSchema from '../validation/CommentSchema'
import Comments from './Comments'

const PostComment = props => {
  const history = useHistory()

  const commentDataValues = {
    body: '',
    author: 'predetermined',
    authorId: 'predetermined',
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
    console.log('making POST request to comments')
    const id = props.postId
    try {
      const response = await axiosCall.post(
        `/posts/${id}/comments`,
        commentData
      )
      console.log('success')
      setCommentData(commentDataValues)
      setComments(response.data.data.comments)
    } catch (err) {
      console.log('entering error on POST comments')
    }
  }

  return (
    <>
      <div className="postCommentContainer">
        <form className="postCommentForm" onSubmit={handleSubmit}>
          <textarea
            className="postCommentInput"
            onChange={handleChange}
            name="body"
            value={commentData.body}
            placeholder={errors.body}
          />
          <button disabled={disabled} className="postCommentBtn">
            comment
          </button>
        </form>
      </div>
      <Comments postId={props.postId} data={comments} />
    </>
  )
}

export default PostComment
