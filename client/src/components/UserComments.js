import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import CommentMin from './CommentMin'
import Popup from './Popup'

import { Section } from '../styles'
import { Header } from '../styles/postMin'

const UserComments = ({ user, dark }) => {
  const [commentsData, setCommentsData] = useState([])

  // network errors
  const [error, setError] = useState('')

  useEffect(async () => {
    try {
      const response = await axiosCall.get(
        `/api/posts/null/comments/all/${user._id}`
      )
      setCommentsData(response.data.message)
    } catch (err) {
      setError(err.response.data.message)
    }
  }, [])

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [5000])
    }
  }, [error])

  // sorts, maps, and assigns keys to CommentMin components
  const commentsArr = React.Children.toArray(
    commentsData
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(comment => {
        return (
          <CommentMin
            alertToggler={setError}
            user={user}
            dark={dark}
            comment={comment}
          />
        )
      })
  )

  return (
    <Section>
      {error && <Popup message={error} />}
      <Header dark={dark}>{`${user.username}'s comment history`}</Header>
      <div>{commentsArr}</div>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(UserComments)
