import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from 'axios'
import Posts from './Posts'
import PostDetails from './PostDetails'

function App() {
  const [data, setData] = useState({})

  useEffect(async () => {
    const res = await axios.get('http://localhost:3001')
    setData(res.data)
  }, [])

  return (
    <Router>
      <Route exact path="/posts" component={Posts} />
      <Route path="/posts/:id" component={PostDetails} />
    </Router>
  )
}

export default App
