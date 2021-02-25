import React from 'react'
import Comment from './Comment'

import { Container, Header } from '../styles/comments'

const Comments = ({ data, postId }) => {
  const commentArr = React.Children.toArray(
    data
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(comment => {
        return <Comment postId={postId} comment={comment} />
      })
  )
  return (
    <Container>
      <Header>Comments:</Header>
      {commentArr}
    </Container>
  )
}

export default Comments
