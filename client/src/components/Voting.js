import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'
import { connect } from 'react-redux'

const Voting = ({ data, user }) => {
  const [metrics, setMetrics] = useState({
    likes: data.likes.length,
    dislikes: data.dislikes.length,
    liked: data.likes.includes(user._id),
    disliked: data.dislikes.includes(user._id),
  })

  const handleLike = async () => {
    try {
      const response = await axiosCall.post(`/posts/${data._id}/like`)
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }

  const handleDisike = async () => {
    try {
      const response = await axiosCall.post(`/posts/${data._id}/dislike`)
      console.log(response.data.message)
      setMetrics(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }
  return (
    <>
      <div className="socialContainer">
        <p
          onClick={handleLike}
          className={`postSocial ${metrics.liked && 'selected'}`}
        >
          <i className="fas fa-chevron-up"></i>
          {metrics.likes}
        </p>
        <p
          onClick={handleDisike}
          className={`postSocial ${metrics.disliked && 'selected'}`}
        >
          <i className="fas fa-chevron-down"></i> {metrics.dislikes}
        </p>
        <p className="postSocial">
          <i className="fas fa-comments"></i> {data.comments.length}
        </p>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Voting)
