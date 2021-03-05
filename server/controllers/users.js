const User = require('../models/user')
const passport = require('passport')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const words = require('naughty-words')

const index = (req, res) => {
  // console.log('hit root route')
  // console.log(req.headers.host)
  // console.log(req.isAuthenticated())
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
  if (req.isAuthenticated()) {
    res.send(true)
  } else {
    res.send(false)
  }
}

const register = async (req, res, next) => {
  const { username, password, email } = req.body

  for (const property in words) {
    if (words[property].includes(username)) {
      console.log('FOUND')
      return next({ message: 'That username is not allowed', status: 500 })
    }
  }

  try {
    const user = new User({ username, email })
    const newUser = await User.register(user, password)
    await req.login(newUser, err => {
      if (err) return next(err)
      const userData = {
        email: user.email,
        username: user.username,
        _id: user.id,
        posts: user.posts,
        likedPosts: user.likedPosts,
        comments: user.comments,
        likedComments: user.likedComments,
        isAdmin: user.isAdmin,
        darkMode: user.darkMode,
      }
      if (userData.email) {
        console.log('sending email')
        const msg = {
          to: userData.email, // Change to your recipient
          from: 'nestor@nestordev.com', // Change to your verified sender
          subject: 'Thanks for visiting!',
          text: `Hello, ${userData.username}! Thank you for visiting one of my applications!  Feel free to respond to this email, if you have any further questions.`,
          html: `<p>Hello, ${userData.username}, Thank you for visiting one of my applications.  Feel free to respond to this email, if you have any questions.</p>`,
        }
        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent')
          })
          .catch(error => {
            console.error(error)
          })
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
          _id,
          username,
          isAdmin,
          darkMode,
        } = req.user
        const user = {
          posts,
          likedPosts,
          comments,
          likedComments,
          _id: _id,
          username,
          isAdmin,
          darkMode,
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

const toggleTheme = async (req, res, next) => {
  // theme is a boolean value
  const { userId, theme } = req.params
  try {
    const response = await User.findByIdAndUpdate(
      userId,
      { darkMode: theme },
      { new: true }
    )
    return res.status(200).json({ message: response, status: 200 })
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
  toggleTheme,
}
