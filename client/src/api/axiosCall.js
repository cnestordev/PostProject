import axios from 'axios'

// macUrl
const macUrl = 'http://192.168.1.14:3001'
const localUrl = 'http://localhost:3001'
const herokuUrl = 'https://memeit-backend.herokuapp.com'

const axiosCall = axios.create({
  baseURL: herokuUrl,
  withCredentials: true,
})

export default axiosCall
