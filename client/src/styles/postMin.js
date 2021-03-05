import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  width: 45%;
  margin: 2% auto;
  padding: 1%;
  position: relative;

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

export const ImageContainer = styled.div`
  width: 15%;
`

export const InfoContainer = styled.div`
  width: 80%;
  padding-right: 2%;
`

export const Header = styled.h1`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  font-size: 3rem;
  text-align: center;
`

export const Subheader = styled.h3`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  font-size: 2rem;
  display: flex;
`

export const IconContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 3.5%;

  @media (max-width: 590px) {
    margin-top: 5%;
  }
`

export const Icon = styled.i`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  font-size: 1.8rem;
  margin-right: 20%;
`

export const PostLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const P = styled.p`
  color: ${props => (props.dark ? '#a5a9ac' : '#000')};
  cursor: ${props => (props.pointer ? 'pointer' : 'default')};
  font-size: 1.8rem;
  display: flex;
`
