import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import timeago from 'epoch-timeago'
import imageHandler from '../controllers/imageHandler'
import ErrorPage from './ErrorPage'

import PostComment from './PostComment'
import axiosCall from '../api/axiosCall'
import Comments from './Comments'

const PostDetails = props => {
  const id = props.match.params.id

  const [postData, setPostDate] = useState({})

  const [error, setError] = useState(false)

  useEffect(async () => {
    console.log('fetching............')
    try {
      const response = await axiosCall.get(`/posts/${id}`)
      const { data } = response.data
      console.log('successfully fetched post data')
      setPostDate(data)
    } catch (err) {
      console.log('entering error')
      console.dir(err)
      setPostDate({
        message: err.response.data.message,
        status: err.response.status,
      })
      setError(true)
    }
  }, [])

  if (error) {
    return (
      <div>
        <ErrorPage status={postData.status} message={postData.message} />
      </div>
    )
  }

  if (Object.keys(postData).length > 0) {
    return (
      <>
        <div className="postDetailsContainer">
          <h2 className="postDetailsTitle">{postData.title}</h2>
          <h3 className="postDetailsAuthor">{postData.author}</h3>
          <h4 className="postDetailsTimestamp">
            {timeago((postData.timestamp || 1610849840) * 1000)}
          </h4>
          <p className="postDetailsBody">{postData.body}</p>
          {imageHandler(postData.image, 'full')}
          <p>Comments: {postData.comments.length}</p>
          <p>Likes: {postData.likes.length}</p>
          <p>Dislikes: {postData.dislikes.length}</p>
          <Link to={`/posts/${postData['_id']}/edit`}>
            <button>EDIT</button>
          </Link>
        </div>
        <div className="commentSection">
          <PostComment postId={postData['_id']} />
          <Comments data={postData.comments} />
        </div>
      </>
    )
  } else {
    return <h1>Loading......</h1>
  }
}

export default PostDetails
