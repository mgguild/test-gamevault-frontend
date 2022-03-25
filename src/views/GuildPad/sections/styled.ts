import styled from 'styled-components'
import { Heading, Flex } from '@sparkpointio/sparkswap-uikit'

export const SectionHeading = styled(Heading)`
  margin: 20px 15px;
  padding: 20px;
  text-align: center;
  &:after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 80%;
    padding-top: 20px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const BoxContainer = styled(Flex)<{ borderColor?: string }>`
  border: 1px solid ${({ theme, borderColor }) => (!borderColor ? 'rgba(131,131,131, 0.5)' : borderColor)};
  border-top: none;
  height: auto;
  justify-content: center;
  align-items: center;
  padding: 20px;
  // background-color: ${({ theme }) => theme.colors.MGG_container};
`
export const BoxHeader = styled(Flex)`
  width: 100%;
  background: ${({ theme }) => theme.colors.MGG_active};
  padding: 20px;
  // min-height: 10vh;
  align-items: center;
  justify-content: center;
  border-radius: 10px 10px 0px 0px;
`
export const TabContainer = styled(Flex)`
  border-radius: 10px 10px 0px 0px;
  background-color: ${({ theme }) => theme.card.background};
`
