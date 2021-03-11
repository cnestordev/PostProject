import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'

import { Section } from '../styles'
import { Header } from '../styles/postMin'

import PostMin from './PostMin'

import Popup from './Popup'

const UserPosts = ({ user, dark, blah }) => {
  const [postsData, setPostsData] = useState([])
  // network errors
  const [error, setError] = useState('')

  useEffect(async () => {
    try {
      const response = await axiosCall.get(`/api/posts/all/${user._id}`)
      setPostsData(response.data.message)
    } catch (err) {
      setError(err.response.data.message)
    }
  }, [])

  // unmount popup after 5 seconds
  useEffect(() => {
    if (error !== '') {
      setTimeout(() => {
        setError('')
      }, [5000])
    }
  }, [error])

  // sorts, maps, and assigns keys to PostMin components
  const postsArr = React.Children.toArray(
    postsData
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(post => {
        return <PostMin user={user} dark={dark} post={post} />
      })
  )

  return (
    <Section>
      {error && <Popup message={error} />}
      <Header dark={dark}>{`${user.username}'s posts`}</Header>
      <div>{postsArr}</div>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(UserPosts)
