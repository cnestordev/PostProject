const axios = require('axios')
const { response } = require('express')

const getReddit = async () => {
  let seedPosts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const response = await axios.get('http://www.reddit.com/r/memes.json')
  for (let i = 0; i < 10; i++) {
    const { title, author, created, url } = response.data.data.children[i]
    const newPost = {
      title,
      author,
      timestamp: created,
      body: 'Temp',
      image: url,
    }
    seedPosts[i] = newPost
  }
  return seedPosts
}

module.exports = getReddit
