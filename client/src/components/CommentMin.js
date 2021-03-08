import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosCall from '../api/axiosCall'

import { IconContainer, Icon, P } from '../styles/postMin'
import { Container, Body, PostLink } from '../styles/commentMin'

const CommentMin = ({ user, comment, dark, alertToggler }) => {
  // toggles the confirmation message
  const [toggleDelete, setToggleDelete] = useState(false)
  // if successfully deleted, this removes comment from DOM
  const [hasDeleted, setHasDeleted] = useState(false)

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) : str
  }

  const handleDelete = async id => {
    try {
      await axiosCall.delete(`/posts/${comment.originated}/comments/${id}`)
      setHasDeleted(true)
    } catch (err) {
      alertToggler(err.response.data.message)
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
        <PostLink
          to={`/posts/${comment.originated}`}
          pointer={true}
          dark={dark}
        >
          <Icon dark={dark} className="fas fa-external-link-square-alt"></Icon>{' '}
          Post
        </PostLink>
      </IconContainer>
    </Container>
  )
}

export default CommentMin
