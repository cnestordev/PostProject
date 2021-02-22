const express = require('express')
const router = express.Router({ mergeParams: true })
const {
  addMetaData,
  validateComment,
  isLoggedIn,
  commentAuthor,
} = require('../middleware')

const { index, deleteComment } = require('../controllers/comments')

router.post('/', isLoggedIn, addMetaData, validateComment, index)

router.delete('/:commentId/', isLoggedIn, commentAuthor, deleteComment)

module.exports = router
