const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Post = require('./models/post')
const Comment = require('./models/comment')
const { postSchema, commentSchema } = require('./validation/postValidation.js')

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

const validateComment = (req, res, next) => {
  const validation = commentSchema.validate(req.body)
  if (validation.error) {
    console.log('-----------------------------')
    console.log(validation.error.details[0].message)
    return next({ message: validation.error.details[0].message, status: 400 })
  }
  next()
}

const addTimestamp = (req, res, next) => {
  req.body.timestamp = Math.round(new Date().getTime() / 1000)
  next()
}

app.get('/', (req, res) => {
  console.log(req.headers.host)
  res.json({ data: 'working' }).end()
})

app.get('/posts', async (req, res) => {
  const posts = await Post.find({})
  res.status(200).json({ data: posts })
})

app.get('/posts/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await await Post.findById(id).populate('comments')
    console.log(post)
    if (!post) {
      return next({ message: 'No Post Found', status: 404 })
    }
    res.status(200).json({ data: post })
  } catch (error) {
    console.log('ERROR!!!')
    return next({ message: 'Invalid URL', status: 400 })
  }
})

app.post('/posts/new', addTimestamp, validatePost, async (req, res, next) => {
  try {
    const post = new Post(req.body)
    const resul = await post.save()
    console.log(resul)
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

// ----comments-------------------------------------------

app.post(
  '/posts/:id/comments',
  addTimestamp,
  validateComment,
  async (req, res) => {
    const { id } = req.params
    const { body, author, authorId, timestamp, likes, dislikes } = req.body
    console.log('-------------------------------')
    console.log(req.body.timestamp)
    try {
      const post = await Post.findById(id)
      const comment = new Comment({
        body,
        author,
        authorId,
        timestamp,
        likes: [],
        dislikes: [],
      })
      post.comments.push(comment)
      await comment.save()
      const updatedPost = await (await post.save())
        .populate('comments')
        .execPopulate()
      res.status(201).json({
        data: updatedPost,
        message: 'successfully added comment',
        status: 201,
      })
    } catch (err) {
      console.log(err)
      res.status(404).json({ message: 'Post Not Found', status: 404 })
    }
  }
)

app.delete('/posts/:id/comments/:commentId/', async (req, res) => {
  const { id, commentId } = req.params
  try {
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    res.status(201).json({ message: 'deleted comment', status: 201 })
  } catch (err) {
    res.status(500).json({ message: 'could not delete', status: 500 })
  }
})

// -------------------------------------------------------

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
