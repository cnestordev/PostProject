import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'

import { IconContainer, Icon, P } from '../styles/postMin'
import { Container, Body } from '../styles/commentMin'

const CommentMin = ({ user, comment, dark }) => {
  const [toggleDelete, setToggleDelete] = useState(false)
  const [hasDeleted, setHasDeleted] = useState(false)

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) : str
  }

  const handleDelete = async id => {
    try {
      const response = await axiosCall.delete(
        `/posts/${comment.originated}/comments/${id}`
      )
      // console.log('successfully deleted')
      // console.dir(response)
      setHasDeleted(true)
    } catch (err) {
      console.log('comment deleting error')
      console.dir(err)
    }
  }

  if (hasDeleted) {
    return <></>
  }

  return (
    <Container dark={dark}>
      <Body dark={dark}>{truncate(comment.body, 650)}</Body>
      <IconContainer>
        <P dark={dark}>
          <Icon dark={dark} className="fas fa-sort-up"></Icon>{' '}
          {comment.likes.length}
        </P>
        <P dark={dark}>
          <Icon dark={dark} className="fas fa-sort-down"></Icon>{' '}
          {comment.dislikes.length}
        </P>
        <P
          onClick={() =>
            !toggleDelete ? setToggleDelete(true) : handleDelete(comment._id)
          }
          dark={dark}
          pointer={true}
        >
          <Icon dark={dark} className="fas fa-trash"></Icon>
          {!toggleDelete ? 'Delete' : 'Confirm'}
        </P>
      </IconContainer>
    </Container>
  )
}

export default CommentMin
