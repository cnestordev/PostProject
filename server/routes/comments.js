const express = require('express')
const router = express.Router({ mergeParams: true })
const { addTimestamp, validateComment } = require('../middleware')
const Post = require('../models/post')
const Comment = require('../models/comment')

router.post('/', addTimestamp, validateComment, async (req, res) => {
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
      .populate('comments')
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
})

router.delete('/:commentId/', async (req, res) => {
  const { id, commentId } = req.params
  try {
    await Post.findByIdAndUpdate(id, { $pull: { comments: commentId } })
    await Comment.findByIdAndDelete(commentId)
    res.status(201).json({ message: 'deleted comment', status: 201 })
  } catch (err) {
    res.status(500).json({ message: 'could not delete', status: 500 })
  }
})

module.exports = router
