import React from 'react'
import { Image, Transformation, CloudinaryContext } from 'cloudinary-react'

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
    if (ext === 'jpg' || ext === 'png' || 'ebp') {
      return <img className="postImage" src={img.url} />
    } else {
      return (
        <div className="noImageContainer">
          <p className="noImageText">No Image</p>
        </div>
      )
    }
  }
}

export default imageHandler
