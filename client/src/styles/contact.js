import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const Input = styled.input`
  border: 1px solid #313131;
  border-radius: 3px;
  padding: 2%;
  font-size: 2rem;
  margin-top: 3%;

  &:first-of-type {
    margin-top: 5%;
  }
`

export const Textarea = styled.textarea`
  margin-top: 3%;
  height: 15vh;
  font-size: 2.1rem;
  font-family: inherit;
  resize: vertical;
  padding: 1%;
`

export const Button = styled.button`
  border: 2px solid #313131;
  font-size: 1.5rem;
  background: #fff;
  padding: 2%;
  width: 40%;
  margin: 2% auto;
  transition: 300ms;
  cursor: pointer;

  &:hover {
    background: #313131;
    color: #fff;
    transition: 300ms;
  }

  &:disabled {
    border-color: #d6d6d6;
    color: #d6d6d6;

    &:hover {
      background: #fff;
      color: #d6d6d6;
    }
  }
`
export const P = styled.p`
  font-size: 1.5rem;
  color: #ec5d5d;
`
