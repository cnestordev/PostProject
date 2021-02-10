import React, { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
  console.log(process.env.REACT_APP_CLOUDINARY_URL)
  console.log(process.env.REACT_APP_CLOUDINARY_NAME)

  const [data, setData] = useState({
    title: '',
    author: 'predefined',
    authorId: 'predefined',
    timestamp: Math.round(new Date().getTime() / 1000),
    body: '',
    image: '',
    tags: [],
    likes: [],
    dislikes: [],
    comments: [],
  })

  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value,
    })
  }

  const handleImage = async e => {
    e.preventDefault()
    setLoading(true)
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
    try {
      const res = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        formData
      )
      console.log(res)
      setData({
        ...data,
        image: res.data.url,
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3001/posts/new', data)
    console.log(response)
  }

  return (
    <div className="createForm">
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
        />
        <textarea onChange={handleChange} name="body" />
        <input type="file" name="image" onChange={handleImage} />
        <input
          onChange={handleChange}
          type="text"
          placeholder="tags"
          name="tags"
        />
        <button disabled={loading}>Create</button>
      </form>
    </div>
  )
}

export default CreatePost
