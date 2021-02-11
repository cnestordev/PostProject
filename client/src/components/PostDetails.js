import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import timeago from 'epoch-timeago'
import imageHandler from '../controllers/imageHandler'

const PostDetails = props => {
  const id = props.match.params.id

  const [postData, setPostDate] = useState({})

  useEffect(async () => {
    console.log('fetching............')
    const response = await axios.get(`http://localhost:3001/posts/${id}`)
    const data = response.data.data
    setPostDate(data)
  }, [])

  return (
    <div className="postDetailsContainer">
      <h2 className="postDetailsTitle">{postData.title}</h2>
      <h3 className="postDetailsAuthor">{postData.author}</h3>
      <h4 className="postDetailsTimestamp">
        {timeago((postData.timestamp || 1610849840) * 1000)}
      </h4>
      <p className="postDetailsBody">{postData.body}</p>
      {imageHandler(postData.image || 'none', 'postDetailsImage')}
      <p>Comments: {postData.comments}</p>
      <p>Likes: {postData.likes}</p>
      <p>Dislikes: {postData.dislikes}</p>
      <Link to={`/posts/${postData['_id']}/edit`}>
        <button>EDIT</button>
      </Link>
    </div>
  )
}

export default PostDetails
