import React from 'react'
import { Link } from 'react-router-dom'

import imageHandler from '../controllers/imageHandler'
import timeago from 'epoch-timeago'
import tagsHandler from '../controllers/tagsHandler'

const Post = ({ data }) => {
  return (
    <Link className="postLink" to={`/posts/${data['_id']}`}>
      <div className="postContainer">
        <h3 className="postTitle">{data.title}</h3>
        <h4 className="postAuthor">{data.author}</h4>
        <h5 className="postTimestamp">
          {timeago(data.timestamp * 1000)} |{' '}
          {data.editCount > 0 && <p className="editedFlair">Edited</p>}
        </h5>
        <div className="tagsContainer">{tagsHandler(data.tags)}</div>
        {imageHandler(data.image, 'thumbnail')}
        <div className="socialContainer">
          <p className="postSocial">
            <i className="fas fa-chevron-up"></i>
            {data.likes}
          </p>
          <p className="postSocial">
            <i className="fas fa-chevron-down"></i> {data.dislikes}
          </p>
          <p className="postSocial">
            <i className="fas fa-comments"></i> {data.comments}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Post
