const mongoose = require('mongoose')
const Post = require('../models/post')
const User = require('../models/user')
const getReddit = require('./seedHelper')

mongoose.connect('mongodb://localhost:27017/reddit-clone', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('connected to mongo database')
})

const seedDB = async () => {
  await Post.deleteMany({})
  await User.deleteMany({})
  const response = await getReddit()

  for (let i = 0; i < 10; i++) {
    await response.posts[i].save()
    await response.users[i].save()
  }
}

seedDB()
  .then(() => {
    console.log('closing seed files')
    mongoose.connection.close()
  })
  .catch(err => {
    console.log(err)
  })
