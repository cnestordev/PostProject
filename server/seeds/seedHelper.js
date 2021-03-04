const axios = require('axios')
const User = require('../models/user')
const Post = require('../models/post')

const users = [
  'red',
  'blue',
  'yellow',
  'gold',
  'silver',
  'green',
  'orange',
  'purple',
  'pink',
  'cyan',
]

const getReddit = async () => {
  usersSeed = []
  postsSeed = []
  // create seed users

  for (let i = 0; i < 10; i++) {
    const user = new User({ username: users[i], email: '' })
    const password = users[i]
    const newUser = await User.register(user, password)
    usersSeed.push(newUser)
  }

  // create seed posts
  const response = await axios.get('http://www.reddit.com/r/dankmemes.json')

  for (let i = 1; i < 11; i++) {
    const { title, url, selftext } = response.data.data.children[i].data
    const newPost = await new Post({
      title,
      author: usersSeed[Math.floor(Math.random() * 10)]['_id'],
      authorId: usersSeed[Math.floor(Math.random() * 10)]['_id'],
      timestamp: Math.round(new Date().getTime() / 1000),
      body: selftext,
      image: {
        url: url,
        id: '',
      },
      likes: [],
      dislikes: [],
      comments: [],
    })
    postsSeed.push(newPost)
  }

  return {
    users: usersSeed,
    posts: postsSeed,
  }
}

module.exports = getReddit
