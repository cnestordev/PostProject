const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const { validateUser, isUser, isLoggedIn } = require('../middleware')
const {
  index,
  userData,
  isLoggedOn,
  register,
  logoutUser,
  loginUser,
  deleteUser,
} = require('../controllers/users')

router.get('/', index)

//route for development only
router.get('/user', userData)

//  dev only
router.get('/isloggedin', isLoggedOn)

router.post('/register', validateUser, register)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.delete('/:userId/delete', isLoggedIn, isUser, deleteUser)

module.exports = router
