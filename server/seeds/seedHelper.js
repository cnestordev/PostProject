const axios = require('axios')
const { response } = require('express')

const getReddit = async () => {
  let seedPosts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const response = await axios.get('http://www.reddit.com/r/funny.json')
  for (let i = 0; i < 10; i++) {
    const {
      title,
      author,
      authorId = 'Anon',
      created,
      url,
      ups,
      downs,
      num_comments,
      selftext,
    } = response.data.data.children[i].data
    const newPost = {
      title,
      author,
      authorId,
      timestamp: created,
      body: selftext,
      image: url,
      likes: ups,
      dislikes: downs,
      comments: num_comments,
    }
    seedPosts[i] = newPost
  }
  return seedPosts
}

module.exports = getReddit
