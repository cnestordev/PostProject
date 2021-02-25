import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  border: 1px solid #c3c3c3;
  background: #fff;
  margin: 1% 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  margin: 1% auto;
  padding: 2%;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  text-align: center;
  width: 100%;
`

export const Title = styled.h3`
  font-size: 2.5rem;
  text-decoration: none;
`

export const Author = styled.h4`
  font-size: 1.1rem;
  margin-top: 1.5%;
`

export const Time = styled.h5`
  font-size: 0.8rem;
  margin-top: 1%;
  color: #404040;
`

export const Flair = styled.p`
  color: #6c6c6c;
  font-size: 0.8rem;
  display: inline-block;
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
  font-size: 1rem;
  margin: 0 1%;
`
