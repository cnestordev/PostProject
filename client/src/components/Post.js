import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import imageHandler from '../controllers/imageHandler'
import timeago from 'epoch-timeago'
import tagsHandler from '../controllers/tagsHandler'
import axiosCall from '../api/axiosCall'
import Voting from './Voting'

const Post = ({ data, user }) => {
  return (
    <div className="postContainer">
      <h3 className="postTitle">{data.title}</h3>
      <Link className="postLink" to={`/posts/${data['_id']}`}>
        <h4 className="postAuthor">Posted by {data.author.username}</h4>
        <h5 className="postTimestamp">
          {timeago(data.timestamp * 1000)}{' '}
          {data.editCount > 0 && <p className="editedFlair">| Edited</p>}
        </h5>
        <div className="tagsContainer">{tagsHandler(data.tags)}</div>
        {imageHandler(data.image, 'thumbnail')}
      </Link>
      <Voting data={data} />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(Post)
