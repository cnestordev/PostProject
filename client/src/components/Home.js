import axios from 'axios'
import React, { useEffect } from 'react'
import axiosCall from '../api/axiosCall'

const Home = () => {
  useEffect(async () => {
    try {
      const res = await axiosCall.get('/api/', {
        withCredentials: true,
      })
    } catch (err) {
      console.log('hit ERROR on Home component')
      console.dir(err)
    }
  }, [])

  return <section>Home Page</section>
}

export default Home
