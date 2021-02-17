const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')

router.get('/register', async (req, res) => {
  res.send('working')
})

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username })
    const newUser = await User.register(user, password)
    console.log('successfully registered user')
    res.status(201).json({ message: 'successfully created user', status: 201 })
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

router.post('/login', passport.authenticate('local'), async (req, res) => {
  console.log('successfully logged in')
  const { comments, likedComments, posts, likedPosts, username, id } = req.user
  const user = {
    comments,
    likedComments,
    posts,
    likedPosts,
    username,
    id,
  }
  res.status(201).json(user)
})

module.exports = router
