import { Flex } from '@metagg/mgg-uikit'
import styled from 'styled-components'

export const ContainerBoxCard = styled(Flex)`
  max-width: 100%;
  margin: 4rem 5rem;
  align-items: center;
  justify-content: center;
`

export const MarketCard = styled(Flex)`
    background-color: ${(({theme}) => theme.colors.MGG_container)};
`