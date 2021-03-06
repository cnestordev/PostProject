const Post = require('../models/post')
const Comment = require('../models/comment')
const User = require('../models/user')
const mongoose = require('mongoose')

const index = async (req, res) => {
  const { id } = req.params
  const { body, author, authorId, timestamp } = req.body
  // add comment to Post Schema
  try {
    const post = await Post.findById(id)
    const comment = new Comment({
      body,
      author,
      authorId,
      timestamp,
      originated: post._id,
      likes: [],
      dislikes: [],
    })
    post.comments.push(comment)
    const savedComment = await comment.save()
    const updatedPost = await (await post.save())
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username -_id',
        },
      })
      .execPopulate()
    // add comment to User Schema
    try {
      const user = await User.findById(req.user._id)
      user.comments.push(savedComment._id)
      await user.save()
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
    res.status(201).json({
      data: updatedPost,
      message: 'successfully added comment',
      status: 201,
    })
  } catch (err) {
    res.status(404).json({ message: 'Post Not Found', status: 404 })
  }
}

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { comments: commentId },
    })
    await Comment.findByIdAndDelete(commentId)
    res.status(201).json({ data: result, status: 201 })
  } catch (err) {
    res.status(500).json({ message: 'could not delete', status: 500 })
  }
}

const likeComment = async (req, res, next) => {
  const commentId = mongoose.Types.ObjectId(req.params.commentId)
  const userId = req.user._id

  const comment = await Comment.findById(commentId)

  // 1. If user has disliked, remove it
  if (comment.dislikes.includes(userId)) {
    const updatedDislikes = comment.dislikes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    comment.set('dislikes', updatedDislikes)
    comment.markModified('dislikes')
    await comment.save()
  }

  // 2. If user hasn't liked, it likes
  if (!comment.likes.includes(userId)) {
    try {
      comment.likes.push(userId)
      const result = await comment.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: true,
        disliked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 3. If user has already liked, it unlikes
  if (comment.likes.includes(userId)) {
    try {
      const updatedLikes = comment.likes.filter(obj => {
        return obj.toString() !== userId.toString()
      })
      comment.set('likes', updatedLikes)
      comment.markModified('likes')
      const result = await comment.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: false,
        disliked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
}

const dislikeComment = async (req, res, next) => {
  const commentId = mongoose.Types.ObjectId(req.params.commentId)
  const userId = req.user._id

  // find post by id
  const comment = await Comment.findById(commentId)

  // 0. If user has liked, remove like
  if (comment.likes.includes(userId)) {
    const updatedLikes = comment.likes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    comment.set('likes', updatedLikes)
    comment.markModified('likes')
    await comment.save()
  }

  // 1. If user hasn't disliked, it dislikes.
  if (!comment.dislikes.includes(userId)) {
    try {
      comment.dislikes.push(userId)
      const result = await comment.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: false,
        disliked: true,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 2. If user has already disliked, it dislikes
  if (comment.dislikes.includes(userId)) {
    try {
      const updatedDisikes = comment.dislikes.filter(obj => {
        return obj.toString() !== userId.toString()
      })
      comment.set('dislikes', updatedDisikes)
      comment.markModified('dislikes')
      const result = await comment.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        disliked: false,
        liked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
}

const getUsersComments = async (req, res, next) => {
  try {
    const response = await Comment.find({ authorId: req.user._id })
    res.status(201).json({ message: response, status: 500 })
  } catch (err) {
    return next({ message: err.message, status: 500 })
  }
}

module.exports = {
  index,
  deleteComment,
  likeComment,
  dislikeComment,
  getUsersComments,
}
