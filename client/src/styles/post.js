import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'

export const Container = styled.div`
  border: 1px solid ${props => (props.theme ? 'transparent' : '#e3e3e3')};
  border-radius: 5px;
  background: ${props => {
    if (props.dark) {
      return '#151f28'
    }
    return '#fff'
  }};
  margin: 1% 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 1% auto;
  padding: 1% 0;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  text-align: center;
  width: 100%;
`

export const Title = styled.h3`
  color: ${props => (props.dark ? '#a5a9ac' : '#313131')};
  font-size: 3.2rem;
  text-decoration: none;
`

export const Author = styled.h4`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.3rem;
  margin-top: 1.5%;
`

export const Time = styled.h5`
  color: ${props => (props.dark ? '#6c6c6c' : '#313131')};
  font-size: 1rem;
  margin-top: 1%;
`

export const Flair = styled.p`
  color: #6c6c6c;
  font-size: 1rem;
  display: inline-block;
`

export const PostImg = styled.img`
  width: ${props => (props.scale === 'full' ? '95%' : '75%')};
  border-radius: 5px;
`

export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: #fff;
  width: 22%;
  margin: 2% auto;
`

export const Hash = styled.p`
  background: ${props => (props.dark ? '#681bf0' : '#414141')};
  border-radius: 50px;
  display: inline-block;
  padding: 4% 8%;
  font-size: 1.3rem;
  margin: 0 1%;
`
