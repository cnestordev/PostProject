import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/posts.actions'
import Post from './Post'

const Posts = props => {
  useEffect(() => {
    props.getPosts()
  }, [])

  //sorts the array of posts first, then maps through them to create Post components
  // const postArr = props.posts.posts
  //   .sort(function (x, y) {
  //     return y.timestamp - x.timestamp
  //   })
  //   .map(post => {
  //     return <Post key={post['_id']} data={post} />
  //   })

  const postArr = React.Children.toArray(
    props.posts.posts
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(post => {
        return <Post data={post} />
      })
  )

  return <div>{postArr}</div>
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer,
  }
}

export default connect(mapStateToProps, { getPosts })(Posts)
