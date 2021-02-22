const Post = require('../models/post')
const Comment = require('../models/comment')

const index = async (req, res) => {
  const { id } = req.params
  const { body, author, authorId, timestamp } = req.body
  try {
    const post = await Post.findById(id)
    const comment = new Comment({
      body,
      author,
      authorId,
      timestamp,
      likes: [],
      dislikes: [],
    })
    post.comments.push(comment)
    await comment.save()
    const updatedPost = await (await post.save())
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username -_id',
        },
      })
      .execPopulate()
    res.status(201).json({
      data: updatedPost,
      message: 'successfully added comment',
      status: 201,
    })
  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Post Not Found', status: 404 })
  }
}

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params
  try {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { comments: commentId },
    })
    await Comment.findByIdAndDelete(commentId)
    res.status(201).json({ data: result, status: 201 })
  } catch (err) {
    res.status(500).json({ message: 'could not delete', status: 500 })
  }
}

module.exports = {
  index,
  deleteComment,
}
