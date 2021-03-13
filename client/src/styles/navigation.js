import styled from 'styled-components'
import { Link } from 'react-router-dom'

const size = '4rem'

export const Nav = styled.nav`
  background: ${props => (props.dark ? '#0e141b' : '#f2f2f2')};
  display: flex;
  justify-content: space-between;
  padding: 1.5% 10%;
  position: fixed;
  top: 0;
  width: 80%;
  z-index: 5;
`

export const NavLogo = styled.div`
  color: ${props => (props.dark ? '#ececec' : '#313131')};
  font-size: ${size};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NavMenu = styled.div``

export const Hamburger = styled.div`
  padding: 10%;
`

export const List = styled.ul`
  color: ${props => (props.dark ? '#c7c7c7' : '#313131')};
`

export const Item = styled.li`
  border-radius: 7px;
  font-size: ${size};
  margin: 30% auto;
  text-align: center;
  padding: 4% 2%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${props => (props.dark ? '#1c2d35' : '#f1eded')};

    &:last-of-type {
      background: transparent;
    }
  }
`

export const Menu = styled.div`
  background: ${props => (props.dark ? '#16242b' : '#fff')};
  border-radius: 5px;
  display: ${props => (props.display ? 'block' : 'none')};
  opacity: 0.95;
  position: absolute;
  right: 5%;
  top: 100%;
  padding: 0 2%;
`

export const Icon = styled.i`
  color: ${props => (props.dark ? '#696969' : '#313131')};
  font-size: 3rem;
`

export const LinkItem = styled(Link)`
  text-decoration: none;
  color: inherit;
`
