import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Loader from 'react-loader-spinner'

const EditPost = props => {
  const id = props.match.params.id

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

  const [sending, setSending] = useState(false)

  useEffect(async () => {
    const response = await axios.get(`http://localhost:3001/posts/${id}/edit`)
    console.log(response.data.data)
    const { data } = response.data
    setData({
      title: data.title,
      timestamp: data.timestamp,
      tags: data.tags,
      image: data.image,
      body: data.body,
      authorId: 'predetermined',
      _id: data['_id'],
    })
  }, [])

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
      setData({
        ...data,
        image: res.data.secure_url,
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await axios.put(
      `http://localhost:3001/posts/${id}/edit`,
      data
    )
    console.log(response)
  }

  const handleDelete = async id => {
    console.log(id)
    const response = await axios.delete(
      `http://localhost:3001/posts/${id}/delete`
    )
    console.log(response)
  }

  return (
    <div className="editFormContainer">
      <h1 className="editHeader">Edit Form</h1>
      <form className="editFormElement" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="title"
          placeholder="Title"
          value={data.title}
          className="editInputText"
        />
        <textarea
          className="editTextarea"
          onChange={handleChange}
          name="body"
          value={data.body}
        />
        <input
          className="editFile"
          type="file"
          name="image"
          onChange={handleImage}
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="tags"
          name="tags"
          value={data.tags}
          className="editInputText"
        />
        <button className="createPostBtn" disabled={loading}>
          {sending ? (
            <Loader
              type="ThreeDots"
              color="c3c3c3"
              height={11}
              width={100}
              timeout={5000} //3 secs
            />
          ) : (
            'Update'
          )}
        </button>
      </form>
      <button onClick={() => handleDelete(data['_id'])}>DELETE</button>
    </div>
  )
}

export default EditPost
