import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import timeago from 'epoch-timeago'
import imageHandler from '../controllers/imageHandler'
import ErrorPage from './ErrorPage'

import PostComment from './PostComment'
import axiosCall from '../api/axiosCall'
import Comments from './Comments'

const PostDetails = props => {
  const id = props.match.params.id

  const history = useHistory()

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
      console.log('CATCH post details')
      if (err.response.data.status === 400) {
        return setError(true)
      }
      setPostDate({
        message: err.response.data.message,
        status: err.response.status,
      })
      setError(true)
    }
  }, [])

  const handleDelete = async id => {
    console.log(id)
    try {
      const response = await axiosCall.delete(`/posts/${id}/delete`)
      console.log('successfully deleted post')
      console.dir(response)
      history.push('/posts')
    } catch (err) {
      console.log(err)
    }
  }

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
          <h3 className="postDetailsAuthor">
            Posted by {postData.author.username}
          </h3>
          <h4 className="postDetailsTimestamp">
            {timeago((postData.timestamp || 1610849840) * 1000)}
          </h4>
          {props.user._id === postData.authorId ? (
            <div className="editPostContainer">
              <Link
                className="editPostLinkComponent"
                to={`/posts/${postData['_id']}/edit`}
              >
                <p className="editPostLink edit">Edit</p>
              </Link>{' '}
              <p
                onClick={() => handleDelete(postData._id)}
                className="editPostLink delete"
              >
                Delete
              </p>
            </div>
          ) : null}
          <hr />
          <p className="postDetailsBody">{postData.body}</p>
          {imageHandler(postData.image, 'full')}
          <p>Comments: {postData.comments.length}</p>
          <p>Likes: {postData.likes.length}</p>
          <p>Dislikes: {postData.dislikes.length}</p>
        </div>
        <div className="commentSection">
          <PostComment postData={postData} postId={postData['_id']} />
        </div>
      </>
    )
  } else {
    return <h1>Loading......</h1>
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, null)(PostDetails)
