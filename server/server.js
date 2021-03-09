require('dotenv').config()

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
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const User = require('./models/user')

const MongoStore = require('connect-mongo').default

const PORT = process.env.PORT || 3001

//----------------------------------------------- Connect to MongoDB ------------------------------------------------

const url = process.env.MONGO_DB_URL

mongoose.connect(url, {
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

app.use(
  mongoSanitize({
    replaceWith: '_',
  })
)
app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: 'https://memeit-client.vercel.app',
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
  })
)

app.use(express.static(path.join(__dirname, 'public')))

// express session middleware

const store = MongoStore.create({
  mongoUrl: url,
  secret: process.env.MONGO_SECRET,
  touchAfter: 24 * 60 * 60,
})

store.on('error', err => {
  console.log(err)
})

app.use(
  session({
    store,
    name: 'pfil',
    secret: process.env.MONGO_SECRET,
    resave: false,
    saveUninitialized: true, // this should be default || GDPR compliance
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: false,
      secure: true, //change this later on
      sameSite: 'none',
    },
  })
)

app.use(cookieParser(process.env.COOKIE_SECRET))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use('/posts', postsRouter)
app.use('/posts/:id/comments', commentsRouter)
app.use('/', usersRouter)

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Invalid search term' })
})

app.use((err, req, res, next) => {
  console.log('triggered error')
  const { status, message } = err
  res.status(status).json({ message, status })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
