import { Flex } from '@metagg/mgg-uikit'
import styled from 'styled-components'

export const ContainerBoxCard = styled(Flex)`
  max-width: 100%;
  margin: 4rem 5rem;
  align-items: center;
  justify-content: center;
  ${({theme}) => !theme.isDark && `
    & > * { 
      z-index: 1;
     }
  `}
`

export const MarketCard = styled(Flex)`
    background-color: ${(({theme}) => theme.colors.MGG_container)};
    padding: 10px;
    flex-direction: column;
    
`

const MarketCardSection = styled(Flex)`
  margin: 10px;
  width: 100%;
  padding: 10px;
  & > * {
    margin: 2px;
  }
`

export const ProgressSection = styled(MarketCardSection)`
    flex-direction: column;
`

export const DetailSection = styled(MarketCardSection)`
  flex-direction: column;
  border-top: 3px solid ${(({theme}) => theme.colors.primary)};
  border-bottom: 3px solid ${(({theme}) => theme.colors.primary)}; 
`
export const DataRow = styled(Flex)<{modify?: boolean}>`
  justify-content: space-between;
  ${({modify, theme}) => modify &&`
    & :first-child {
      color: ${theme.colors.MGG_accent2};
    }
  `}
`

export const AllocSection = styled(MarketCardSection)`
  flex-direction: column;
`
export const ActionSection = styled(MarketCard)`
    background-color: transparent;
    z-index: 1;
`

export const TimerContainer = styled(Flex)`
  background-color: #5C9E04;
  margin-bottom: 10px;
`