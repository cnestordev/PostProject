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
import Error404 from './Error404'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'

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
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/new" component={CreatePost} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <Route path="/posts/:id/edit" component={EditPost} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  )
}

export default App
