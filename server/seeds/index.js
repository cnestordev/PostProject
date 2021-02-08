const mongoose = require('mongoose')
const Post = require('../models/post')
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
  const response = await getReddit()
  response.forEach(async post => {
    let newPost = new Post(post)
    await newPost.save()
  })
}

seedDB().then(() => {
  mongoose.connection.close()
})
