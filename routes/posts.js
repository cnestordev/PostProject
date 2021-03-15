const express = require('express')
const router = express.Router()
const {
  isLoggedIn,
  isAuthOrAdmin,
  addMetaData,
  validatePost,
  isAuthorized,
  isUser,
  isAdmin,
} = require('../middleware')
const Post = require('../models/post')
const {
  index,
  getPostById,
  createNewPost,
  getPostFormById,
  editFormById,
  deletePostById,
  likePost,
  dislikePost,
  deleteImage,
  searchPost,
  getUsersPosts,
  seedPosts,
} = require('../controllers/posts')

const cloudinary = require('../cloudinary')

const { body: check } = require('express-validator')

router.get('/', index)

router.get('/search/:query', searchPost)

router.get('/:id', getPostById)

router.post(
  '/new',
  isLoggedIn,
  [check('body').escape().trim(), check('title').trim().escape()],
  addMetaData,
  validatePost,
  createNewPost
)

router.get('/:id/edit', isLoggedIn, isAuthorized, getPostFormById)

router.put(
  '/:id/edit',
  isLoggedIn,
  [check('body').escape().trim(), check('title').trim().escape()],
  isAuthorized,
  validatePost,
  editFormById
)

router.delete('/:id/delete', isLoggedIn, isAuthOrAdmin, deletePostById)

router.post('/:id/like', isLoggedIn, likePost)

router.post('/:id/dislike', isLoggedIn, dislikePost)

router.delete('/:id/main/:imageId', deleteImage)

router.get('/all/:userId', isLoggedIn, isUser, getUsersPosts)

router.get('/admin/moderation/:domain', isLoggedIn, isAdmin, seedPosts)

module.exports = router
