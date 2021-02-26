import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
`

export const Header = styled.p`
  color: ${props => (props.dark ? 'white' : '#000')};
  font-size: 1.7rem;
  padding: 0.8%;
`
