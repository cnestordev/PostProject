const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      required: true,
    },
    dislikes: {
      type: [String],
      required: true,
    },
  },
  { minimize: false }
)

module.exports = mongoose.model('Comment', commentSchema)
