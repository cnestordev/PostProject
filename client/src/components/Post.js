import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import imageHandler from '../controllers/imageHandler'
import timeago from 'epoch-timeago'
import tagsHandler from '../controllers/tagsHandler'
import axiosCall from '../api/axiosCall'

const Post = ({ data }) => {
  const [metrics, setMetrics] = useState({
    likes: data.likes.length,
    dislikes: data.dislikes.length,
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
    <div className="postContainer">
      <h3 className="postTitle">{data.title}</h3>
      <Link className="postLink" to={`/posts/${data['_id']}`}>
        <h4 className="postAuthor">Posted by {data.author.username}</h4>
        <h5 className="postTimestamp">
          {timeago(data.timestamp * 1000)}{' '}
          {data.editCount > 0 && <p className="editedFlair">| Edited</p>}
        </h5>
        <div className="tagsContainer">{tagsHandler(data.tags)}</div>
        {imageHandler(data.image, 'thumbnail')}
      </Link>
      <div className="socialContainer">
        <p onClick={handleLike} className="postSocial">
          <i className="fas fa-chevron-up"></i>
          {metrics.likes}
        </p>
        <p onClick={handleDisike} className="postSocial">
          <i className="fas fa-chevron-down"></i> {metrics.dislikes}
        </p>
        <p className="postSocial">
          <i className="fas fa-comments"></i> {data.comments.length}
        </p>
      </div>
    </div>
  )
}

export default Post
