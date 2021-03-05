import React from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'

import { Container, Text } from '../styles/noImage'
import { PostImg } from '../styles/post'

const imageHandler = (img, scale, text, dark) => {
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) : str
  }

  if (img.url) {
    return <PostImg src={scale === 'thumbnail' ? img.thumbnail : img.url} />
  } else if (text) {
    return (
      <Container>
        <Text dark={dark}>{truncate(text, 90)}</Text>
      </Container>
    )
  }
}

export default imageHandler
