import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  border: 1px solid rgb(200, 200, 200);
  background: #fff;
  width: 50%;
  margin: 0 auto;
  text-align: center;
  margin-top: 5%;

  @media (max-width: 992px) {
    width: 65%;
  }

  @media (max-width: 767px) {
    width: 100%;
    border: none;
    padding: 2% 0;
  }
`

export const Header = styled.h1`
  font-size: 3rem;
  margin: 3% 0;

  @media (max-width: 992px) {
    font-size: 3.5rem;
  }

  @media (max-width: 767px) {
    font-size: 2.8rem;
  }
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

  @media (max-width: 992px) {
    width: 60%;
  }

  @media (max-width: 767px) {
    width: 90%;
    margin-bottom: 3%;
    padding: 3% 2%;
  }
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

  &:disabled {
    border-color: #c2c2c2;
    &:hover {
      border-color: #c2c2c2;
      color: #c2c2c2;
      background: inherit;
    }
  }

  @media (max-width: 992px) {
    width: 30%;
  }

  @media (max-width: 767px) {
    width: 55%;
    padding: 2.2% 0;
    margin-top: ${props => (props.registerBtn ? '5%' : '3%')};
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

export const ErrorContainer = styled.div`
  padding: 1%;
`

export const ServerError = styled.p`
  color: #f43c3c;
  font-size: 1.6rem;
`
export const ValidationError = styled.p`
  color: #f43c3c;
  font-size: 1.4rem;
`
