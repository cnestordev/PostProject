import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 38%;
  margin: 0 auto;

  @media (max-width: 1414px) {
    width: 40%;
  }

  @media (max-width: 1275px) {
    width: 44%;
  }

  @media (max-width: 1275px) {
    width: 48%;
  }

  @media (max-width: 1050px) {
    width: 52%;
  }

  @media (max-width: 935px) {
    width: 58%;
  }

  @media (max-width: 769px) {
    width: 64%;
  }

  @media (max-width: 672px) {
    width: 75%;
  }

  @media (max-width: 460px) {
    width: 84%;
  }
`

export const Top = styled.div`
  box-sizing: border-box;
  padding: 5%;
  color: ${props => (props.dark ? '#7527b0' : '#313131')};
`

export const Header = styled.div`
  display: inline-block;
  font-size: 8rem;
  font-weight: 700;
  font-size: 72px;
  margin-right: 3%;
  background: -webkit-linear-gradient(#16c94e, #3b80ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 672px) {
    font-size: 6.5rem;
  }

  @media (max-width: 460px) {
    font-size: 5.5rem;
  }
`

export const Icon = styled.i`
  color: #f5c33a;
  display: inline-block;
  font-size: 6rem;

  &::after {
    content: '';
    display: block;
    border-radius: 50px;
    width: 70%;
    height: 30px;
    background: black;
    position: relative;
    top: -42px;
    z-index: -1;
    left: 20%;
  }

  @media (max-width: 769px) {
    font-size: 5rem;

    &::after {
      top: -38px;
    }
  }
`

export const Subheader = styled.div`
  font-size: 4rem;
  color: ${props => (props.dark ? '#bbb' : 'inherit')};
  @media (max-width: 769px) {
    font-size: 2.75rem;
  }

  @media (max-width: 460px) {
    font-size: 2.45rem;
  }
`

export const P = styled.p`
  background: ${props => (props.dark ? '#000' : '#313131')};
  border-radius: 3px;
  color: #fff;
  font-size: 2.2rem;
  width: 60%;
  margin: 2% auto;
  padding: 1.5%;

  @media (max-width: 460px) {
    font-size: 1.8rem;
  }
`

export const Bottom = styled.div``
