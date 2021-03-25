import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => (props.dark ? '#0e141b' : '#fff')};
  height: 100vh;
  width: 100%;
  position: relative;
  z-index: 7;
`

export const MenuBox = styled.div`
  width: 90%;
  margin: 0 auto;
  position: relative;
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

export const ListItem = styled.li`
  margin-top: 15%;
`

export const Icon = styled.i`
  font-size: ${props => (props.type === 'close' ? '4.5rem' : '3rem')};
  color: ${props => (props.dark ? '#fff' : '#222')};
`

export const IconClose = styled.i`
  font-size: ${props => (props.type === 'close' ? '3.5rem' : '3rem')};
  color: ${props => (props.dark ? '#696969' : '#434343')};
`

export const Exit = styled.span`
  position: absolute;
  right: 8%;
  top: 1%;
`
