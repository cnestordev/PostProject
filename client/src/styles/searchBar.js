import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#313e4e' : '#fff')};
  border: 1px solid ${props => (props.dark ? '#313e4e' : '#e0e0e0')};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1%;
  display: flex;
  width: 40%;
  margin: 2% auto;
`

// active #d9d9d9
// inactive #46566a

export const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 5px;
  background: ${props => {
    if (!props.active && props.dark) return '#46566a'
    if (props.active && props.dark) return '#d9d9d9'
    if (!props.active && !props.dark) return '#efefef'
    if (props.active && !props.dark) return '#535353'
  }};
  color: ${props => {
    if (!props.active && props.dark) return '#7c848d'
    if (props.active && props.dark) return '#444'
    if (!props.active && !props.dark) return '#999'
    if (props.active && !props.dark) return '#eaeaea'
  }};
  margin: 0 1%;
  padding: 1.5%;

  &:hover {
    cursor: pointer;
    background: #d9d9d9;
    color: #333;
  }
`

export const Input = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  padding: 1%;
`
