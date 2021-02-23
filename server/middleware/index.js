const Post = require('../models/post')
const Comment = require('../models/comment')

const {
  postSchema,
  commentSchema,
  userSchema,
} = require('../validation/postValidation')

const addMetaData = (req, res, next) => {
  req.body.timestamp = Math.round(new Date().getTime() / 1000)
  req.body.author = req.user.id
  req.body.authorId = req.user.id
  next()
}

const validatePost = (req, res, next) => {
  const validation = postSchema.validate(req.body)
  if (validation.error) {
    // console.log('-----------------------------')
    // console.log(validation.error.details[0].message)
    return next({ message: validation.error.details[0].message, status: 400 })
  }
  next()
}

const validateComment = (req, res, next) => {
  const validation = commentSchema.validate(req.body)
  if (validation.error) {
    // console.log('-----------------------------')
    // console.log(validation.error.details[0].message)
    return next({ message: validation.error.details[0].message, status: 400 })
  }
  next()
}

const validateUser = (req, res, next) => {
  const validation = userSchema.validate(req.body)
  if (validation.error) {
    return next({ message: validation.error.details[0].message, status: 400 })
  }
  next()
}

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next({ message: 'You must be logged in to do that', status: 401 })
  }
  next()
}

const isAuthorized = async (req, res, next) => {
  const { id } = req.params
  const post = await Post.findById(id)
  if (String(post.authorId) !== String(req.user._id)) {
    return next({
      message: 'Only the owner of this post can modify it',
      status: 401,
    })
  }
  return next()
}

const commentAuthor = async (req, res, next) => {
  console.log('%c hitting is comment auth', 'color: red;')
  const { commentId } = req.params
  try {
    const comment = await Comment.findById(commentId)
    if (String(comment.authorId) !== String(req.user._id)) {
      return next({
        message: 'Only the owner of this post can modify it',
        status: 401,
      })
    }
    return next()
  } catch (err) {
    return next({ message: err.message, status: 500 })
  }
}

const isUser = async (req, res, next) => {
  const { userId } = req.params
  if (userId !== String(req.user._id)) {
    return next({ message: 'You are not authorized to do that!', status: 401 })
  }
  return next()
}

module.exports = {
  addMetaData,
  validatePost,
  validateComment,
  isLoggedIn,
  validateUser,
  isAuthorized,
  commentAuthor,
  isUser,
}
