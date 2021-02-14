import React from 'react'
import Comment from './Comment'

const Comments = ({ data }) => {
  console.log('comment props')
  const commentArr = data.map(comment => {
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
