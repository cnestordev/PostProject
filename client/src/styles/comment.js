import styled from 'styled-components'

export const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid rgb(180, 179, 179);
  border-radius: 5px;
  background: #fff;
  width: 98%;
  margin: 2% auto;
  padding: 2%;
`

export const Author = styled.h3`
  color: #404040;
  font-size: 1.2rem;
  display: inline-block;
`

export const Timestamp = styled.p`
  display: inline-block;
  font-size: 1.2rem;
  color: #868686;
  margin-top: 0.7%;
  margin-left: 2%;

  &::before {
    content: '|';
    margin-right: 0.7rem;
  }
`

export const Body = styled.p`
  font-size: 1.6rem;
  margin-top: 1.5%;
`

export const CommentSocialContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1.5% auto;
  width: 70%;
`

export const Rating = styled.p`
  font-size: 1.6rem;
`

export const Icon = styled.i`
  font-size: 1.8rem;
`

export const DeleteCommentContainer = styled.div`
  color: rgb(255, 97, 97);
  text-align: right;
`

export const DeleteLink = styled.p`
  display: inline;
  color: rgb(255, 97, 97);
  font-size: 1.5rem;
  cursor: pointer;
`
