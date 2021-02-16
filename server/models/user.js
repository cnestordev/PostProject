// const mongoose = require('mongoose')
// const Comment = require('./comment')
// const Post = require('./post')
// const Schema = mongoose.Schema

// const UserSchema = new Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     posts: {
//       type: [{ type: Schema.Types.ObjectId, required: true }],
//       required: true,
//     },
//     likedPosts: {
//       type: [{ type: Schema.Types.ObjectId, required: true }],
//       required: true,
//     },
//     comments: {
//       type: [{ type: Schema.Types.ObjectId, required: true }],
//       required: true,
//     },
//     likedComments: {
//       type: [{ type: Schema.Types.ObjectId, required: true }],
//       required: true,
//     },
//     isAdmin: Boolean,
//     avatar: String,
//     created: Number,
//   },
//   { minimize: false }
// )

// UserSchema.post('findOneAndDelete', async doc => {
//   if (doc) {
//     await Comment.deleteMany({
//       _id: {
//         $in: doc.comments,
//       },
//     })
//     await Post.deleteMany({
//       _id: {
//         $in: doc.posts,
//       },
//     })
//   }
// })

// module.exports = mongoose.model('User', UserSchema)
