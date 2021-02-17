const { postSchema, commentSchema } = require('../validation/postValidation')

const addTimestamp = (req, res, next) => {
  req.body.timestamp = Math.round(new Date().getTime() / 1000)
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

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).end()
  }
  next()
}

module.exports = {
  addTimestamp,
  validatePost,
  validateComment,
  isLoggedIn,
}
