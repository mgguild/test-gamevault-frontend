/* eslint-disable import/prefer-default-export */

import styled from 'styled-components'
import { Flex } from '@metagg/mgg-uikit'

export const ContentContainer = styled(Flex)`
  flex-direction: column;
  margin-top: -50px;
  min-width: 350px;
`

export const ContentSection = styled(Flex)`
  padding: 10px;
  & > * {
    margin: 3px 0px;
  }
`

export const HeaderSection = styled(ContentSection)``

export const SwapSection = styled(ContentSection)`
  flex-direction: column;
`
export const ActionSection = styled(ContentSection)`
  & > * {
    height: 40px;
  }
`
export const AllocSection = styled(ContentSection)`
  flex-direction: column;
  & > * {
    margin: 0px 0px;
  }
`
