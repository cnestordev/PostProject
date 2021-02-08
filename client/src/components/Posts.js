import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/posts.actions'

const Posts = props => {
  useEffect(async () => {
    console.log('-------------------------')
    console.log(props)
    console.log('-------------------------')
    console.log(props)
  }, [])

  return <div>Posts Component</div>
}

const mapStateToProps = state => {
  return {
    blah: state.postsReducer,
  }
}

export default connect(mapStateToProps, { getPosts })(Posts)
