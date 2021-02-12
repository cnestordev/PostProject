const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: {
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
  body: String,
  image: String,
  likes: { type: [String], required: true },
  dislikes: { type: [String], required: true },
  comments: { type: [Object], required: true },
  tags: String,
  editCount: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('Post', PostSchema)
