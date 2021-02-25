import axios from 'axios'
import React, { useEffect } from 'react'
import axiosCall from '../api/axiosCall'

const Home = () => {
  useEffect(async () => {
    try {
      const res = await axiosCall.get('/', {
        withCredentials: true,
      })
      console.log(res.data)
    } catch (err) {
      console.log('hit ERROR on Home component')
      console.dir(err)
    }
  }, [])

  return <div>Home Page</div>
}

export default Home
