import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import axiosCall from '../api/axiosCall'
import { logInUser } from '../redux/actions/users.actions'

import DarkModeToggle from 'react-dark-mode-toggle'

import {
  Nav,
  NavLogo,
  NavMenu,
  Hamburger,
  List,
  Item,
  Menu,
  Icon,
  LinkItem,
} from '../styles/navigation'

const NavigationBar = ({ user, logInUser, dark, toggler, themeToggler }) => {
  const [display, setDisplay] = useState(false)

  const location = useLocation()

  const isUserLoggedIn = Object.keys(user).length > 1

  const outline = {
    focus: {
      outline: 'none',
    },
  }

  useEffect(async () => {
    try {
      const user = await axiosCall.get('/api/user')
      logInUser(user.data)
    } catch (err) {
      console.log('ERROR getting user')
      console.dir(err)
    }
  }, [])
  return (
    <header>
      <Nav dark={dark}>
        <NavLogo to="/posts" dark={dark}>
          <p>Threaddit</p>
        </NavLogo>
        <NavMenu>
          <Hamburger
            onClick={() => {
              if (window.innerWidth >= 946) {
                return setDisplay(!display)
              }
              return toggler(true)
            }}
          >
            <Icon
              dark={dark}
              className={`fas fa-${display ? 'times' : 'bars'}`}
            />
          </Hamburger>
          <Menu dark={dark} display={display}>
            <List dark={dark}>
              <Item dark={dark} onClick={() => setDisplay(false)}>
                <LinkItem to="/">Home</LinkItem>
              </Item>
              <Item dark={dark} onClick={() => setDisplay(false)}>
                <LinkItem to="/posts">Posts</LinkItem>
              </Item>
              <Item dark={dark} onClick={() => setDisplay(false)}>
                <LinkItem to="/posts/new">New</LinkItem>
              </Item>
              {isUserLoggedIn ? (
                <Item dark={dark} onClick={() => setDisplay(false)}>
                  <LinkItem to="/account">Account</LinkItem>
                </Item>
              ) : (
                <Item dark={dark} onClick={() => setDisplay(false)}>
                  <LinkItem to="/login">Login</LinkItem>
                </Item>
              )}
              {isUserLoggedIn && (
                <Item dark={dark} onClick={() => setDisplay(false)}>
                  <LinkItem to="/logout">Logout {user.username}</LinkItem>
                </Item>
              )}
              <Item dark={dark} onClick={() => setDisplay(false)}>
                <LinkItem to="/#contact">Contact me</LinkItem>
              </Item>
              <Item>
                <DarkModeToggle
                  className="themeToggler"
                  onChange={() => themeToggler(!dark)}
                  size={65}
                  checked={dark}
                />
              </Item>
            </List>
          </Menu>
        </NavMenu>
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
