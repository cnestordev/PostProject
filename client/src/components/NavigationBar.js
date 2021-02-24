import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { logInUser } from '../redux/actions/users.actions'

const NavigationBar = ({ user, logInUser }) => {
  const location = useLocation()

  useEffect(async () => {
    console.log('%c navbar has mounted', 'color: green')
    try {
      const user = await axiosCall.get('/user')
      console.log(user.data)
      logInUser(user.data)
    } catch (err) {
      console.log('ERROR getting user')
      console.log(err.message)
    }
  }, [])
  return (
    <header>
      <nav className="navbarContainer">
        <ul className="navbarList">
          <li>
            <Link to="/" className="navbarItem">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="navbarItem">
              Posts
            </Link>
          </li>
          <li>
            <div>
              <Link to="/posts/new" className="navbarItem">
                <i className="fas fa-plus"></i>
              </Link>
            </div>
          </li>
          <li>
            {user.username === undefined ? (
              <Link
                to={{
                  pathname: '/login',
                  state: { from: { pathname: location.pathname } },
                }}
                className="navbarItem"
              >
                Login
              </Link>
            ) : (
              <Link
                to={{
                  pathname: '/logout',
                  state: { from: { pathname: location.pathname } },
                }}
                className="navbarItem"
              >
                {`Logout ${user.username}`}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(NavigationBar)
