import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: white;
  width: 55%;
  margin: 0 auto;
  text-align: center;
  padding: 2% 1%;
`

export const Title = styled.h2`
  font-size: 3rem;
  color: #272727;
`

export const Author = styled.h3`
  font-size: 1.4rem;
  margin-top: 1.3%;
`

export const Time = styled.h4`
  font-size: 1rem;
  color: #484848;
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
