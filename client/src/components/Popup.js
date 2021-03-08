import React, { useEffect } from 'react'

import { Box, Body } from '../styles/popup'

const Popup = ({ message }) => {
  return (
    <Box>
      <Body>{message || 'something went wrong'}</Body>
    </Box>
  )
}

export default Popup
