const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Comment = require('./comment')
const Post = require('./post')
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    posts: [{ type: Schema.Types.ObjectId, required: true }],
    likedPosts: [{ type: Schema.Types.ObjectId, required: true }],
    comments: [{ type: Schema.Types.ObjectId, required: true }],
    likedComments: [{ type: Schema.Types.ObjectId, required: true }],
    isAdmin: Boolean,
    avatar: String,
    created: Number,
    darkMode: Boolean,
  },
  { minimize: false }
)

UserSchema.plugin(passportLocalMongoose)

UserSchema.post('findOneAndDelete', async doc => {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    })
    await Post.deleteMany({
      _id: {
        $in: doc.posts,
      },
    })
  }
})

module.exports = mongoose.model('User', UserSchema)
