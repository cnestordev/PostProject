const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const { validateUser } = require('../middleware')
const {
  index,
  userData,
  isLoggedIn,
  register,
  logoutUser,
  loginUser,
} = require('../controllers/users')

router.get('/', index)

//route for development only
router.get('/user', userData)

router.get('/isloggedin', isLoggedIn)

router.post('/register', validateUser, register)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

module.exports = router
