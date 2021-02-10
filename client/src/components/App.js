import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import axios from 'axios'
import Posts from './Posts'
import PostDetails from './PostDetails'
import CreatePost from './CreatePost'
import Test from './Test'
import EditPost from './EditPost'

function App() {
  // const [data, setData] = useState({})

  // useEffect(async () => {
  //   const res = await axios.get('http://localhost:3001')
  //   setData(res.data)
  // }, [])

  return (
    <Router>
      <Test />
      <Switch>
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/new" component={CreatePost} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route path="/posts/:id/edit" component={EditPost} />
      </Switch>
    </Router>
  )
}

export default App
