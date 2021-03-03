import React, { useState } from 'react'
import axiosCall from '../api/axiosCall'
import { connect } from 'react-redux'
import { getFilteredPosts, removePosts } from '../redux/actions/posts.actions'

import { Container, Button, Input } from '../styles/searchBar'

const SearchBar = ({
  filter,
  toggler,
  dark,
  getFilteredPosts,
  removePosts,
}) => {
  const [query, setQuery] = useState('')

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleClick = paramater => {
    toggler(paramater)
  }

  const handleSearch = async e => {
    e.preventDefault()
    await removePosts()
    try {
      const response = await axiosCall.get(`/posts/search/${query}`)
      console.log(response.data.message)
      getFilteredPosts(response.data.message)
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    <Container dark={dark}>
      <Input
        // onSubmit={handleSearch}
        onKeyDown={e => e.key === 'Enter' && handleSearch(e)}
        value={query}
        onChange={handleChange}
        type="text"
        dark={dark}
        placeholder="Search for posts"
      />
      <Button
        active={filter === 'timestamp'}
        onClick={() => handleClick('timestamp')}
        dark={dark}
      >
        Recent
      </Button>
      <Button
        dark={dark}
        active={filter === 'likes'}
        onClick={() => handleClick('likes')}
      >
        Liked
      </Button>
      <Button
        active={filter === 'dislikes'}
        onClick={() => handleClick('dislikes')}
        dark={dark}
      >
        Disliked
      </Button>
      <Button
        active={filter === 'comments'}
        onClick={() => handleClick('comments')}
        dark={dark}
      >
        Commented
      </Button>
    </Container>
  )
}

export default connect(null, { getFilteredPosts, removePosts })(SearchBar)
