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
} from '../styles/comment'

const Comment = ({ comment, postId, user, dark }) => {
  const [hasDeleted, setHasDeleted] = useState(false)

  const handleDelete = async id => {
    try {
      const response = await axiosCall.delete(`/posts/${postId}/comments/${id}`)
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
        />
        {(user._id === comment.authorId || user.isAdmin) && (
          <DeleteCommentContainer>
            <DeleteLink onClick={() => handleDelete(comment['_id'])}>
              Delete
            </DeleteLink>
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
