import React from 'react'

import { Container, Header, Text } from '../styles/box'

const Box = ({ data = {}, dark }) => {
  const { header, body } = data

  return (
    <Container dark={dark}>
      <Header dark={dark}>{header || 'An example of a box'}</Header>
      <Text dark={dark}>
        {body ||
          `Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
        Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at
        dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel
        nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis,
        luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris
        ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in,
        nibh.`}
      </Text>
    </Container>
  )
}

export default Box
