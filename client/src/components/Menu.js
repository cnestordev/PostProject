import React from 'react'

import {
  Container,
  MenuBox,
  List,
  NavLink,
  Icon,
  IconClose,
  Exit,
} from '../styles/menu'

const Menu = ({ dark, user, toggler }) => {
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
          {console.log('*******************')}
          {console.log(user.username)}
          {user.username === undefined ? (
            <NavLink onClick={() => toggler(false)} to="/login">
              Login
            </NavLink>
          ) : (
            <>
              <NavLink onClick={() => toggler(false)} dark={dark} to="/account">
                Account
              </NavLink>
              <NavLink onClick={() => toggler(false)} dark={dark} to="/logout">
                Logout {user.username}
              </NavLink>
            </>
          )}
          <Exit onClick={() => toggler(false)}>
            <IconClose type={'close'} className="fas fa-times"></IconClose>
          </Exit>
        </List>
      </MenuBox>
    </Container>
  )
}

export default Menu
