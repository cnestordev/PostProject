import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ data }) => {
  console.log(data['_id'])
  return (
    <Link to={`/posts/${data['_id']}`}>
      <div>
        <h3>{data.title}</h3>
        <h4>{data.author}</h4>
        <h5>{data.timestamp}</h5>
        <img style={{ width: '500px' }} src={data.image} />
        <hr />
        <p>Likes: {data.likes}</p>
        <p>Comments: {data.comments}</p>
        <p>Dislikes: {data.dislikes}</p>
      </div>
    </Link>
  )
}

export default Post
