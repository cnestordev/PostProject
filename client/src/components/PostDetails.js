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
  Hr,
} from '../styles/postDetails'

import { TagsContainer } from '../styles/post'

import { Section } from '../styles'

const PostDetails = ({ user, match, dark }) => {
  const id = match.params.id

  const history = useHistory()

  const [postData, setPostData] = useState({})

  const [error, setError] = useState(false)

  useEffect(async () => {
    // console.log('fetching............')
    try {
      const response = await axiosCall.get(`/posts/${id}`)
      const { data } = response.data
      // console.log('successfully fetched post data')
      setPostData(data)
    } catch (err) {
      console.log('CATCH post details')
      if (err.response.data.status === 400) {
        return setError(true)
      }
      setPostData({
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
      <Section>
        <Container dark={dark}>
          <Title dark={dark}>{postData.title}</Title>
          <Author dark={dark}>Posted by {postData.author.username}</Author>
          <Time dark={dark}>
            {timeago((postData.timestamp || 1610849840) * 1000)}
          </Time>
          <TagsContainer>{tagsHandler(postData.tags, dark)}</TagsContainer>
          {user._id === postData.authorId || user.isAdmin ? (
            <EditContainer>
              {user._id === postData.authorId && (
                <PostLink to={`/posts/${postData['_id']}/edit`}>
                  <EditPara>Edit</EditPara>
                </PostLink>
              )}
              <DelPara onClick={() => handleDelete(postData._id)}>
                Delete
              </DelPara>
            </EditContainer>
          ) : null}
          <Hr dark={dark} />
          <PostBody dark={dark}>{postData.body}</PostBody>
          {imageHandler(postData.image, 'full', null)}
          <VoteContainer>
            <Voting dark={dark} data={postData} />
          </VoteContainer>
        </Container>
        <CommentSection>
          <PostComment
            dark={dark}
            postData={postData}
            postId={postData['_id']}
          />
        </CommentSection>
      </Section>
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
