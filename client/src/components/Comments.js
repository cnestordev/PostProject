import React from 'react'
import Comment from './Comment'

import { Container, Header } from '../styles/comments'

const Comments = ({ data, postId, dark, alertToggler }) => {
  // sorts, maps, and assgins keys to children components
  const commentArr = React.Children.toArray(
    data
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(comment => {
        return (
          <Comment
            alertToggler={alertToggler}
            dark={dark}
            postId={postId}
            comment={comment}
          />
        )
      })
  )
  return (
    <Container dark={dark}>
      <Header dark={dark}>Comments:</Header>
      {commentArr}
    </Container>
  )
}

export default Comments
