import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../cssReset.css'
import '../styles.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import axios from 'axios'
import Posts from './Posts'
import PostDetails from './PostDetails'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import NavigationBar from './NavigationBar'

function App() {
  // const [data, setData] = useState({})

  // useEffect(async () => {
  //   const res = await axios.get('http://localhost:3001')
  //   setData(res.data)
  // }, [])

  return (
    <Router>
      <NavigationBar />
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
