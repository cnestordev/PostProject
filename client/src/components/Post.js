import React from 'react'
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

const Post = ({ data, user, dark }) => {
  return (
    <Container dark={dark}>
      <Title dark={dark}>{data.title}</Title>
      <NavLink className="postLink" to={`/posts/${data['_id']}`}>
        <Author dark={dark}>Posted by {data.author.username}</Author>
        <Time dark={dark}>
          {timeago(data.timestamp * 1000)}{' '}
          {data.editCount > 0 && <Flair>| Edited</Flair>}
        </Time>
        <TagsContainer dark={dark}>
          {tagsHandler(data.tags, dark)}
        </TagsContainer>
        {imageHandler(data.image, 'thumbnail', data.body, dark)}
      </NavLink>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          backdropFilter: 'blur(0px)',
        }}
      >
        <Voting dark={dark} data={data} />
      </div>
    </Container>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Post)
