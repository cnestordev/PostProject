import React from 'react'

const imageHandler = (img, nameclass) => {
  const ext = img.slice(-3)
  if (ext === 'jpg' || ext === 'png') {
    return <img className={nameclass || 'postImage'} src={img} />
  } else {
    return (
      <div className="noImageContainer">
        <p className="noImageText">No Image</p>
      </div>
    )
  }
}

export default imageHandler
