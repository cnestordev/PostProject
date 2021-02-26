import React from 'react'
import { Hash } from '../styles/post'

const Tags = ({ data: tag, dark }) => {
  return (
    <>
      <Hash dark={dark}>{tag}</Hash>
    </>
  )
}

export default Tags
