const Post = require('../models/post')
const User = require('../models/user')
const mongoose = require('mongoose')
const cloudinary = require('../cloudinary')

const index = async (req, res) => {
  const posts = await Post.find({}).populate({
    path: 'author',
    select: 'username -_id',
  })
  res.status(200).json({ data: posts })
}

const getPostById = async (req, res, next) => {
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
    res.status(200).json({ data: post })
  } catch (error) {
    console.log('ERROR!!!')
    return next({ message: 'Invalid URL', status: 400 })
  }
}

const createNewPost = async (req, res, next) => {
  // add post to Post schema
  try {
    const post = new Post(req.body)
    const result = await post.save()
    // console.log(result._id)
    // console.log('successfully posted')
    const postId = result._id
    // add post reference to the User schema
    try {
      const user = await User.findById(req.user._id)
      user.posts.push(result._id)
      await user.save()
    } catch (err) {
      console.log('woops!')
      console.log(err)
      return next({ message: err.message, status: 500 })
    }
    res
      .status(201)
      .json({ message: 'post was successfully uploaded', postId, status: 201 })
  } catch (err) {
    console.log('There is a problem!')
    return next({ message: err.message, status: 500 })
  }
}

const getPostFormById = async (req, res) => {
  const { id } = req.params
  const post = await Post.findById(id)
  res.status(200).json({ data: post })
}

const editFormById = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await Post.findByIdAndUpdate(id, { ...req.body })
    res.status(201).json({ message: 'successfully updated post', id })
  } catch (err) {
    return next(err)
  }
}

const deletePostById = async (req, res) => {
  const { id } = req.params
  try {
    const response = await Post.findByIdAndDelete(id)
    const imgageId = response.image.id
    try {
      await cloudinary.uploader.destroy(imgageId)
    } catch (err) {}
    res.status(201).json({ message: response })
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

const likePost = async (req, res, next) => {
  const postId = req.params.id
  const userId = req.user._id

  // find post by id
  const post = await Post.findById(postId)

  const userObjectId = mongoose.Types.ObjectId(userId)

  // 1. If user has disliked, remove it
  if (post.dislikes.includes(userObjectId)) {
    const updatedDislikes = post.dislikes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    post.set('dislikes', updatedDislikes)
    post.markModified('dislikes')
    await post.save()
  }

  // 2. If user hasn't liked, it likes.
  if (!post.likes.includes(userObjectId)) {
    try {
      post.likes.push(userId)
      const result = await post.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: true,
        disliked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 3. If user has already liked, it unlikes
  if (post.likes.includes(userObjectId)) {
    try {
      const updatedLikes = post.likes.filter(obj => {
        return obj.toString() !== userId.toString()
      })
      post.set('likes', updatedLikes)
      post.markModified('likes')
      const result = await post.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: false,
        disliked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
}

const dislikePost = async (req, res, next) => {
  const postId = req.params.id
  const userId = req.user._id

  // find post by id
  const post = await Post.findById(postId)

  const userObjectId = mongoose.Types.ObjectId(userId)

  // 0. If user has liked, remove like
  if (post.likes.includes(userObjectId)) {
    const updatedLikes = post.likes.filter(obj => {
      return obj.toString() !== userId.toString()
    })
    post.set('likes', updatedLikes)
    post.markModified('likes')
    await post.save()
  }

  // 1. If user hasn't disliked, it dislikes.
  if (!post.dislikes.includes(userObjectId)) {
    try {
      post.dislikes.push(userId)
      const result = await post.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        liked: false,
        disliked: true,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }

  // 2. If user has already disliked, it dislikes
  if (post.dislikes.includes(userObjectId)) {
    try {
      const updatedDisikes = post.dislikes.filter(obj => {
        return obj.toString() !== userId.toString()
      })
      post.set('dislikes', updatedDisikes)
      post.markModified('dislikes')
      const result = await post.save()
      const metrics = {
        likes: result.likes.length,
        dislikes: result.dislikes.length,
        disliked: false,
        liked: false,
      }
      return res.status(201).json({ message: metrics, status: 201 })
    } catch (err) {
      return next({ message: err.message, status: 500 })
    }
  }
}

const deleteImage = async (req, res, next) => {
  // post id
  const { id } = req.params
  const image = `main/${req.params.imageId}`
  try {
    const results = await cloudinary.uploader.destroy(image)
    const post = await Post.findByIdAndUpdate(id, { image: {} }, { new: true })
    return res.status(201).end()
  } catch (err) {
    return next({ message: err.message, status: 500 })
  }
}

const searchPost = async (req, res, next) => {
  const { query } = req.params
  const searchKey = new RegExp(query, 'i')
  try {
    Post.find({ title: searchKey }, function (err, doc) {
      if (err) return next({ message: err.message, status: 500 })
      if (!doc) return next({ message: err.message, status: 404 })
      if (doc) return res.status(201).json({ message: doc, status: 201 })
    }).populate({
      path: 'author',
      select: 'username -_id',
    })
  } catch (err) {
    return next({ message: 'Something went wrong!', status: 500 })
  }
}

const getUsersPosts = async (req, res, next) => {
  try {
    const response = await Post.find({ authorId: req.user._id })
    res.status(201).json({ message: response, status: 201 })
  } catch (err) {
    return next({ message: err.message, status: 500 })
  }
}

module.exports = {
  index,
  getPostById,
  createNewPost,
  getPostFormById,
  editFormById,
  deletePostById,
  likePost,
  dislikePost,
  deleteImage,
  searchPost,
  getUsersPosts,
}
