import React from 'react'
import Comment from './Comment'

const Comments = ({ data, postId }) => {
  const commentArr = React.Children.toArray(
    data
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(comment => {
        return <Comment postId={postId} comment={comment} />
      })
  )
  return (
    <div className="commentsContainer">
      <p className="commentsHeader">Comments:</p>
      {commentArr}
    </div>
  )
}

export default Comments
