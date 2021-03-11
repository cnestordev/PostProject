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
  toggleTheme,
} = require('../controllers/users')

const { body: check } = require('express-validator')

router.get('/', index)

//route for development only
router.get('/user', userData)

//  dev only
router.get('/isloggedin', isLoggedOn)

router.post(
  '/register',
  [check('username').trim().escape()],
  validateUser,
  register
)

router.post('/login', [check('username').trim().escape()], loginUser)

router.get('/logout', logoutUser)

router.post('/:userId/themeToggle/:theme', isLoggedIn, isUser, toggleTheme)

router.delete('/:userId/delete', isLoggedIn, isUser, deleteUser)

module.exports = router
