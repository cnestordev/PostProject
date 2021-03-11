import React, { useState } from 'react'
import timeago from 'epoch-timeago'
import VotingComment from './VotingComment'
import axiosCall from '../api/axiosCall'
import { connect } from 'react-redux'

import {
  Box,
  Author,
  Timestamp,
  Body,
  DeleteLink,
  DeleteCommentContainer,
  Icon,
} from '../styles/comment'

const Comment = ({ comment, postId, user, dark, alertToggler }) => {
  // removes comment from DOM once deleted
  const [hasDeleted, setHasDeleted] = useState(false)

  // toggles the confirmation message
  const [toDelete, setToDelete] = useState(false)

  const handleDelete = async id => {
    try {
      await axiosCall.delete(`/api/posts/${postId}/comments/${id}`)
      setHasDeleted(true)
    } catch (err) {
      alertToggler(err.response.data.message)
    }
  }

  const toggleDelete = val => {
    setToDelete(val)
  }

  if (hasDeleted) {
    return <></>
  }

  return (
    <>
      <Box dark={dark} key={comment['_id']}>
        <Author dark={dark}>By {comment.author.username}</Author>
        <Timestamp dark={dark}>{timeago(comment.timestamp * 1000)}</Timestamp>
        <Body dark={dark}>{comment.body}</Body>
        <VotingComment
          dark={dark}
          comment={comment}
          postId={postId}
          user={user}
          alertToggler={alertToggler}
        />
        {(user._id === comment.authorId || user.isAdmin) && (
          <DeleteCommentContainer>
            {!toDelete ? (
              <DeleteLink onClick={() => toggleDelete(true)}>
                <Icon className="fas fa-ellipsis-h"></Icon>
              </DeleteLink>
            ) : (
              <>
                <DeleteLink onClick={() => handleDelete(comment['_id'])}>
                  Delete
                </DeleteLink>
                <DeleteLink
                  theme={'normal'}
                  onClick={() => toggleDelete(false)}
                >
                  Cancel
                </DeleteLink>
              </>
            )}
          </DeleteCommentContainer>
        )}
      </Box>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, null)(Comment)
