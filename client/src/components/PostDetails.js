import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

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
    <div>
      <h2>{postData.title}</h2>
      <h3>{postData.author}</h3>
      <h4>{postData.timestamp}</h4>
      <p>{postData.body}</p>
      <img src={postData.image} style={{ width: '500px' }} />
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
