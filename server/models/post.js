const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
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
    image: {
      id: String,
      url: String,
    },
    likes: [{ type: Schema.Types.ObjectId, required: true }],
    dislikes: [{ type: Schema.Types.ObjectId, required: true }],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: true,
      },
    ],
    tags: String,
    editCount: {
      type: Number,
      default: 0,
    },
  },
  { minimize: false }
)

module.exports = mongoose.model('Post', PostSchema)
