import React from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'
import { PostImg } from '../styles/post'

import { Container, Text } from '../styles/noImage'

const imageHandler = (img, scale) => {
  if (img.id) {
    return (
      <Image
        cloudName={process.env.REACT_APP_CLOUDINARY_ACCOUNT}
        publicId={img.id}
        className={scale === 'thumbnail' ? 'postImage' : 'postDetailsImage'}
      />
    )
  } else if (img.url) {
    const ext = img.url.slice(-3)
    if (ext === 'jpg' || ext === 'png' || ext === 'ebp') {
      return <PostImg src={img.url} />
    }
  } else {
    return (
      <Container>
        <Text>No Image</Text>
      </Container>
    )
  }
}

export default imageHandler
