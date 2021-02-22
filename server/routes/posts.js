const express = require('express')
const router = express.Router()
const { addMetaData, validatePost, isAuthorized } = require('../middleware')
const Post = require('../models/post')
const { isLoggedIn } = require('../middleware')
const {
  index,
  getPostById,
  createNewPost,
  getPostFormById,
  editFormById,
  deletePostById,
} = require('../controllers/posts')

router.get('/', index)

router.get('/:id', getPostById)

router.post('/new', isLoggedIn, addMetaData, validatePost, createNewPost)

router.get('/:id/edit', isLoggedIn, isAuthorized, getPostFormById)

router.put('/:id/edit', isLoggedIn, isAuthorized, validatePost, editFormById)

router.delete('/:id/delete', isLoggedIn, isAuthorized, deletePostById)

module.exports = router
