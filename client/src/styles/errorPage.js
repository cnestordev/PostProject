import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background: #ff5f5f;
  color: #323232;
  text-align: center;
  width: 50%;
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  padding: 3% 0;
`

export const IconHeader = styled.h1`
  font-size: 7rem;
  color: #ffc268;
`

export const SubHeader = styled.h2`
  font-size: 1.8rem;
  margin-top: 1%;
`
export const Status = styled.h3`
  font-size: 3rem;
  margin-top: 2.5%;
`

export const Message = styled.p`
  font-size: 1.5rem;
  margin-top: 2%;
`

export const Btn = styled.button`
  border: 1px solid transparent;
  background: #323232;
  color: #f7e9e9;
  width: 19%;
  margin: 2% auto 0 auto;
  padding: 1% 0;
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background: #000;
    color: #fff;
    transition: 300ms;
  }
`
