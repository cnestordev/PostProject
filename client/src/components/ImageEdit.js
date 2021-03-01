import React, { useState, useEffect } from 'react'
import axiosCall from '../api/axiosCall'

import { File } from '../styles/createPost'

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
      <div style={{ position: 'relative' }}>
        <div style={{ textAlign: 'left' }}>
          <img style={{ width: '15%', borderRadius: '5px' }} src={image.url} />
        </div>
        <div
          style={{
            position: 'absolute',
            width: '15%',
            height: '100%',
            background: 'rgba(250, 250, 250, 0.7)',
            borderRadius: '5px',
            top: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleImgDel(image.id)}
        >
          <i
            style={{ fontSize: '2rem', color: '#ff5c50' }}
            className="fas fa-trash"
          ></i>
        </div>
      </div>
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
