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

const ImageEdit = ({
  image,
  postId,
  handler,
  dark,
  data,
  setData,
  alertToggler,
}) => {
  const [deleted, hasDeleted] = useState(false)

  const handleImgDel = async img => {
    try {
      await axiosCall.delete(`/posts/${postId}/${image.id}`)
      hasDeleted(true)
      setData({
        ...data,
        image: {},
      })
    } catch (err) {
      alertToggler(err.response.data.message)
    }
  }

  // if image was deleted by user on Edit, it will display the File input
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

  // If there is an existing image, it will display the thumbnail with the delete-icon overlay
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
    // if no image exists, it will display the File input
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
