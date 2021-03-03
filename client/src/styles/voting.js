import styled from 'styled-components'

export const Container = styled.div`
  border: 1px solid ${props => (props.dark ? '#1b831f' : '#ff5722')};
  border-radius: 50px;
  padding: 1% 2%;
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5%;
  transition: 300ms;

  &:hover {
    box-shadow: 0 0 4px 2px ${props => (props.dark ? '#383838' : '#d1d1d1')};
    transition: 300ms;
  }

  @media (max-width: 992px) {
    width: 35%;
    margin-top: 4%;
  }

  @media (max-width: 767px) {
    width: 60%;
    flex-flow: wrap;
    margin: 5% auto;
  }
`

export const Icon = styled.i`
  font-size: inherit;
  margin-right: 3px;

  @media (max-width: 992px) {
    font-size: 1.8rem;
  }

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`

export const Paragraph = styled.p`
  padding: 1%;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  color: ${props => {
    if (!props.active && !props.dark) {
      return '#262626'
    } else if (!props.active && props.dark) {
      return '#a5a9ac'
    } else if (props.active && !props.dark) {
      return '#ff6635'
    } else if (props.active && props.dark) {
      return '#44ff4c'
    }
  }};

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`

//   .selected {
//     color: #ff5620;
//   } */
