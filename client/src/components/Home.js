import axios from 'axios'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(async () => {
    try {
      const res = await axios.get('http://localhost:3001', {
        withCredentials: true,
      })
      console.log('home component ajax successful')
      console.log(res.data)
    } catch (err) {
      console.log('hit ERROR on Home component')
      console.dir(err)
    }
  }, [])

  return <div>Home Page</div>
}

export default Home
