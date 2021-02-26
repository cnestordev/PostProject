import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import imageHandler from '../controllers/imageHandler'
import timeago from 'epoch-timeago'
import tagsHandler from '../controllers/tagsHandler'
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
    <Container dark={user.darkMode}>
      <Title dark={user.darkMode}>{data.title}</Title>
      <NavLink className="postLink" to={`/posts/${data['_id']}`}>
        <Author dark={user.darkMode}>Posted by {data.author.username}</Author>
        <Time dark={user.darkMode}>
          {timeago(data.timestamp * 1000)}{' '}
          {data.editCount > 0 && <Flair>| Edited</Flair>}
        </Time>
        <TagsContainer dark={user.darkMode}>
          {tagsHandler(data.tags, user.darkMode)}
        </TagsContainer>
        {imageHandler(data.image, 'thumbnail')}
      </NavLink>
      <Voting dark={user.darkMode} data={data} />
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Post)
