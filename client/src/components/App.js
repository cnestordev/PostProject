import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Posts from './Posts'

function App() {
  const [data, setData] = useState({})

  useEffect(async () => {
    const res = await axios.get('http://localhost:3001')
    setData(res.data)
  })

  return (
    <div className="App">
      <Posts />
    </div>
  )
}

export default App
