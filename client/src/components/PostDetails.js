import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import tagsHandler from '../controllers/tagsHandler'

import timeago from 'epoch-timeago'
import imageHandler from '../controllers/imageHandler'
import ErrorPage from './ErrorPage'

import PostComment from './PostComment'
import axiosCall from '../api/axiosCall'
import Comments from './Comments'
import Voting from './Voting'

import {
  Container,
  Title,
  Author,
  Time,
  EditContainer,
  PostLink,
  EditPara,
  DelPara,
  PostBody,
  VoteContainer,
  CommentSection,
} from '../styles/postDetails'

import { TagsContainer } from '../styles/post'

const PostDetails = props => {
  const id = props.match.params.id

  const history = useHistory()

  const [postData, setPostDate] = useState({})

  const [error, setError] = useState(false)

  useEffect(async () => {
    // console.log('fetching............')
    try {
      const response = await axiosCall.get(`/posts/${id}`)
      const { data } = response.data
      // console.log('successfully fetched post data')
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
    // console.log(id)
    try {
      const response = await axiosCall.delete(`/posts/${id}/delete`)
      // console.log('successfully deleted post')
      // console.dir(response)
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
        <Container>
          <Title>{postData.title}</Title>
          <Author>Posted by {postData.author.username}</Author>
          <Time>{timeago((postData.timestamp || 1610849840) * 1000)}</Time>
          <TagsContainer>{tagsHandler(postData.tags)}</TagsContainer>
          {props.user._id === postData.authorId ? (
            <EditContainer>
              <PostLink to={`/posts/${postData['_id']}/edit`}>
                <EditPara>Edit</EditPara>
              </PostLink>{' '}
              <DelPara onClick={() => handleDelete(postData._id)}>
                Delete
              </DelPara>
            </EditContainer>
          ) : null}
          <hr />
          <PostBody>{postData.body}</PostBody>
          {imageHandler(postData.image, 'full')}
          <VoteContainer>
            <Voting data={postData} />
          </VoteContainer>
        </Container>
        <CommentSection>
          <PostComment postData={postData} postId={postData['_id']} />
        </CommentSection>
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
