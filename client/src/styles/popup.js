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
  animation-iteration-count: 1;
  animation: ${fadeOut} 1s ease-out 4.5s;
  background: white;
  position: fixed;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  width: 15%;
  transition: 200ms;
  padding: 8%;
  text-align: center;
  background: #fff;
  border-radius: 3px;
  box-shadow: hsl(11deg 100% 86%) 0px 0px 0px 2px, rgb(255 153 0 / 86%) 0px 4px 6px -1px, rgb(255 200 0) 0px 1px 0px inset;
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
  color: #000;
`
