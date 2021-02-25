import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  border: 1px solid rgb(200, 200, 200);
  background: #fff;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 5%;
`

export const Header = styled.h1`
  font-size: 3rem;
  margin: 3% 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 4% auto;
`

export const Input = styled.input`
  width: 50%;
  margin: 1% auto;
  font-size: 2rem;
  padding: 1%;
`

export const Button = styled.button`
  width: 25%;
  margin: 1% auto;
  font-size: 1.8rem;
  background: #fff;
  border: 2px solid #000;
  padding: 1.2% 1%;
  transition: 300ms;

  &:hover {
    background: #000;
    color: #fff;
    transition: 300ms;
    cursor: pointer;
  }
`

export const RedirectContainer = styled.div`
  margin-bottom: 2%;
`

export const RedirectLink = styled(Link)`
  font-size: 1.5rem;
  color: inherit;
  padding-bottom: 2%;
  text-decoration: none;
`
