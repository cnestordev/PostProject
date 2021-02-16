require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const path = require('path')

//----------------------------------------------- Connect to MongoDB ------------------------------------------------
mongoose.connect('mongodb://localhost:27017/reddit-clone', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('connected to mongo database')
})

// ---------------------------------------------------------------------------------------------------------------

const app = express()

app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(cors({ credentials: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
)

app.use('/posts', postsRouter)
app.use('/posts/:id/comments', commentsRouter)

app.get('/', (req, res) => {
  console.log(req.headers.host)
  res.json({ data: 'working' }).end()
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
