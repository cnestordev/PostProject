const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Post = require('./models/post')
const { postSchema } = require('./validation/postValidation.js')

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

const validatePost = (req, res, next) => {
  const validation = postSchema.validate(req.body)
  if (validation.error) {
    console.log('-----------------------------')
    console.log(validation.error.details[0].message)
    return next({ message: validation.error.details[0].message, status: 400 })
  }
  next()
}

app.get('/', (req, res) => {
  res.json({ data: 'working' })
})

app.get('/posts', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json({ data: posts })
})

app.get('/posts/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await Post.findById(id)
    if (!post) {
      return next({ message: 'No Post Found', status: 404 })
    }
    res.status(200).json({ data: post })
  } catch (error) {
    console.log('ERROR!!!')
    return next({ message: 'Invalid URL', status: 400 })
  }
})

app.post('/posts/new', validatePost, async (req, res, next) => {
  try {
    const post = new Post(req.body)
    await post.save()
    res.status(201).json({ message: 'post was successfully uploaded' })
  } catch (err) {
    console.log('There is a problem!')
    return next({ message: err })
  }
})

app.get('/posts/:id/edit', async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.status(200).json({ data: post })
})

app.put('/posts/:id/edit', validatePost, async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await Post.findByIdAndUpdate(id, { ...req.body })
    console.log(response)
    res.status(201).json({ message: 'successfully updated post', id })
  } catch (err) {
    return next(err)
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

app.all('*', (req, res) => {
  console.log('404 NO PAGE EXISTS')
  res.status(404).json({ message: 'Invalid URL' })
})

app.use((err, req, res, next) => {
  console.log('triggered')
  const { status, message } = err
  res.status(status).json({ message, status })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
