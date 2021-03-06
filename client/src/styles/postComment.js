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
  border: 1px solid transparent;
  background: ${props => (props.dark ? '#545d68' : '#d9d9d9')};
  font-family: inherit;
  border-radius: 3px;
  font-size: 1.7rem;
  height: 10vh;
  padding: 1%;

  &::placeholder {
    color: #c3c3c3;
    font-weight: bold;
  }
`

export const Button = styled.button`
  border: 1px solid ${props => (props.dark ? '#691bf0' : '#262626')};
  color: #fff;
  border-radius: 3px;
  background: ${props => (props.dark ? '#691bf0' : '#262626')};
  font-size: 1.6rem;
  padding: 1.5% 4%;
  margin: 0 auto;
  margin-top: 3%;
  width: 30%;
  cursor: pointer;

  &:disabled {
    border: 1px solid ${props => (props.dark ? 'transparent' : '#ababab')};
    background: ${props => (props.dark ? '#17212c' : '#ababab')};
  }

  @media (max-width: 767px) {
    width: 60%;
    padding: 3%;
    margin-bottom: 3%;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`
