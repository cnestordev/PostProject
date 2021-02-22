const express = require('express')
const router = express.Router()
const { addMetaData, validatePost, isAuthorized } = require('../middleware')
const Post = require('../models/post')
const { isLoggedIn } = require('../middleware')

router.get('/', async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'author',
    select: 'username -_id',
  })
  res.status(200).json({ data: posts })
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const post = await await Post.findById(id)
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'username -_id',
        },
      })
      // .populate({ path: 'author', select: 'username -_id' })
      .populate({ path: 'author', select: 'username -_id' })
    if (!post) {
      return next({ message: 'No Post Found', status: 404 })
    }
    console.log(post)
    res.status(200).json({ data: post })
  } catch (error) {
    console.log('ERROR!!!')
    return next({ message: 'Invalid URL', status: 400 })
  }
})

router.post(
  '/new',
  isLoggedIn,
  addMetaData,
  validatePost,
  async (req, res, next) => {
    try {
      const post = new Post(req.body)
      const result = await post.save()
      console.log('successfully posted')
      const postId = result['_id']
      res
        .status(201)
        .json({ message: 'post was successfully uploaded', postId })
    } catch (err) {
      console.log('There is a problem!')
      return next({ message: err.message, status: 500 })
    }
  }
)

router.get('/:id/edit', isLoggedIn, isAuthorized, async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.status(200).json({ data: post })
})

router.put(
  '/:id/edit',
  isLoggedIn,
  isAuthorized,
  validatePost,
  async (req, res, next) => {
    console.log('here')
    const { id } = req.params
    try {
      const response = await Post.findByIdAndUpdate(id, { ...req.body })
      console.log('successfully edited')
      res.status(201).json({ message: 'successfully updated post', id })
    } catch (err) {
      return next(err)
    }
  }
)

router.delete('/:id/delete', isLoggedIn, isAuthorized, async (req, res) => {
  const { id } = req.params
  console.log('deleting....')
  try {
    const response = await Post.findByIdAndDelete(id)
    console.log('deleted')
    res.status(201).json({ message: response })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

module.exports = router
