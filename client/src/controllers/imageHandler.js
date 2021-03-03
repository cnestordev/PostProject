import React from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'

import { Container, Text } from '../styles/noImage'
import { PostImg } from '../styles/post'

const imageHandler = (img, scale, text, dark) => {
  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) : str
  }

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
  } else if (text) {
    return (
      <Container>
        <Text dark={dark}>{truncate(text, 90)}</Text>
      </Container>
    )
  }
}

export default imageHandler
