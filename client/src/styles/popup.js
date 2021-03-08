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

export const Box = styled.div`
  animation: ${moveUp} 300ms ease;
  animation-iteration-count: 1;
  background: white;
  position: absolute;
  right: 2%;
  width: 15%;
  transition: 200ms;
  padding: 0.65%;
  text-align: center;
  background: #88ff81;
  border-radius: 3px;
`
export const Body = styled.p`
  font-size: 2rem;
  color: #ff125f;
`
