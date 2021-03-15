import React, { useEffect } from 'react'
import DarkModeToggle from 'react-dark-mode-toggle'

import {
  Container,
  MenuBox,
  List,
  NavLink,
  Icon,
  IconClose,
  Exit,
  ListItem,
} from '../styles/menu'

import { Item } from '../styles/navigation'

const Menu = ({ dark, user, toggler, themeToggler }) => {
  const position = window.scrollY

  const outline = {
    focus: {
      outline: 'none',
    },
  }

  useEffect(() => {
    // prevent user from scrolling when Menu mounts
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    return () => {
      // return user to their previous spot on the page and re-enable scrolling when Menu unmounts
      window.scrollTo(0, position)
      document.body.style.overflow = 'scroll'
    }
  }, [])

  return (
    <Container dark={dark}>
      <MenuBox>
        <List>
          <NavLink onClick={() => toggler(false)} dark={dark} to="/">
            Home
          </NavLink>
          <NavLink onClick={() => toggler(false)} dark={dark} to="/posts">
            Posts
          </NavLink>
          <NavLink onClick={() => toggler(false)} dark={dark} to="/posts/new">
            <Icon dark={dark} className="fas fa-plus"></Icon>
          </NavLink>
          {user.username === undefined ? (
            <NavLink dark={dark} onClick={() => toggler(false)} to="/login">
              Login
            </NavLink>
          ) : (
            <>
              <NavLink onClick={() => toggler(false)} dark={dark} to="/account">
                My Account
              </NavLink>
              <NavLink onClick={() => toggler(false)} dark={dark} to="/logout">
                Logout {user.username}
              </NavLink>
            </>
          )}
          <ListItem>
            <DarkModeToggle
              onChange={() => themeToggler(!dark)}
              size={65}
              checked={dark}
              style={outline}
            />
          </ListItem>
          <Exit onClick={() => toggler(false)}>
            <IconClose
              dark={dark}
              type={'close'}
              className="fas fa-times"
            ></IconClose>
          </Exit>
        </List>
      </MenuBox>
    </Container>
  )
}

export default Menu
