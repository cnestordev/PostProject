import React, { useState } from 'react'
import timeago from 'epoch-timeago'
import VotingComment from './VotingComment'
import axiosCall from '../api/axiosCall'
import { connect } from 'react-redux'

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
      <div className="commentBox" key={comment['_id']}>
        <h3 className="commentAuthor">By {comment.author.username}</h3>
        <p className="commentTimestamp">{timeago(comment.timestamp * 1000)}</p>
        <p className="commentBody">{comment.body}</p>
        <VotingComment comment={comment} postId={postId} user={user} />
        {user._id === comment.authorId && (
          <div className="deleteCommentContainer">
            <p
              className="deleteCommentLink"
              onClick={() => handleDelete(comment['_id'])}
            >
              Delete
            </p>
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, null)(Comment)
