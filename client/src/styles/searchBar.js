import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#313e4e' : '#fff')};
  border: 1px solid ${props => (props.dark ? '#313e4e' : '#e0e0e0')};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1%;
  display: flex;
  justify-content: space-around;
  width: 40%;
  margin: 2% auto;

  @media (max-width: 1105px) {
    width: 45%;
    margin: 2.5% auto;
  }

  @media (max-width: 992px) {
    width: 50%;
  }

  @media (max-width: 945px) {
    width: 55%;
  }

  @media (max-width: 862px) {
    width: 60%;
  }

  @media (max-width: 780px) {
    width: 65%;
  }

  @media (max-width: 767px) {
    width: 67%;
    flex-flow: wrap;
  }

  @media (max-width: 730px) {
    width: 68%;
  }

  @media (max-width: 711px) {
    width: 70%;
  }

  @media (max-width: 670px) {
    width: 75%;
  }

  @media (max-width: 630px) {
    width: 80%;
  }

  @media (max-width: 588px) {
    width: 90%;
  }
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

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }

  @media (max-width: 767px) {
    margin-bottom: 5%;
    padding: 2%;
  }
`

export const Input = styled.input`
  border: 1px solid ${props => (props.dark ? '#202934' : '#bbb')};
  border-radius: 3px;
  padding: 1%;
  background: ${props => (props.dark ? '#202934' : '#fff')};

  @media (max-width: 767px) {
    width: 100%;
    margin: 5% 1% 10%;
    font-size: 2rem;
    padding: 3%;
  }
`

export const Form = styled.form`
  padding: 0;
  margin: 0;
`
