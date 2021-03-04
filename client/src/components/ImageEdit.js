import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'

import { File } from '../styles/createPost'

import {
  Container,
  ImageContainer,
  Image,
  Overlay,
  Icon,
} from '../styles/imageEdit'

const ImageEdit = ({ image, postId, handler, dark, data, setData }) => {
  const [deleted, hasDeleted] = useState(false)

  const handleImgDel = async img => {
    try {
      const response = await axiosCall.delete(`/posts/${postId}/${image.id}`)
      hasDeleted(true)
      setData({
        ...data,
        image: {},
      })
    } catch (err) {
      console.log(err)
    }
  }

  if (deleted) {
    return (
      <File
        dark={dark}
        id="image"
        type="file"
        name="image"
        onChange={handler}
        style={{ position: 'relative' }}
      />
    )
  }

  if (Object.keys(image).length) {
    return (
      <Container>
        <ImageContainer>
          <Image src={image.url} />
        </ImageContainer>
        <Overlay onClick={() => handleImgDel(image.id)}>
          <Icon className="fas fa-trash"></Icon>
        </Overlay>
      </Container>
    )
  } else {
    return (
      <File
        dark={dark}
        id="image"
        type="file"
        name="image"
        onChange={handler}
        style={{ position: 'relative' }}
      />
    )
  }
}
export default ImageEdit
