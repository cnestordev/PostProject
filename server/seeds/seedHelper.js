const axios = require('axios')

const getReddit = async () => {
  let seedPosts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const response = await axios.get('http://www.reddit.com/r/memes.json')
  let i = 0
  response.data.data.children.forEach(elm => {
    const post = {
      title: elm.data.title,
      author: elm.data.author,
      timestamp: elm.data.created,
      body: 'Temporary',
      image: elm.data.url,
    }
    seedPosts[i] = post
    i++
  })
  return seedPosts
}

module.exports = getReddit
