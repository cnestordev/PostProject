import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  border: 1px solid ${props => (props.dark ? '#151f28' : 'rgb(200, 200, 200)')};
  background: ${props => (props.dark ? '#151f28' : '#fff')};
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
  color: ${props => (props.dark ? '#cacaca' : '#313131')};
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
  border: 1px solid ${props => (props.dark ? '#0e141b' : '#313131')};
  background: ${props => (props.dark ? '#0e141b' : '#fff')};
  color: ${props => (props.dark ? '#eaeaea' : '#313131')};
  width: 50%;
  margin: 1% auto;
  font-size: 2rem;
  padding: 1.5%;

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
  cursor: pointer;
  width: 25%;
  margin: 1% auto;
  font-size: 1.8rem;
  background: ${props => {
    if (!props.dark && props.disabled) return '#fff'
    if (props.dark && props.disabled) return '#151f28'
    if (!props.dark && !props.disabled) return '#fff'
    if (props.dark && !props.disabled) return '#681bf0'
  }};
  border: 2px solid
    ${props => {
      if (!props.dark && props.disabled) return '#e6e6e6'
      if (props.dark && props.disabled) return '#1f2d3a'
      if (!props.dark && !props.disabled) return '#000'
      if (props.dark && !props.disabled) return '#681bf0'
    }};
  padding: 1.2% 1%;
  transition: 300ms;

  &:hover {
    color: ${props => !props.disabled && '#fff'};
    background: ${props => {
      if (!props.dark && !props.disabled) return '#000'
      if (props.dark && !props.disabled) return '#4b13af'
    }};
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
  color: ${props => (props.dark ? '#cacaca' : '#313131')};
  font-size: 1.5rem;
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
