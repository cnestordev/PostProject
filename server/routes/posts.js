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
const mongoose = require('mongoose')

router.get('/', index)

router.get('/:id', getPostById)

router.post('/new', isLoggedIn, addMetaData, validatePost, createNewPost)

router.get('/:id/edit', isLoggedIn, isAuthorized, getPostFormById)

router.put('/:id/edit', isLoggedIn, isAuthorized, validatePost, editFormById)

router.delete('/:id/delete', isLoggedIn, isAuthorized, deletePostById)

router.post('/:id/like', isLoggedIn, async (req, res, next) => {
  const postId = req.params.id
  const userId = req.user._id

  // find post by id
  const post = await Post.findById(postId)

  const userObjectId = mongoose.Types.ObjectId(userId)

  // 1. If user hasn't liked, it likes.
  if (!post.likes.includes(userObjectId)) {
    try {
      post.likes.push(userId)
      await post.save()
      console.log('user liked the post!!')
      return res.status(201).json({ message: 1, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 2. If user has already liked, it unlikes
  if (post.likes.includes(userObjectId)) {
    try {
      const updatedLikes = post.likes.filter(obj => {
        console.log(obj.toString() === userId.toString())
        return obj.toString() !== userId.toString()
      })
      post.set('likes', updatedLikes)
      post.markModified('likes')
      const result = await post.save()
      return res.status(201).json({ message: -1, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
})

router.post('/:id/dislike', isLoggedIn, async (req, res, next) => {
  console.log('dislike route hit')
  const postId = req.params.id
  const userId = req.user._id

  // find post by id
  const post = await Post.findById(postId)

  const userObjectId = mongoose.Types.ObjectId(userId)

  // 1. If user hasn't disliked, it dislikes.
  if (!post.dislikes.includes(userObjectId)) {
    try {
      post.dislikes.push(userId)
      const result = await post.save()
      console.log('user disliked the post!!')
      return res
        .status(201)
        .json({ message: result.dislikes.length, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 2. If user has already disliked, it dislikes
  if (post.dislikes.includes(userObjectId)) {
    try {
      const updatedDisikes = post.dislikes.filter(obj => {
        return obj.toString() !== userId.toString()
      })
      post.set('dislikes', updatedDisikes)
      post.markModified('dislikes')
      const result = await post.save()
      return res
        .status(201)
        .json({ message: result.dislikes.length, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
})

module.exports = router
