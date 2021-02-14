import React from 'react'
import timeago from 'epoch-timeago'
import axiosCall from '../api/axiosCall'

const Comment = ({ comment, postId }) => {
  const handleDelete = async id => {
    console.log(id)
    console.log(postId)
    try {
      const response = await axiosCall.delete(`/posts/${postId}/comments/${id}`)
      console.log('successfully deleted')
      console.log(response)
    } catch (err) {
      console.log('comment deleting error')
    }
  }

  return (
    <>
      <div className="commentBox" key={comment['_id']}>
        <h3 className="commentAuthor">{comment.author}</h3>
        {console.log('----------------: ', comment.timestamp)}
        <p className="commentTimestamp">{timeago(comment.timestamp * 1000)}</p>
        <p className="commentBody">{comment.body}</p>
        <div className="commentSocial">
          <p className="commentRating">
            <i className="far fa-thumbs-up"></i> {comment.likes.length}
          </p>
          <p className="commentRating">
            <i className="far fa-thumbs-down"></i> {comment.dislikes.length}
          </p>
        </div>
        <button onClick={() => handleDelete(comment['_id'])}>Delete</button>
      </div>
    </>
  )
}

export default Comment
