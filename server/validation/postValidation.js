const Joi = require('joi')

module.exports.postSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().allow(''),
  image: Joi.object().allow(),
  tags: Joi.string().required(),
  author: Joi.string().required(),
  authorId: Joi.string().required(),
  timestamp: Joi.number().required(),
  likes: Joi.array().allow(),
  dislikes: Joi.array().allow(),
  comments: Joi.array(),
  _id: Joi.allow(),
  editCount: Joi.allow(),
})

module.exports.commentSchema = Joi.object({
  body: Joi.string().required(),
  author: Joi.string().required(),
  authorId: Joi.string().required(),
  timestamp: Joi.number().required(),
  likes: Joi.array().allow(),
  dislikes: Joi.array().allow(),
  _id: Joi.allow(),
})

module.exports.userSchema = Joi.object({
  username: Joi.string().required().min(3).max(15),
  password: Joi.string().required().min(3).max(15),
  email: Joi.allow(),
})
