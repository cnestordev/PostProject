import axios from 'axios'
import axiosCall from '../api/axiosCall'

const imageUploader = async (image, directory = 'main') => {
  const { data: isLoggedIn } = await axiosCall.get('/isloggedin')
  // check if user is logged in first by calling the server
  if (isLoggedIn) {
    if (image) {
      // create formData for Cloudinary
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
          thumbnail: res.data['secure_url'].replace('/upload', '/upload/w_500'),
        }
      } catch (err) {
        return new Error({
          message: 'There was a problem uploading your image',
        })
      }
    }
    return {}
  }
  return {}
}

export default imageUploader
