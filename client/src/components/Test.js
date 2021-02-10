import React from 'react'
import axios from 'axios'

const Test = () => {
  let data = ''

  const handleChange = e => {
    console.log(e.target.files[0])
    data = e.target.files[0]
  }

  const handleSend = async e => {
    const formData = new FormData()
    formData.append('file', data)
    formData.append('upload_preset', 'fkathmv7')
    e.preventDefault()
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/ddnwhl52j/image/upload',
        formData
      )
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <input onChange={handleChange} type="file" name="image" />
      <button onClick={handleSend}>Send</button>
      <button
        onClick={() => {
          console.log(data)
        }}
      >
        Log
      </button>
    </div>
  )
}

export default Test
