import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'

import { Section } from '../styles'
import { Header } from '../styles/postMin'

import PostMin from './PostMin'

const UserPosts = ({ user, dark }) => {
  const [postsData, setPostsData] = useState([])

  useEffect(async () => {
    try {
      const response = await axiosCall.get(`/posts/all/${user._id}`)
      setPostsData(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }, [])

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
      <Header dark={dark}>{`${user.username}'s posts`}</Header>
      <div>{postsArr}</div>
    </Section>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(UserPosts)
