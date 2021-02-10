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

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json({ data: 'working' })
})

app.get('/posts', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json({ data: posts })
})

app.get('/posts/:id', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.status(200).json({ data: post })
})

app.post('/posts/new', async (req, res) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.status(201).json({ message: 'post was successfully uploaded' })
  } catch (err) {
    res.status(500).json({ message: 'there was an error uploading new post' })
  }
})

app.get('/posts/:id/edit', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.status(200).json({ data: post })
})

app.put('/posts/:id/edit', async (req, res) => {
  const { id } = req.params
  try {
    const response = await Post.findByIdAndUpdate(id, { ...req.body })
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
})

app.delete('/posts/:id/delete', async (req, res) => {
  const { id } = req.params
  console.log('deleting....')
  try {
    const response = await Post.findByIdAndDelete(id)
    console.log('deleted')
    res.status(201).json({ message: response })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
