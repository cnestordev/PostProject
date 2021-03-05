import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
  border-radius: 5px;
  width: 50%;
  margin: 2% auto;
  padding: 1%;

  @media (max-width: 1200px) {
    width: 55%;
  }

  @media (max-width: 1095px) {
    width: 65%;
  }

  @media (max-width: 940px) {
    width: 70%;
  }

  @media (max-width: 865px) {
    width: 75%;
  }

  @media (max-width: 810px) {
    width: 80%;
  }

  @media (max-width: 765px) {
    width: 85%;
  }

  @media (max-width: 720px) {
    width: 90%;
  }

  @media (max-width: 590px) {
    margin: 4% auto;
  }
`

export const Body = styled.p`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  font-size: 1.5rem;
  line-height: 1.5;
  padding: 1%;
`

export const PostLink = styled(Link)`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  font-size: 1.8rem;
  display: flex;
  text-decoration: none;
`
