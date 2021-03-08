import axios from 'axios'

// macbook url
const macUrl = 'http://192.168.1.14:3001'
const localUrl = 'http://localhost:3001'
const backendUrl = 'https://memeit-backend.herokuapp.com'

const axiosCall = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
})

export default axiosCall
