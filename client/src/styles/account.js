import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
  text-align: center;
  height: 50vh;
`

export const Header = styled.h2`
  font-size: 3rem;
  color: ${props => (props.dark ? '#cbcbcb' : '#000')};
`

export const ThemeContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7%;
  margin: 1% auto;
`

export const AdminFlair = styled.p`
  display: inline-block;
  background: ${props => (props.dark ? '#1ad122' : '#fff')};
  border: 2px solid ${props => (props.dark ? '#1ad122' : '#000')};
  border-radius: 50px;
  color: #121212;
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0.5% 1%;
  margin-top: 0.5%;
`

export const IconBox = styled.div`
  border: 1px solid #a3a3a3;
  border-radius: 3px;
  padding: 7%;
  margin-right: 6%;

  &:hover {
    cursor: pointer;
  }

  &:first-of-type {
    background: ${props => (!props.dark ? '#fcc623' : '#fff')};
  }

  &:last-of-type {
    margin-right: 0;
    background: ${props => (props.dark ? '#fcc623' : '#fff')};
  }
`

export const Icon = styled.i`
  font-size: 3rem;
`

export const Button = styled.button`
  border: 1px solid #f43636;
  border-radius: 3px;
  background: #f43636;
  color: #fff;
  font-size: 1.3rem;
  padding: 1% 2%;
  transition: 300ms;

  &:hover {
    border-color: #ca2929;
    background: #ca2929;
    transition: 300ms;
    cursor: pointer;
  }
`
