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
  likePost,
  dislikePost,
} = require('../controllers/posts')
const mongoose = require('mongoose')

router.get('/', index)

router.get('/:id', getPostById)

router.post('/new', isLoggedIn, addMetaData, validatePost, createNewPost)

router.get('/:id/edit', isLoggedIn, isAuthorized, getPostFormById)

router.put('/:id/edit', isLoggedIn, isAuthorized, validatePost, editFormById)

router.delete('/:id/delete', isLoggedIn, isAuthorized, deletePostById)

router.post('/:id/like', isLoggedIn, likePost)

router.post('/:id/dislike', isLoggedIn, dislikePost)

module.exports = router
