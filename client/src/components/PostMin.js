import React from 'react'
import imageHandler from '../controllers/imageHandler'

import {
  Container,
  ImageContainer,
  InfoContainer,
  IconContainer,
  Subheader,
  Icon,
  P,
  PostLink,
} from '../styles/postMin'

const PostMin = ({ post, dark }) => {
  return (
    <Container dark={dark}>
      <ImageContainer>{imageHandler(post.image, 'thumbnail')}</ImageContainer>
      <InfoContainer>
        <PostLink to={`/posts/${post._id}`}>
          <Subheader dark={dark}>{post.title}</Subheader>
        </PostLink>
        <IconContainer>
          <P dark={dark}>
            <Icon dark={dark} className="fas fa-sort-up"></Icon>{' '}
            {post.likes.length}
          </P>
          <P dark={dark}>
            <Icon dark={dark} className="fas fa-sort-down"></Icon>{' '}
            {post.dislikes.length}
          </P>
          <P dark={dark}>
            <Icon dark={dark} className="fas fa-comment"></Icon>{' '}
            {post.comments.length}
          </P>
        </IconContainer>
      </InfoContainer>
    </Container>
  )
}

export default PostMin
