import axios from 'axios'
import axiosCall from '../api/axiosCall'

const imageUploader = async (image, directory = 'main') => {
  const { data: isLoggedIn } = await axiosCall.get('/isloggedin')
  console.log('you are logged in ', isLoggedIn)
  if (isLoggedIn) {
    console.log('entering image uploader, image is ')
    console.log(image)
    if (image) {
      console.log('if statement')
      console.log('image has been entered')
      console.log('image function has started')
      const formData = new FormData()
      formData.append('file', image)
      formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_NAME)
      formData.append('folder', directory)
      try {
        console.log('TRY')
        const res = await axios.post(
          process.env.REACT_APP_CLOUDINARY_URL,
          formData
        )
        console.log(res)
        console.log(res.data['secure_url'])
        console.log('image function is now returning')
        return { url: res.data['secure_url'], id: res.data['public_id'] }
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
