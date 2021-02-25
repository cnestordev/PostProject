import styled from 'styled-components'

export const Container = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 50px;
  padding: 1% 2%;
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5%;
  transition: 300ms;

  &:hover {
    box-shadow: 0 0 4px 2px #d1d1d1;
    transition: 300ms;
  }
`

export const Icon = styled.i`
  font-size: inherit;
  margin-right: 3px;
`

export const Paragraph = styled.p`
  padding: 1%;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  color: ${props => (props.active ? '#ff5c28' : '#000')};
`

//   .selected {
//     color: #ff5620;
//   } */
