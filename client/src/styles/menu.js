import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => (props.dark ? '#0e141b' : '#fff')};
  height: 100vh;
  width: 100%;
`

export const MenuBox = styled.div`
  width: 90%;
  margin: 0 auto;
`

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const NavLink = styled(Link)`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => (props.dark ? '#fff' : '#222')};
  margin-top: 15%;
  text-decoration: none;
`

export const Icon = styled.i`
  font-size: ${props => (props.type === 'close' ? '4.5rem' : '3rem')};
  color: ${props => (props.dark ? '#fff' : '#222')};
`

export const IconClose = styled.i`
  font-size: ${props => (props.type === 'close' ? '4.5rem' : '3rem')};
  color: #ff5d5d;
`

export const Exit = styled.span`
  margin-top: 15%;
`
