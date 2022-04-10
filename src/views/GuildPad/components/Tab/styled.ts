/* eslint-disable import/prefer-default-export */

import styled from 'styled-components'
import { Flex } from '@metagg/mgg-uikit'

export const OrganizerContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  border-right: 4px solid ${({ theme }) => theme.colors.MGG_active};
  border-left: 4px solid ${({ theme }) => theme.colors.MGG_active};
  border-bottom: 4px solid ${({ theme }) => theme.colors.MGG_active};
`
