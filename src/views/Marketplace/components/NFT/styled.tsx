import styled from 'styled-components'
import { Flex } from '@metagg/mgg-uikit'

const Container = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.MGG_accent2};
`

export default Container

export const CardContainer = styled(Container)`
  padding: 2rem;
  min-width: 350px;

  background-color: ${({ theme }) => (theme.isDark ? '#0c012c' : theme.colors.MGG_mainBG)};
  & > ${Flex} {
    margin: 1.5rem 0rem;
  }
  // ${({ theme }) => theme.mediaQueries.lg} {
  //   max-width: 400px;
  // }
`

export const FontResponsive = styled.div`
  font-size: 9px;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 12px;
  }
`

export const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex: 1;
`

export const ImageContainer = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.MGG_accent2};
  background-color: ${({ theme }) => (theme.isDark ? '#0c012c' : theme.colors.MGG_mainBG)};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justifty-content: center;
`
