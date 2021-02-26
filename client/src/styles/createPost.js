import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#0e141b' : '#f1f1fc')};
  height: 50vh;
  text-align: center;
`

export const Header = styled.h1`
  color: ${props => (props.dark ? '#ddd' : '#000')};
  font-size: 3rem;
  margin: 2% 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`

export const InputText = styled.input`
  color: ${props => (props.dark ? '#e1e1e1' : '#000')};
  background: ${props => (props.dark ? '#2e4158' : '#fff')};
  margin: 1% 0;
  border-radius: 2px;
  border: none;
  padding: 1.5%;
`

export const TextArea = styled.textarea`
  background: ${props => (props.dark ? '#2e4158' : '#fff')};
  border: none;
  border-radius: 2px;
  color: ${props => (props.dark ? '#e1e1e1' : '#000')};
  height: 27vh;
  margin: 1% 0;
`

export const File = styled.input`
  background: ${props => (props.dark ? '#2e4158' : '#fff')};
  border: 2px solid ${props => (props.dark ? '#2e4158' : '#cfcfcf')};
  border-radius: 3px;
  padding: 1%;
  margin-top: 1%;
`

export const Button = styled.button`
  background: ${props => (props.dark ? 'purple' : '#fff')};
  border: 2px solid ${props => (props.dark ? 'transparent' : '#000')};
  border-radius: 2px;
  width: 21%;
  margin: 1% auto;
  padding: 1%;
  transition: 500ms;
  cursor: pointer;

  &:hover {
    background: #000;
    color: #fff;
    transition: 300ms;
  }

  &:disabled {
    border-color: rgb(112, 112, 112);
    color: rgb(86 86 86);
    background: rgb(132 132 132);
  }
`

export const ErrorContainer = styled.div`
  font-size: 2.3rem;
  width: 70%;
  margin: 1% auto;
`

export const ErrorMessage = styled.p`
  border-radius: 2px;
  margin: 3% 0;
  color: rgb(255, 133, 133);
  font-weight: bold;
`

export const ServerMessage = styled.p`
  font-size: 1.5rem;
  color: rgb(216, 83, 83);
`
