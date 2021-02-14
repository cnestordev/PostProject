import React from 'react'
import Tags from '../components/Tags'

const tagsHandler = tags => {
  if (tags) {
    const hash = tags
    const hashtags = hash.split(' ')
    return hashtags.map(item => {
      const id = Math.random() * 100000
      return <Tags key={id} data={item} />
    })
  }
}

export default tagsHandler