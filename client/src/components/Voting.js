import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'
import { connect } from 'react-redux'

import { Container, Icon, Paragraph } from '../styles/voting'

const Voting = ({ data, user }) => {
  const [metrics, setMetrics] = useState({
    likes: data.likes.length,
    dislikes: data.dislikes.length,
    liked: data.likes.includes(user._id),
    disliked: data.dislikes.includes(user._id),
  })

  const handleLike = async () => {
    try {
      const response = await axiosCall.post(`/posts/${data._id}/like`)
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }

  const handleDisike = async () => {
    try {
      const response = await axiosCall.post(`/posts/${data._id}/dislike`)
      // console.log(response.data.message)
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }
  return (
    <>
      <Container>
        <Paragraph onClick={handleLike} active={metrics.liked}>
          <Icon className="fas fa-chevron-up"></Icon>
          {metrics.likes}
        </Paragraph>
        <Paragraph onClick={handleDisike} active={metrics.disliked}>
          <Icon className="fas fa-chevron-down"></Icon> {metrics.dislikes}
        </Paragraph>
        <Paragraph>
          <Icon className="fas fa-comments"></Icon> {data.comments.length}
        </Paragraph>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Voting)
