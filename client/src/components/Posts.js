import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts, removePosts } from '../redux/actions/posts.actions'
import Post from './Post'
import SearchBar from './SearchBar'

import { Section } from '../styles/index'

const Posts = props => {
  const [filter, setFilter] = useState('timestamp')

  useEffect(() => {
    props.getPosts()
    return () => {
      props.removePosts()
    }
  }, [filter])

  const postArr = React.Children.toArray(
    props.posts.posts
      .sort(function (x, y) {
        if (filter === 'timestamp') return y[filter] - x[filter]
        return y[filter].length - x[filter].length
      })
      .map(post => {
        return <Post dark={props.dark} data={post} />
      })
  )

  return (
    <Section>
      <SearchBar dark={props.dark} filter={filter} toggler={setFilter} />
      {postArr}
    </Section>
  )
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer,
  }
}

export default connect(mapStateToProps, { getPosts, removePosts })(Posts)
