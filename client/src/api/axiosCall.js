import axios from 'axios'

// macbook url
const macUrl = 'http://192.168.1.14:3001'
const localUrl = 'http://localhost:3001'

const axiosCall = axios.create({
  baseURL: macUrl,
  withCredentials: true,
})

export default axiosCall