import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: ${props => {
    if (props.dark) return '#151f28'
    return '#fff'
  }};
  width: 57%;
  box-sizing: border-box;
  margin: 2% auto;
  text-align: center;
  padding: 2% 1%;
  word-break: break-word;

  @media (max-width: 992px) {
    width: 68%;
    padding: 3%;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`

export const Title = styled.h2`
  font-size: 3rem;
  color: ${props => (props.dark ? '#a5a9ac' : '#313131')};

  @media (max-width: 992px) {
    font-size: 3.6rem;
  }

  @media (max-width: 767px) {
    font-size: 2.8rem;
  }
`

export const Author = styled.h3`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.4rem;
  margin-top: 1.3%;

  @media (max-width: 992px) {
    font-size: 1.5rem;
    margin-top: 1.5%;
  }

  @media (max-width: 767px) {
    font-size: 1.3rem;
  }
`

export const Time = styled.h4`
  font-size: 1rem;
  color: ${props => (props.dark ? '#6c6c6c' : '#313131')};
  margin-top: 0.5%;

  @media (max-width: 992px) {
    font-size: 1.3rem;
  }

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`

export const EditContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 10%;
  margin: 0.5% auto;

  @media (max-width: 992px) {
    width: 15%;
  }

  @media (max-width: 992px) {
    margin: 3% auto;
    width: 18%;
  }

  @media (max-width: 400px) {
    width: 40%;
    margin: 5% auto;
    justify-content: space-between;
  }
`

export const PostLink = styled(Link)`
  text-decoration: none;
  color: rgb(255, 145, 0);
  cursor: pointer;
`

export const EditPara = styled.p`
  font-size: 1.4rem;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`

export const DelPara = styled.p`
  display: inline;
  color: rgb(255, 58, 58);
  font-size: 1.4rem;
  margin-left: 12%;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`

export const PostBody = styled.p`
  color: ${props => (props.dark ? '#a5a9ac' : '#313131')};
  font-size: 1.7rem;
  line-height: 1.4;
  text-align: left;
  margin: 2.5% 0;

  @media (max-width: 992px) {
    font-size: 1.9rem;
    line-height: 1.65;
  }
`

export const VoteContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const CommentSection = styled.div`
  border-top: 1px solid black;
  width: 57%;
  margin: 1% auto;

  @media (max-width: 992px) {
    width: 68%;
  }

  @media (max-width: 767px) {
    width: 90%;
  }
`

export const Hr = styled.hr`
  border: none;
  border-top: 1px solid ${props => (props.dark ? '#a5a9ac' : '#313131')};
  width: 90%;
  margin: 3% auto;
`
