import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import '../cssReset.css'
import '../styles.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import RestrictedRoute from './RestrictedRoute'
import PrivateRoute from './PrivateRoute'
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
import Account from './Account'

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <RestrictedRoute path="/register" component={Register} />
        <RestrictedRoute path="/login" component={Login} />
        <PrivateRoute path="/logout" component={Logout} />
        <Route exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/new" component={CreatePost} />
        <Route exact path="/posts/:id" component={PostDetails} />
        <PrivateRoute path="/posts/:id/edit" component={EditPost} />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  )
}

export default App
