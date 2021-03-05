import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => (props.dark ? '#151f28' : '#fff')};
  text-align: center;
  height: 50vh;
  padding-top: 3%;
`

export const Header = styled.h2`
  font-size: 3rem;
  color: ${props => (props.dark ? '#cbcbcb' : '#000')};

  @media (max-width: 992px) {
    font-size: 3.5rem;
  }
`

export const ThemeContainer = styled.div`
  border: 2px solid ${props => (props.dark ? '#fff' : '#000')};
  border-radius: 5px;
  padding: 0.5% 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 10%;
  margin: 3% auto;

  @media (max-width: 1430px) {
    width: 12%;
  }

  @media (max-width: 997px) {
    width: 13%;
  }

  @media (max-width: 992px) {
    width: 14%;
  }

  @media (max-width: 880px) {
    width: 15%;
  }

  @media (max-width: 810px) {
    width: 15%;
  }

  @media (max-width: 767px) {
    width: 18%;
  }

  @media (max-width: 685px) {
    width: 21%;
  }

  @media (max-width: 545px) {
    width: 23%;
  }

  @media (max-width: 530px) {
    width: 25%;
  }

  @media (max-width: 476px) {
    width: 28%;
    margin: 15% auto;
  }

  @media (max-width: 424px) {
    width: 31%;
  }

  @media (max-width: 388px) {
    width: 34%;
  }

  @media (max-width: 360px) {
    width: 40%;
  }

  @media (max-width: 296px) {
    width: 45%;
  }
`

export const AdminFlair = styled.p`
  display: inline-block;
  background: ${props => (props.dark ? '#1ad122' : '#fff')};
  border: 2px solid ${props => (props.dark ? '#1ad122' : '#000')};
  border-radius: 50px;
  color: #121212;
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0.5% 1%;
  margin: 1% 0;
`

export const IconBox = styled.div`
  border: 1px solid #a3a3a3;
  border-radius: 3px;
  margin-right: 6%;
  margin: 1% 0;
  width: 45%;

  &:hover {
    cursor: pointer;
  }

  &:first-of-type {
    background: ${props => (!props.dark ? '#fcc623' : '#fff')};
  }

  &:last-of-type {
    margin-right: 0;
    background: ${props => (props.dark ? '#fcc623' : '#fff')};
  }
`

export const Icon = styled.i`
  font-size: 6rem;
`

export const Button = styled.button`
  border: 1px solid
    ${props => (props.theme === 'cancel' ? '#414141' : '#f43636')};
  border-radius: 3px;
  background: transparent;
  color: ${props => (props.theme === 'cancel' ? '#414141' : '#f43636')};
  font-size: 1.3rem;
  padding: 1% 2%;
  transition: 300ms;
  margin-top: 1.5%;
  margin-right: 5%;

  &:hover {
    border-color: ${props =>
      props.theme === 'cancel' ? '#414141' : '#f43636'};
    background: ${props => (props.theme === 'cancel' ? '#414141' : '#f43636')};
    color: #fff;
    transition: 300ms;
    cursor: pointer;
  }

  &:last-of-type {
    margin-right: 0;
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
    margin-top: 3%;
  }
`

export const P = styled.p`
  font-size: 2.2rem;
`
