import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  padding: 1% 2%;
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin-top: 3.5%;
  transition: 300ms;
  position: relative;
  z-index: 3;

  @media (max-width: 992px) {
    width: 35%;
    margin-top: 4%;
  }

  @media (max-width: 767px) {
    width: 60%;
    flex-flow: wrap;
    margin: 5% auto 3% auto;
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

export const PLink = styled(Link)`
  padding: 1%;
  cursor: pointer;
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  text-decoration: none;
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
