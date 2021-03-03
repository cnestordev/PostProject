import React from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'

import { Container, Text } from '../styles/noImage'
import { PostImg } from '../styles/post'

const imageHandler = (img, scale) => {
  let image
  if (Object.keys(img).length) {
    image =
      scale === 'thumbnail'
        ? img.url.replace('/upload', '/upload/w_350')
        : img.url
  }

  if (img.id) {
    return (
      <PostImg
        cloudName={process.env.REACT_APP_CLOUDINARY_ACCOUNT}
        src={image}
        scale={scale}
      />
    )
  } else if (img.url) {
    const ext = img.url.slice(-3)
    if (ext === 'jpg' || ext === 'png' || ext === 'ebp') {
      return <PostImg scale={scale} src={image} />
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
