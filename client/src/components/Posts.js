import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts, removePosts } from '../redux/actions/posts.actions'
import Post from './Post'

const Posts = props => {
  console.log('%c *********!!!!!!!', 'color: red;')
  console.log(props.location.state)
  useEffect(() => {
    props.getPosts()
    return () => {
      props.removePosts()
    }
  }, [])

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

export default connect(mapStateToProps, { getPosts, removePosts })(Posts)
