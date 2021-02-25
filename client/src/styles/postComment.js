import styled from 'styled-components'

export const Container = styled.div`
  box-sizing: border-box;
  margin: 1% auto;
  width: 100%;
  padding: 0;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1%;
`

export const TextArea = styled.textarea`
  border: 1px solid #d9d9d9;
  background: #d9d9d9;
  font-family: inherit;
  border-radius: 3px;
  font-size: 1.7rem;
  height: 10vh;
  padding: 1%;

  &::placeholder {
    color: rgb(226, 50, 50);
    font-weight: bold;
  }
`

export const Button = styled.button`
  border: 1px solid #262626;
  color: #fff;
  border-radius: 3px;
  background: #262726;
  font-size: 1.6rem;
  padding: 1.5% 4%;
  margin: 0 auto;
  margin-top: 3%;
  width: 30%;
  cursor: pointer;

  &:disabled {
    border: 1px solid #d9d9d9;
    background: #d9d9d9;
  }
`
