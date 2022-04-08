import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#313e4e' : '#fff')};
  border: 1px solid ${props => (props.dark ? '#313e4e' : '#e0e0e0')};
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1%;
  display: flex;
  justify-content: space-around;
  width: 38%;
  margin: 2% auto;

  @media (max-width: 1300px) {
    width: 47%;
  }

  @media (max-width: 1185px) {
    width: 49%;
  }

  @media (max-width: 1000px) {
    width: 55%;
  }

  @media (max-width: 945px) {
    width: 65%;
  }

  @media (max-width: 767px) {
    flex-flow: wrap;
  }

  @media (max-width: 805px) {
    width: 70%;
  }

  @media (max-width: 600px) {
    width: 91%;
  }

  @media (max-width: 457px) {
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
    margin: 3% 1%;
    font-size: 2rem;
    padding: 3%;
  }

  @media (max-width: 545px) {
    margin: 5% 1%;
  }
`

export const Form = styled.form`
  padding: 0;
  margin: 0;
`
