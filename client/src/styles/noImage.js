import styled from 'styled-components'

export const Container = styled.div`
  background: #091117;
  width: 40%;
  font-size: 3rem;
  height: 14vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2% auto;

  @media (max-width: 992px) {
    width: 75%;
    margin-top: 4%;
  }
`

export const Text = styled.p`
  color: #1e1e1e;
  font-weight: bold;

  @media (max-width: 992px) {
    font-size: 2.3rem;
  }
`
