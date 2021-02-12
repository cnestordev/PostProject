import axios from 'axios'

const imageUploader = async image => {
  if (image) {
    console.log('image has been entered')
    console.log('image function has started')
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
    try {
      const res = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        formData
      )
      console.log(res.data['secure_url'])
      console.log('image function is now returning')
      return res.data['secure_url']
    } catch (err) {
      return new Error({ message: 'There was a problem uploading your image' })
    }
  }
  console.log('NO image has been entered')
  return ''
}

export default imageUploader
