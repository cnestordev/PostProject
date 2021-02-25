import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0a5c8b;
  height: 6vh;
`

export const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 50%;
  font-size: 3rem;
`

export const NavLink = styled(Link)`
  color: #f1f1f1;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
`

export const Icon = styled.i`
  font-size: 1.8rem;
`
