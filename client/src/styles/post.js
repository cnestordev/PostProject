import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { tablet, phone } from './index'

export const Container = styled.div`
  border: 1px solid ${props => (props.theme ? 'transparent' : '#e3e3e3')};
  border-radius: 9px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background: ${props => {
    if (props.dark) {
      return '#151f28'
    }
    return '#fff'
  }};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 38%;
  margin: 2% auto;
  padding: 3%;
  word-break: break-word;

  @media (max-width: 1300px) {
    width: 47%;
  }

  @media (max-width: 1185px) {
    width: 49%;
  }

  @media (max-width: 1000px) {
    width: 55%;
  }

  @media (max-width: 945px) {
    width: 65%;
    margin: 2.5% auto;
  }

  @media (max-width: 805px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 85%;
    margin: 3.5% auto;
  }

  @media (max-width: 457px) {
    width: 90%;
    margin: 4% auto;
  }
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  text-align: center;
  width: 100%;
`

export const Title = styled.h3`
  color: ${props => (props.dark ? '#cacaca' : '#313131')};
  font-size: 3rem;
  font-weight: 200;
  text-decoration: none;
  padding: 1%;

  @media (max-width: 992px) {
    font-size: 3.4rem;
  }

  @media (max-width: 945px) {
    font-size: 2.9rem;
  }
`

export const Author = styled.h4`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.3rem;
  margin-top: 1.5%;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 945px) {
    font-size: 1.3rem;
  }
`

export const Time = styled.h5`
  color: ${props => (props.dark ? '#6c6c6c' : '#313131')};
  font-size: 1rem;
  margin-top: 1%;

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }

  @media (max-width: 945px) {
    font-size: 1.2rem;
  }
`

export const Flair = styled.p`
  color: #6c6c6c;
  font-size: 1rem;
  display: inline-block;

  @media (max-width: 992px) {
    font-size: 1.2rem;
  }
`

export const PostImg = styled.img`
  width: ${props => (props.scale === 'full' ? '95%' : '75%')};
  border-radius: 5px;

  @media (max-width: 992px) {
    width: ${props => (props.scale === 'full' ? '95%' : '80%')};
  }

  @media (max-width: 945px) {
    width: ${props => (props.scale === 'full' ? '95%' : '90%')};
  }
`

export const TagsContainer = styled.div`
  color: #fff;
  width: 100%;
  margin: 2% auto;
`

export const Hash = styled.p`
  background: ${props => (props.dark ? '#681bf0' : '#414141')};
  border-radius: 50px;
  display: inline-block;
  padding: 2% 4%;
  font-size: 1.3rem;
  margin: 0 1%;

  @media (max-width: 992px) {
    font-size: 1.4rem;
  }
`
