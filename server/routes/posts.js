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

  // 0. If user has disliked, remove it
  if (post.dislikes.includes(userObjectId)) {
    const updatedDislikes = post.dislikes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    post.set('dislikes', updatedDislikes)
    post.markModified('dislikes')
    await post.save()
    console.log('removed dislike')
  }

  // 1. If user hasn't liked, it likes.
  if (!post.likes.includes(userObjectId)) {
    try {
      post.likes.push(userId)
      const result = await post.save()
      console.log('user liked the post!!')
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
      }
      return res.status(201).json({ message: metrics, status: 201 })
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
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
      }
      return res.status(201).json({ message: metrics, status: 201 })
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

  // 0. If user has liked, remove like
  if (post.likes.includes(userObjectId)) {
    const updatedLikes = post.likes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    post.set('likes', updatedLikes)
    post.markModified('likes')
    await post.save()
    console.log('removed like')
  }

  // 1. If user hasn't disliked, it dislikes.
  if (!post.dislikes.includes(userObjectId)) {
    try {
      post.dislikes.push(userId)
      const result = await post.save()
      console.log('user disliked the post!!')
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
      }
      return res.status(201).json({ message: metrics, status: 201 })
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
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
})

module.exports = router
