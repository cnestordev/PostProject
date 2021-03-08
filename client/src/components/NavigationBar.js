import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { logInUser } from '../redux/actions/users.actions'

import {
  Nav,
  Ul,
  NavLink,
  Icon,
  NavAccountContainer,
  NavButton,
  Dropbox,
  NavDropUl,
  NavDropLi,
  AccLink,
  Hamburger,
  LogoContainer,
  Logo,
} from '../styles/navigation'

const NavigationBar = ({ user, logInUser, dark, toggler }) => {
  const location = useLocation()

  useEffect(async () => {
    try {
      const user = await axiosCall.get('/user')
      logInUser(user.data)
    } catch (err) {
      console.log('ERROR getting user')
      console.dir(err)
    }
  }, [])
  return (
    <header style={{ position: 'fixed', width: '100%', top: '0', zIndex: '5' }}>
      <Nav dark={dark} className="navbarContainer">
        <LogoContainer>
          <Logo>MemeIt</Logo>
        </LogoContainer>
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
              <NavAccountContainer>
                <NavButton>{user.username}</NavButton>
                <Dropbox>
                  <NavDropUl dark={dark}>
                    <NavDropLi>
                      <AccLink
                        to={{
                          pathname: '/account',
                          state: { from: { pathname: location.pathname } },
                        }}
                        className="navbarItem"
                      >
                        My Account
                      </AccLink>
                    </NavDropLi>
                    <NavDropLi>
                      <AccLink
                        to={{
                          pathname: '/logout',
                          state: { from: { pathname: location.pathname } },
                        }}
                        className="navbarItem"
                      >
                        Logout
                      </AccLink>
                    </NavDropLi>
                  </NavDropUl>
                </Dropbox>
              </NavAccountContainer>
            )}
          </li>
        </Ul>
        <Hamburger onClick={() => toggler(true)} dark={dark}>
          <i className="fas fa-bars"></i>
        </Hamburger>
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
