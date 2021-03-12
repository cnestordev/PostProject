import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
  border-radius: 7px;
  box-sizing: border-box;
  color: ${props => (props.dark ? '#25d069' : '#313131')};
  margin: 5% auto;
  padding: 5%;

  &:first-of-type {
    margin-top: 3%;
  }
`

export const Header = styled.h3`
  font-size: 3.2rem;
  background: ${props =>
    !props.dark
      ? '-webkit-linear-gradient(#730fe0, #1f8fde)'
      : '-webkit-linear-gradient(#0bd099, #22a6d9)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: ${props =>
    props.override ? 'none' : 'transparent'};

  @media (max-width: 672px) {
    font-size: 2.5rem;
  }
`

export const Text = styled.p`
  color: ${props => (props.dark ? '#bbb' : '#313131')};
  font-size: 2rem;
  line-height: 1.4;
  margin-top: 2.5%;

  @media (max-width: 672px) {
    font-size: 1.8rem;
  }
`
