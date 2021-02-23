const User = require('../models/user')
const passport = require('passport')

const index = (req, res) => {
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
}

// route for devlopment only
const userData = async (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user)
  }
}

// route for dev only
const isLoggedOn = (req, res) => {
  console.log('is logged in route')
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.send(false)
  }
}

const register = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = new User({ username })
    const newUser = await User.register(user, password)
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
}

const logoutUser = async (req, res) => {
  try {
    await req.logout()
    res.status(201).end()
  } catch (err) {
    res.status(500).json({ messgage: 'Something went wrong!' })
  }
}

const loginUser = (req, res, next) => {
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
}

const deleteUser = async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.user._id)
    res.status(201).json({ message: response, status: 201 })
  } catch (err) {
    return next({ message: err.message, status: 500 })
  }
}

module.exports = {
  index,
  userData,
  isLoggedOn,
  register,
  logoutUser,
  loginUser,
  deleteUser,
}
