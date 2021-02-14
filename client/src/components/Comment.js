import React from 'react'

const Comment = ({ comment }) => {
  return (
    <>
      <div className="commentBox" key={comment['_id']}>
        <h3 className="commentAuthor">{comment.author}</h3>
        <p className="commentTimestamp">{comment.timestamp}</p>
        <p className="commentBody">{comment.body}</p>
        <div className="commentSocial">
          <p className="commentRating">
            <i className="far fa-thumbs-up"></i> {comment.likes.length}
          </p>
          <p className="commentRating">
            <i className="far fa-thumbs-down"></i> {comment.dislikes.length}
          </p>
        </div>
        <button>Delete</button>
      </div>
    </>
  )
}

export default Comment
