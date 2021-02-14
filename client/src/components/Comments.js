import React from 'react'
import Comment from './Comment'

const Comments = ({ data }) => {
  const commentArr = data
    .sort(function (x, y) {
      return y.timestamp - x.timestamp
    })
    .map(comment => {
      return <Comment key={comment['_id']} comment={comment} />
    })
  return (
    <div className="commentsContainer">
      <p className="commentsHeader">Comments:</p>
      {commentArr}
    </div>
  )
}

export default Comments
