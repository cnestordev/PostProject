import React from 'react'
import { Hash } from '../styles/post'

const Tags = ({ data: tag }) => {
  return (
    <>
      <Hash>{tag}</Hash>
    </>
  )
}

export default Tags
