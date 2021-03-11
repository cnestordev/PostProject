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
  position: relative;
  word-break: break-word;

  @media (max-width: 767px) {
    width: 98%;
    margin-top: 3%;
  }
`

export const Author = styled.h3`
  color: ${props => (props.dark ? '#717374' : '#313131')};
  font-size: 1.2rem;
  display: inline-block;

  @media (max-width: 992px) {
    font-size: 1.4rem;
  }
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

  @media (max-width: 992px) {
    font-size: 1.3rem;
  }
`

export const Body = styled.p`
  color: ${props => (props.dark ? '#8d8989' : '#000')};
  line-height: 1.5;
  font-size: 1.6rem;
  margin-top: 1.5%;

  @media (max-width: 992px) {
    font-size: 1.6rem;
    line-height: 1.65;
  }
`

export const CommentSocialContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1.5% auto;
  width: 70%;

  @media (max-width: 992px) {
    margin: 2% auto 1% auto;
  }
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
  font-size: 1.5rem;
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
  user-select: none;

  @media (max-width: 992px) {
    font-size: 2rem;
  }
`

export const DeleteCommentContainer = styled.div`
  color: rgb(255, 97, 97);
  text-align: right;
  position: absolute;
  top: 2%;
  right: 1%;
  width: 15%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 1120px) {
    width: 20%;
  }

  @media (max-width: 820px) {
    width: 23%;
  }

  @media (max-width: 515px) {
    width: 28%;
  }

  @media (max-width: 436px) {
    width: 32%;
  }
`

export const DeleteLink = styled.p`
  display: inline;
  color: ${props =>
    props.theme === 'normal' ? '#ffc307' : 'rgb(255, 97, 97)'};
  font-size: 1.4rem;
  cursor: pointer;
  margin-right: 7%;
  user-select: none;

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 1120px) {
    margin-right: 8%;
  }

  @media (max-width: 1040px) {
    margin-right: 10%;
  }

  @media (max-width: 992px) {
    font-size: 1.35rem;
  }

  @media (max-width: 820px) {
    margin-right: 12%;
  }

  @media (max-width: 515px) {
    margin-right: 15%;
  }
`
