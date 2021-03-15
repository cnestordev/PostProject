const axios = require('axios')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')
const { performance } = require('perf_hooks')
const {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} = require('unique-names-generator')

const users = []

for (let i = 0; i < 10; i++) {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 2,
  })
  users.push(randomName)
}

let links = []

const getReddit = async () => {
  usersSeed = []
  postsSeed = []
  commentsSeed = []
  // create seed users

  for (let i = 0; i < users.length; i++) {
    const username = users[i].charAt(0).toUpperCase() + users[i].slice(1)
    const user = new User({ username, email: '' })
    const password = users[i]
    const newUser = await User.register(user, password)
    usersSeed.push(newUser)
  }

  // create seed posts
  const response = await axios.get('http://www.reddit.com/r/BeAmazed.json')
  for (let i = 1; i < 20; i++) {
    const format = response.data.data.children[i].data.url.slice(-3)

    if (
      format !== 'jpg' &&
      format !== 'gif' &&
      format !== 'jpeg' &&
      format !== 'svg'
    ) {
      continue
    }

    const user = usersSeed[Math.floor(Math.random() * users.length)]
    links.push(
      `https://www.reddit.com${response.data.data.children[i].data.permalink}.json`
    )
    const { title, url, selftext, thumbnail } = response.data.data.children[
      i
    ].data
    const newPost = await new Post({
      title,
      author: user['_id'],
      authorId: user['_id'],
      timestamp: Math.round(new Date().getTime() / 1000),
      body: selftext,
      image: {
        url,
        id: '',
        thumbnail,
      },
      likes: [],
      dislikes: [],
      comments: [],
    })
    user.posts.push(newPost)
    postsSeed.push(newPost)
  }

  // seed comments
  for (let i = 0; i < postsSeed.length; i++) {
    const response = await axios.get(links[i])
    const size = response.data[1].data.children.length
    for (let j = 0; j < (size <= 5 ? size : 5); j++) {
      const user = usersSeed[Math.floor(Math.random() * 10)]
      const comment = new Comment({
        body: response.data[1].data.children[j].data.body || 'blank',
        author: user['_id'],
        authorId: user['_id'],
        originated: postsSeed[i]['_id'],
        timestamp: Math.round(new Date().getTime() / 1000),
        likes: [],
        dislikes: [],
      })
      user.comments.push(comment)
      postsSeed[i].comments.push(comment)
      commentsSeed.push(comment)
    }
  }

  return {
    users: usersSeed,
    posts: postsSeed,
    comments: commentsSeed,
  }
}

module.exports = getReddit
