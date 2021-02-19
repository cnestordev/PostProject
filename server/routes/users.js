const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const { validateUser } = require('../middleware')

router.get('/', (req, res) => {
  console.log('hit root route')
  console.log(req.headers.host)
  console.log(req.isAuthenticated())
  // console.log(req.user)
  res
    .json({
      user: req.user,
      data: req.isAuthenticated(),
    })
    .end()
})

//route for development only
router.get('/user', async (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user)
  }
})

router.get('/isloggedin', (req, res) => {
  console.log('is logged in route')
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.send(false)
  }
})

router.get('/register', async (req, res) => {
  res.send('working')
})

router.post('/register', validateUser, async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username })
    const newUser = await User.register(user, password)
    console.log('successfully registered user')
    req.login(newUser, err => {
      if (err) return next(err)
      const userData = {
        username: user.username,
        id: user.id,
        posts: user.posts,
        likedPosts: user.likedPosts,
        comments: user.comments,
        likedComments: user.likedComments,
      }
      res.status(201).json({ userData, status: 201 })
    })
  } catch (err) {
    console.log('REGISTER CATCH')
    res.status(401).json({ message: err.message, status: 401 })
  }
})

router.get('/login', (req, res) => {
  res.send(req.isAuthenticated())
  //   console.log(req.isAuthenticated())
  //   console.log(req.user)
})

// router.post(
//   '/login',
//   validateUser,
//   passport.authenticate('local'),
//   async (req, res) => {
//     console.log('successfully logged in')
//     const {
//       comments,
//       likedComments,
//       posts,
//       likedPosts,
//       username,
//       id,
//     } = req.user
//     const user = {
//       comments,
//       likedComments,
//       posts,
//       likedPosts,
//       username,
//       id,
//     }
//     res.status(201).json(user)
//   }
// )

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (info) {
      return next({ message: info.message, status: 401 })
    }
    if (user) {
      req.logIn(user, err => {
        if (err) console.log(err)
        const {
          posts,
          likedPosts,
          comments,
          likedComments,
          id,
          username,
        } = req.user
        const user = {
          posts,
          likedPosts,
          comments,
          likedComments,
          _id: id,
          username,
        }
        res.status(201).json(user)
      })
    }
  })(req, res, next)
})

router.get('/logout', async (req, res) => {
  try {
    await req.logout()
    res.status(201).end()
  } catch (err) {
    res.status(500).json({ messgage: 'Something went wrong!' })
  }
})

module.exports = router
