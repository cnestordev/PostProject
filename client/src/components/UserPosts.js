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

  const postsArr = React.Children.toArray(
    postsData
      .sort(function (x, y) {
        return y.timestamp - x.timestamp
      })
      .map(post => {
        console.log(post)
        return <PostMin user={user} dark={dark} post={post} />
      })
  )

  if (postsData.length === 0) {
    return (
      <Section>
        <h1 style={{ fontSize: '100px' }}>User Posts</h1>
      </Section>
    )
  }

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
