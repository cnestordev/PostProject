import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'

import { CommentSocialContainer, Rating, Icon } from '../styles/comment'

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
      <CommentSocialContainer>
        <Rating
          dark={user.darkMode}
          active={metrics.liked}
          onClick={handleLike}
        >
          <Icon className="far fa-thumbs-up"></Icon> {metrics.likes}
        </Rating>
        <Rating
          dark={user.darkMode}
          active={metrics.disliked}
          onClick={handleDislike}
        >
          <Icon className="far fa-thumbs-down"></Icon> {metrics.dislikes}
        </Rating>
      </CommentSocialContainer>
    </>
  )
}

export default VotingComment
