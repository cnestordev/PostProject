import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateUser } from '../redux/actions/users.actions'

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
import Home from './Home'
import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import Account from './Account'
import Menu from './Menu'
import ErrorPage from './ErrorPage'
import UserPosts from './UserPosts'
import UserComments from './UserComments'

const App = ({ user, updateUser }) => {
  if (Object.keys(user).length <= 1) {
    user.darkMode = localStorage.getItem('themePreference') === 'true'
  }

  const [theme, setTheme] = useState(user.darkMode)

  const [display, setDisplay] = useState(false)

  // network errors
  const [error, setError] = useState('')

  const handleThemeToggle = async theme => {
    // id will be used to fetch user id
    let id = ''
    try {
      // fetch user id
      const userObj = await axiosCall.get('/api/getUserId')
      id = userObj.data.message
      try {
        // use id to fetch user id from the server
        const response = await axiosCall.post(`/api/${id}/themeToggle/${theme}`)
        const val = response.data.message.darkMode
        updateUser(response.data.message)
        // setTheme(val)
        // document.body.style.backgroundColor = val ? '#0e141b' : '#f2f2f2'
      } catch (err) {
        // if there is a server error
        setError(err.response.data.message)
      }
    } catch (err) {
      // if unable to fetch user id (user not logged on)
      // change the "guest" dark mode
      localStorage.setItem('themePreference', !user.darkMode)
      updateUser({ darkMode: !user.darkMode })
    }
  }

  const toggleMenu = value => {
    setDisplay(value)
  }

  useEffect(() => {
    setTheme(user.darkMode)
    document.body.style.backgroundColor = user.darkMode ? '#0e141b' : '#f2f2f2'
  }, [user])

  return (
    <Router>
      {display && (
        <Menu
          themeToggler={handleThemeToggle}
          display={display}
          toggler={toggleMenu}
          user={user}
          dark={theme}
        />
      )}
      <NavigationBar
        themeToggler={handleThemeToggle}
        toggler={toggleMenu}
        dark={theme}
      />
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home dark={theme} {...props} />}
        />
        <Route
          exact
          path="/account"
          render={props => (
            <PrivateRoute
              errorMsg={error}
              toggler={handleThemeToggle}
              dark={theme}
              component={Account}
              {...props}
            />
          )}
        />
        <Route
          path="/account/posts"
          render={props => (
            <PrivateRoute dark={theme} component={UserPosts} {...props} />
          )}
        />
        <Route
          path="/account/comments"
          render={props => (
            <PrivateRoute dark={theme} component={UserComments} {...props} />
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
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => ({
  user: state.usersReducer,
})

export default connect(mapStateToProps, { updateUser })(App)
