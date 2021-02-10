import React from 'react'

const imageHandler = img => {
  const ext = img.slice(-3)
  if (ext === 'jpg' || ext === 'png') {
    return <img src={img} />
  } else {
    return <h5>No Image</h5>
  }
}

export default imageHandler
