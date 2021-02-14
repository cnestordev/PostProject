import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import axiosCall from '../api/axiosCall'
import * as yup from 'yup'
import commentSchema from '../validation/CommentSchema'

const PostComment = props => {
  const history = useHistory()

  const [postData, setPostData] = useState({
    body: '',
    author: 'predetermined',
    authorId: 'predetermined',
    timestamp: '',
  })

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

  useEffect(() => {
    commentSchema.isValid(postData).then(valid => {
      setDisabled(!valid)
    })
  }, [postData])

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

    setPostData({
      ...postData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('making POST request to comments')
    const id = props.postId
    try {
      await axiosCall.post(`/posts/${id}/comments`, postData)
      console.log('success')
      //  .go() looks like it refreshes the page, might need to use a different
      // method so it doesn't refersh page
      history.push(`/posts/${id}`)
    } catch (err) {
      console.log('entering error on POST comments')
    }
  }

  return (
    <div className="postCommentContainer">
      <form className="postCommentForm" onSubmit={handleSubmit}>
        <textarea
          className="postCommentInput"
          onChange={handleChange}
          name="body"
          value={postData.body}
          placeholder={errors.body}
        />
        <button disabled={disabled} className="postCommentBtn">
          comment
        </button>
      </form>
    </div>
  )
}

export default PostComment
