import styled from 'styled-components'
import { Button, Flex } from '@metagg/mgg-uikit'
import { TwoColumnHeader } from 'components/Column'
import { Container } from '../styled'

export const StyledContainer = styled(Container)`
  height: auto;
  min-height: 85vh;
  display: run-in;
  background: ${({ theme }) => theme.isDark? `linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%)` : theme.colors.modal};
  width: 100%;
  justify-content: space-evenly;
`

export const BgContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.isDark? `linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%)` : theme.colors.modal};
`

export const HomeContainer = styled(Flex)``

export const AnimContainer = styled(Flex)`
  margin: 24px auto;
  max-height: 500px;
  max-width: 700px;
  & > * {
    margin: 0px auto;
   
  }
`
export const ButtonContainer = styled(Flex)`
  justify-content: space-between;
  column-gap: 30px;
  width: 65%;
  @media (max-width: 1366px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 100%;
    flex-direction: column;
    row-gap: 20px;
    // margin: 20px;
    justify-content: center;
  }
`