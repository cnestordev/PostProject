import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  background: ${props => (props.dark ? '#0a0a0a' : '#fff')};
  border: 1px solid ${props => (props.dark ? 'transparent' : '#313131')};
  border-radius: 3px;
  color: ${props => (props.dark ? '#f1f1f1' : '#313131')};
  padding: 2%;
  font-size: 2rem;
  margin-top: 3%;

  &:first-of-type {
    margin-top: 5%;
  }
`

export const Textarea = styled.textarea`
  background: ${props => (props.dark ? '#0a0a0a' : '#fff')};
  color: ${props => (props.dark ? '#f1f1f1' : '#313131')};
  border-color: ${props => (props.dark ? 'transparent' : '#313131')};
  border-radius: 3px;
  margin-top: 3%;
  height: 15vh;
  font-size: 2.1rem;
  font-family: inherit;
  resize: vertical;
  padding: 1%;
`

export const Button = styled.button`
  border: 2px solid ${props => (props.dark ? 'transparent' : '#313131')};
  font-size: 1.5rem;
  background: ${props => (props.dark ? '#25d069' : '#fff')};
  color: ${props => (props.dark ? '#fff' : '#000')};
  padding: 2%;
  width: 40%;
  margin: 2% auto;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    background: ${props => (props.dark ? '#1ea252' : '#313131')};
    color: #fff;
    transition: 300ms;
  }

  &:disabled {
    border-color: ${props => (props.dark ? 'transparent' : '#d6d6d6')};
    color: ${props => (props.dark ? 'gray' : '#fff')};
    background: ${props => (props.dark ? '#1a2732' : '#d6d6d6')};

    &:hover {
      background: #fff;
      color: #d6d6d6;

      &:disabled {
        border-color: ${props => (props.dark ? 'transparent' : '#d6d6d6')};
        color: ${props => (props.dark ? 'gray' : '#d6d6d6')};
        background: ${props => (props.dark ? '#1a2732' : '#d6d6d6')};
      }
    }
  }
`
export const P = styled.p`
  font-size: 1.5rem;
  color: #ec5d5d;
`
