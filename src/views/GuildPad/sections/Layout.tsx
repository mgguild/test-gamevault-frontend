import React from 'react'
import { Flex } from '@sparkpointio/sparkswap-uikit'
import styled from 'styled-components'

const Container = styled(Flex)<{ direction?: string }>`
  height: auto;
  width: 100%;
  margin-bottom: 25px;
  padding-bottom: 25px;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  @media (max-width: 1366px) {
    height: auto;
  }

  @media (max-width: 425px) {
    width: 425px;
  }

  @media (max-width: 320px) {
    width: 320px;
  }
`

const Layout: React.FC<{ direction?: string, id?: string }> = ({ direction, id, children }) => {
  return <Container id={id} direction={direction}>{children}</Container>
}

export default Layout