import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/posts.actions'
import Post from './Post'

const Posts = props => {
  console.log(props.posts.posts)
  useEffect(() => {
    props.getPosts()
  }, [])

  const postArr = props.posts.posts.map(post => {
    return <Post key={post['_id']} data={post} />
  })

  return <div>{postArr}</div>
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer,
  }
}

export default connect(mapStateToProps, { getPosts })(Posts)
