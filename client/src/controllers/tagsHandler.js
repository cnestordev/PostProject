import React from 'react'
import Tags from '../components/Tags'

const tagsHandler = (tags, isDarkMode) => {
  if (tags) {
    const hash = tags
    const hashtags = hash.split(' ')
    return React.Children.toArray(
      hashtags.map(item => {
        const id = Math.random() * 100000
        return <Tags dark={isDarkMode} data={item} />
      })
    )
  }
}

export default tagsHandler
