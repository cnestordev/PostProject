const mongoose = require('mongoose')
const Comment = require('./comment')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
      thumbnail: String,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
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

PostSchema.post('findOneAndDelete', async doc => {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    })
  }
})

module.exports = mongoose.model('Post', PostSchema)
