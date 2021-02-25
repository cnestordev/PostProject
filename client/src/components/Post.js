import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import imageHandler from '../controllers/imageHandler'
import timeago from 'epoch-timeago'
import tagsHandler from '../controllers/tagsHandler'
import axiosCall from '../api/axiosCall'
import Voting from './Voting'

import {
  Container,
  NavLink,
  Time,
  Author,
  Title,
  Flair,
  TagsContainer,
} from '../styles/post'

const Post = ({ data, user }) => {
  return (
    <Container>
      <Title>{data.title}</Title>
      <NavLink className="postLink" to={`/posts/${data['_id']}`}>
        <Author>Posted by {data.author.username}</Author>
        <Time>
          {timeago(data.timestamp * 1000)}{' '}
          {data.editCount > 0 && <Flair>| Edited</Flair>}
        </Time>
        <TagsContainer>{tagsHandler(data.tags)}</TagsContainer>
        {imageHandler(data.image, 'thumbnail')}
      </NavLink>
      <Voting data={data} />
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Post)
