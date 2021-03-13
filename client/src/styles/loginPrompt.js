import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => (props.dark ? '#19232b' : 'rgb(199,199,199)')};
  border-radius: 2px;
  text-align: center;
  padding: 1%;

  @media (max-width: 767px) {
    padding: 4% 0;
  }
`

export const Header = styled.h3`
  font-size: 2rem;
`

export const PromptLinkContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 0.75% auto;
  width: 20%;
`

export const PromptLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.6rem;
  border: 1px solid #000;
  border-radius: 50px;
  padding: 2% 5%;
  margin-left: 6%;
  margin-top: 2%;
  transition: 300ms;

  &:hover {
    background: #000;
    color: #fff;
    transition: 300ms;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
    padding: 5% 20%;
    margin-right: 25%;
    margin-top: 20%;

    &:last-of-type {
      margin-right: 0;
    }
  }
`
