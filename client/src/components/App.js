import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import '../cssReset.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import axiosCall from '../api/axiosCall'

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

const App = ({ user }) => {
  const [theme, setTheme] = useState(user.darkMode)

  const handleThemeToggle = async theme => {
    try {
      const response = await axiosCall.post(`/${user._id}/themeToggle/${theme}`)
      const val = response.data.message.darkMode
      setTheme(val)
      document.body.style.backgroundColor = val ? '#0e141b' : 'ghostwhite'
    } catch (err) {
      console.dir(err)
    }
  }

  useEffect(() => {
    console.log('usefft')
    setTheme(user.darkMode)
    document.body.style.backgroundColor = user.darkMode
      ? '#0e141b'
      : 'ghostwhite'
  }, [user])

  return (
    <Router>
      <NavigationBar dark={theme} />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home dark={theme} {...props} />}
        />
        <Route
          path="/account"
          render={props => (
            <PrivateRoute
              toggler={handleThemeToggle}
              dark={theme}
              component={Account}
              {...props}
            />
          )}
        />
        <Route
          path="/register"
          render={props => (
            <RestrictedRoute dark={theme} component={Register} {...props} />
          )}
        />
        <Route
          path="/login"
          render={props => (
            <RestrictedRoute dark={theme} component={Login} {...props} />
          )}
        />
        <Route
          path="/logout"
          render={props => (
            <PrivateRoute
              toggler={setTheme}
              dark={theme}
              component={Logout}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/posts"
          render={props => <Posts dark={theme} {...props} />}
        />
        <Route
          path="/posts/new"
          render={props => (
            <PrivateRoute dark={theme} component={CreatePost} {...props} />
          )}
        />
        <Route
          exact
          path="/posts/:id"
          render={props => <PostDetails dark={theme} {...props} />}
        />
        <Route
          path="/posts/:id/edit"
          render={props => (
            <PrivateRoute dark={theme} component={EditPost} {...props} />
          )}
        />
        <Route path="*" component={Error404} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, null)(App)
