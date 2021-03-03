import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.dark ? '#003157' : '#0a5c8b')};
  height: 6vh;

  @media (max-width: 767px) {
    justify-content: flex-end;
  }
`

export const Ul = styled.ul`
  display: flex;
  justify-content: space-around;
  width: 50%;
  font-size: 3rem;

  @media (max-width: 992px) {
    width: 70%;
  }

  @media (max-width: 767px) {
    display: none;
  }
`

export const NavLink = styled(Link)`
  color: #f1f1f1;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;

  @media (max-width: 992px) {
    font-size: 1.8rem;
  }
`

export const Icon = styled.i`
  font-size: 1.8rem;
`

export const Dropbox = styled.div`
  display: none;
  position: absolute;

  &:hover {
    display: block;
  }
`

export const NavAccountContainer = styled.div`
  position: relative;

  &:hover ${Dropbox} {
    display: block;
  }
`

export const NavButton = styled.button`
  border: none;
  box-sizing: border-box;
  background: transparent;
  font-size: 1.5rem;
  color: white;
  outline: none;
`

export const NavDropUl = styled.ul`
  background: ${props => (props.dark ? '#003157' : '#0a5c8b')};
  border-top: none;
  box-sizing: border-box;
  display: block;
  text-align: center;
  width: 10vw;
  padding: 5%;

  @media (max-width: 992px) {
    width: 16vh;
  }
`

export const NavDropLi = styled.li`
  padding: 10% 5%;
`

export const AccLink = styled(Link)`
  font-size: 1.4rem;
  text-decoration: none;
  border: 1px solid #fff;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  padding: 5%;
  transition: 300ms;

  &:hover {
    background: #fff;
    color: #0a5c8b;
    transition: 300ms;
  }

  @media (max-width: 992px) {
    font-size: 1.55rem;
  }
`
export const Hamburger = styled.div`
  display: none;
  margin-right: 5%;
  font-size: 4rem;
  color: ${props => (props.dark ? '#a0a0a0' : '#fff')};

  @media (max-width: 768px) {
    display: block;
  }
`
