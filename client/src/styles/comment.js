import styled from 'styled-components'
import { comment } from './index'

export const Box = styled.div`
  box-sizing: border-box;
  border: 1px solid ${props => (props.dark ? '#1b2734' : '#c3c3c3')};
  border-radius: 5px;
  background: ${props => (props.dark ? '#1b2734' : '#fff')};
  width: 98%;
  margin: 2% auto;
  padding: 1.5%;
`

export const Author = styled.h3`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.2rem;
  display: inline-block;
`

export const Timestamp = styled.p`
  display: inline-block;
  font-size: 1.2rem;
  color: ${props => (props.dark ? '#6c6c6c' : '#313131')};
  margin-top: 0.7%;
  margin-left: 2%;

  &::before {
    content: '|';
    margin-right: 0.7rem;
  }
`

export const Body = styled.p`
  color: ${props => (props.dark ? '#8d8989' : '#000')};
  line-height: 1.5;
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
  color: ${props => {
    if (!props.active && !props.dark) {
      return '#262626'
    } else if (!props.active && props.dark) {
      return '#a5a9ac'
    } else if (props.active && !props.dark) {
      return '#ff6635'
    } else if (props.active && props.dark) {
      return '#44ff4c'
    }
  }};
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
  font-size: 1.2rem;
  cursor: pointer;
`
