import axios from 'axios'
import axiosCall from '../api/axiosCall'

const imageUploader = async (image, directory = 'main') => {
  const { data: isLoggedIn } = await axiosCall.get('/api/isloggedin')
  // check if user is logged in first by calling the server
  if (isLoggedIn) {
    if (image) {
      console.log('image found');
      console.log(image)
      // create formData for Cloudinary
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
      formData.append('folder', directory)
      try {
        console.log(0)
        console.log(process.env)
        console.log(process.env.REACT_APP_CLOUDINARY_URL)
        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        )
        console.log("???")
        return {
          url: res.data['secure_url'],
          id: res.data['public_id'],
          thumbnail: res.data['secure_url'].replace('/upload', '/upload/w_500'),
        }
      } catch (err) {
        console.log(err);
        return new Error({
          message: 'There was a problem uploading your image',
        })
      }
    } else {
      console.log("NO image found")
    }
    return {}
  }
  return {}
}

export default imageUploader
