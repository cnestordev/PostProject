const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  title: String,
  author: String,
  authorId: String,
  timestamp: String,
  body: String,
  image: String,
  likes: [String],
  dislikes: [String],
  comments: [Object],
})

module.exports = mongoose.model('Post', PostSchema)
