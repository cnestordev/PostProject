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

const Comment = ({ comment, postId, user }) => {
  const [hasDeleted, setHasDeleted] = useState(false)

  const handleDelete = async id => {
    try {
      const response = await axiosCall.delete(`/posts/${postId}/comments/${id}`)
      console.log('successfully deleted')
      console.dir(response)
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
      <Box key={comment['_id']}>
        <Author>By {comment.author.username}</Author>
        <Timestamp>{timeago(comment.timestamp * 1000)}</Timestamp>
        <Body>{comment.body}</Body>
        <VotingComment comment={comment} postId={postId} user={user} />
        {user._id === comment.authorId && (
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
