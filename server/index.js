const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Post = require('./models/post')

//----------------------------------------------- Connect to MongoDB ------------------------------------------------
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

// ---------------------------------------------------------------------------------------------------------------

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({ data: 'working' })
})

app.post('/makePost', async (req, res) => {
  const newPost = new Post({
    title: 'First Post, First Title',
    author: 'The One and Only',
    authorId: '1',
    timestamp: '123456',
    body: 'This right here',
    image: 'url',
  })
  await newPost.save()
  res.status(201).json({ message: 'success' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
