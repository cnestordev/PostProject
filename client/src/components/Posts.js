import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts, removePosts } from '../redux/actions/posts.actions'
import Post from './Post'
import SearchBar from './SearchBar'

import Popup from './Popup'

import { Section } from '../styles/index'
import { popup_timer } from '../util/shared'

const Posts = props => {
  const [filter, setFilter] = useState('timestamp')

  // network errors
  const [error, setError] = useState('')

  useEffect(() => {
    props.getPosts()
    return () => {
      props.removePosts()
    }
  }, [filter])

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [popup_timer])
    }
  }, [error])

  // sorts, maps, and assigns key to each Post component
  const postArr = React.Children.toArray(
    props.posts.posts
      .sort(function (x, y) {
        if (filter === 'timestamp') return y[filter] - x[filter]
        return y[filter].length - x[filter].length
      })
      .map(post => {
        return <Post alertToggler={setError} dark={props.dark} data={post} />
      })
  )

  return (
    <Section>
      {error && <Popup message={error} />}
      <SearchBar
        alertToggler={setError}
        dark={props.dark}
        filter={filter}
        toggler={setFilter}
      />
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
