import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'

export const Container = styled.div`
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  background: #fff;
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
  font-size: 3.2rem;
  text-decoration: none;
`

export const Author = styled.h4`
  font-size: 1.3rem;
  margin-top: 1.5%;
`

export const Time = styled.h5`
  font-size: 1rem;
  margin-top: 1%;
  color: #404040;
`

export const Flair = styled.p`
  color: #6c6c6c;
  font-size: 1rem;
  display: inline-block;
`
export const CloudImg = styled(Image)`
  width: ${props => (props.scale === 'thumbnail' ? '50%' : '70%')};
`

export const PostImg = styled.img`
  width: 70%;
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
  background: #414141;
  border-radius: 50px;
  display: inline-block;
  padding: 4% 8%;
  font-size: 1.3rem;
  margin: 0 1%;
`
