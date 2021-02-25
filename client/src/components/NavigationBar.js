import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { logInUser } from '../redux/actions/users.actions'

import { Nav, Ul, NavLink, Icon } from '../styles/navigation'

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
      <Nav className="navbarContainer">
        <Ul className="navbarList">
          <li>
            <NavLink to="/" className="navbarItem">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/posts" className="navbarItem">
              Posts
            </NavLink>
          </li>
          <li>
            <div>
              <NavLink to="/posts/new" className="navbarItem">
                <Icon className="fas fa-plus"></Icon>
              </NavLink>
            </div>
          </li>
          <li>
            {user.username === undefined ? (
              <NavLink
                to={{
                  pathname: '/login',
                  state: { from: { pathname: location.pathname } },
                }}
                className="navbarItem"
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to={{
                  pathname: '/logout',
                  state: { from: { pathname: location.pathname } },
                }}
                className="navbarItem"
              >
                {`Logout ${user.username}`}
              </NavLink>
            )}
          </li>
        </Ul>
      </Nav>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    user: state.usersReducer,
  }
}

export default connect(mapStateToProps, { logInUser })(NavigationBar)
