const express = require('express')
const router = express.Router({ mergeParams: true })
const {
  addMetaData,
  validateComment,
  isLoggedIn,
  commentAuthor,
} = require('../middleware')

const {
  index,
  deleteComment,
  likeComment,
  dislikeComment,
} = require('../controllers/comments')

// create a comment
router.post('/', isLoggedIn, addMetaData, validateComment, index)

// delete a comment
router.delete('/:commentId/', isLoggedIn, commentAuthor, deleteComment)

// like a comment
router.post('/:commentId/like', isLoggedIn, likeComment)

// dislike a comment
router.post('/:commentId/dislike', isLoggedIn, dislikeComment)

module.exports = router
