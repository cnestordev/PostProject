import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'

const VotingComment = ({ comment, postId, user }) => {
  const [metrics, setMetrics] = useState({
    likes: comment.likes.length,
    dislikes: comment.dislikes.length,
    liked: comment.likes.includes(user._id),
    disliked: comment.dislikes.includes(user._id),
  })

  const handleLike = async () => {
    try {
      const response = await axiosCall.post(
        `/posts/${postId}/comments/${comment._id}/like`
      )
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }

  const handleDislike = async () => {
    try {
      const response = await axiosCall.post(
        `/posts/${postId}/comments/${comment._id}/dislike`
      )
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    <>
      <div className="commentSocial">
        <p
          onClick={handleLike}
          className={`commentRating ${metrics.liked && 'selected'}`}
        >
          <i className="far fa-thumbs-up"></i> {metrics.likes}
        </p>
        <p
          onClick={handleDislike}
          className={`commentRating ${metrics.disliked && 'selected'}`}
        >
          <i className="far fa-thumbs-down"></i> {metrics.dislikes}
        </p>
      </div>
    </>
  )
}

export default VotingComment
