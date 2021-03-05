import axios from 'axios'
import axiosCall from '../api/axiosCall'

const imageUploader = async (image, directory = 'main') => {
  const { data: isLoggedIn } = await axiosCall.get('/isloggedin')
  if (isLoggedIn) {
    if (image) {
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
      formData.append('folder', directory)
      try {
        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        )
        return {
          url: res.data['secure_url'],
          id: res.data['public_id'],
          thumbnail: res.data['secure_url'].replace('/upload', '/upload/w_350'),
        }
      } catch (err) {
        console.log('CATTCH')
        return new Error({
          message: 'There was a problem uploading your image',
        })
      }
    }
    console.log('NO image has been entered')
    return {}
  }
  return {}
}

export default imageUploader
