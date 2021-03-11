import axios from 'axios'

const axiosCall = axios.create({
  baseURL: '/',
  withCredentials: true,
})

export default axiosCall
