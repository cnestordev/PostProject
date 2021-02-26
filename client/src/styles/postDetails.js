import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => {
    if (props.dark) {
      document.body.style.backgroundColor = '#0e141b'
      return '#151f28'
    }
    document.body.style.backgroundColor = 'ghostwhite'
    return '#fff'
  }};
  width: 55%;
  margin: 0 auto;
  text-align: center;
  padding: 2% 1%;
`

export const Title = styled.h2`
  font-size: 3rem;
  color: ${props => (props.dark ? '#a5a9ac' : '#313131')};
`

export const Author = styled.h3`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.4rem;
  margin-top: 1.3%;
`

export const Time = styled.h4`
  font-size: 1rem;
  color: ${props => (props.dark ? '#6c6c6c' : '#313131')};
  margin-top: 0.5%;
`

export const EditContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 10%;
  margin: 0.5% auto;
`

export const PostLink = styled(Link)`
  text-decoration: none;
  color: rgb(255, 145, 0);
  font-size: 1.4rem;
  cursor: pointer;
`

export const EditPara = styled.p`
  font-size: 1.4rem;
`

export const DelPara = styled.p`
  color: rgb(255, 58, 58);
  font-size: 1.4rem;
  margin-left: 12%;
  cursor: pointer;
`

export const PostBody = styled.p`
  font-size: 1.7rem;
  line-height: 1.4;
  text-align: left;
  margin: 2.5% 0;
`

export const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const CommentSection = styled.div`
  border-top: 1px solid black;
  width: 57%;
  margin: 1% auto;
`

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid #050505;
  width: 90%;
  margin: 3% auto;
`
