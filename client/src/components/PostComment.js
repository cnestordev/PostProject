import React, { useState } from 'react'
import axios from 'axios'

const PostComment = props => {
  const [postData, setPostData] = useState({
    body: '',
    author: 'predetermined',
    authorId: 'predetermined',
    timestamp: '',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setPostData({
      ...postData,
      [name]: value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('making POST request to comments')
    const id = props.postId
    try {
      await axios.post(`http://localhost:3001/posts/${id}/comments`, postData)
      console.log('success')
    } catch (err) {
      console.log('entering error on POST comments')
    }
  }

  return (
    <div className="postCommentContainer">
      <form onSubmit={handleSubmit}>
        <textarea onChange={handleChange} name="body" value={postData.body} />
        <button>comment</button>
      </form>
    </div>
  )
}

export default PostComment
