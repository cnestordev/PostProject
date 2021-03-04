import styled from 'styled-components'

export const Container = styled.div`
  position: relative;

  @media (max-width: 767px) {
    margin: 2% auto;
  }
`

export const ImageContainer = styled.div`
  text-align: center;
`

export const Image = styled.img`
  width: 15%;
  border-radius: 5px;

  @media (max-width: 767px) {
    width: 20%;
  }

  @media (max-width: 515px) {
    width: 23%;
  }

  @media (max-width: 380px) {
    width: 26%;
  }
`

export const Overlay = styled.div`
  position: absolute;
  width: 15%;
  height: 100%;
  background: rgba(250, 250, 250, 0.7);
  border-radius: 5px;
  top: 0;
  left: 42.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 20%;
    left: 40%;
  }

  @media (max-width: 515px) {
    width: 23%;
    left: 38.5%;
  }

  @media (max-width: 380px) {
    width: 26%;
    left: 37%;
  }
`

export const Icon = styled.i`
  font-size: 2rem;
  color: #ff5c50;
`
