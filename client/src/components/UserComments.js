import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import CommentMin from './CommentMin'

import { Section } from '../styles'
import { Header } from '../styles/postMin'

const UserComments = ({ user, dark }) => {
  const [commentsData, setCommentsData] = useState([])

  useEffect(async () => {
    try {
      const response = await axiosCall.get(
        `/posts/null/comments/all/${user._id}`
      )
      setCommentsData(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }, [])

  const commentsArr = React.Children.toArray(
    commentsData
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(comment => {
        return <CommentMin user={user} dark={dark} comment={comment} />
      })
  )

  if (commentsData.length === 0) {
    return (
      <Section>
        <h2>You haven't posted any comments.</h2>
      </Section>
    )
  }

  return (
    <Section>
      <Header dark={dark}>{`${user.username}'s comment history`}</Header>
      <div>{commentsArr}</div>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(UserComments)
