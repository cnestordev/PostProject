import styled from 'styled-components'

export const Container = styled.div`
  width: 70%;
  font-size: 3rem;
  height: 14vh;
  margin: 5% auto 0 auto;

  @media (max-width: 992px) {
    width: 75%;
    margin-top: 4%;
  }

  @media (max-width: 767px) {
    width: 75%;
    padding: 2.2% 0;
    margin-top: ${props => (props.registerBtn ? '5%' : '3%')};
  }
`

export const Text = styled.p`
  color: ${props => (props.dark ? '#9b9dad' : '#1e1e1e')};
  font-weight: bold;
  line-height: 1.3;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 5vh;
    background: ${props => (props.dark ? '#151f28' : '#fff')};
    position: relative;
    filter: blur(8px);
    top: -20px;
  }

  @media (max-width: 992px) {
    font-size: 2.3rem;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
    line-height: 1.1;
  }
`
