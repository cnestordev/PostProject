const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
const usersRouter = require('./routes/users')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
var cookieParser = require('cookie-parser')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

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

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.static(path.join(__dirname, 'public')))

// express session middleware
app.use(
  session({
    name: 'postsits',
    secret: 'secretcode',
    resave: false,
    saveUninitialized: true, // this should be default || GDPR compliance
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
      secure: false, //change this later on
    },
  })
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/posts', postsRouter)
app.use('/posts/:id/comments', commentsRouter)
app.use('/', usersRouter)

app.get('/', (req, res) => {
  console.log(req.headers.host)
  console.log(req.isAuthenticated())
  console.log(req.user)
  res
    .json({
      user: { 1: 'hey', 2: req.user },
      data: 'working',
      status: req.isAuthenticated(),
    })
    .end()
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
