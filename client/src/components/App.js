import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})

  useEffect(async () => {
    const res = await axios.get('http://localhost:3001')
    setData(res.data)
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home Page</h1>
      </header>
    </div>
  )
}

export default App
