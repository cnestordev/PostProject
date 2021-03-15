const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')
const Comment = require('../models/comment')
const getReddit = require('./seedHelper')

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('connected to mongo database')
})

const seedDB = async (domain = 'BeAmazed') => {
  const response = await getReddit(domain)

  for (let i = 0; i < response.posts.length; i++) {
    await response.posts[i].save()
  }

  for (let i = 0; i < response.users.length; i++) {
    await response.users[i].save()
  }

  for (let i = 0; i < response.comments.length; i++) {
    await response.comments[i].save()
  }
}

// seedDB()
//   .then(() => {
//     console.log('closing seed files')
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.log(err)
//   })

module.exports = seedDB
