import styled, { keyframes } from 'styled-components'

const moveUp = keyframes`
    from {
        top: 6%;
        opacity: 0.5
    }
    to {
        top: 9%;
        opacity: 1
    }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`

export const Box = styled.div`
  animation: ${moveUp} 300ms ease;
  animation-iteration-count: 1;
  animation: ${fadeOut} 1s ease-out 4.5s;
  background: white;
  position: fixed;
  right: 2%;
  width: 15%;
  transition: 200ms;
  padding: 0.65%;
  text-align: center;
  background: #88ff81;
  border-radius: 3px;
  z-index: 4;

  @media (max-width: 637px) {
    width: 28%;
  }

  @media (max-width: 480px) {
    width: 35%;
  }

  @media (max-width: 410px) {
    width: 45%;
  }
`
export const Body = styled.p`
  font-size: 2rem;
  color: #ff125f;
`
