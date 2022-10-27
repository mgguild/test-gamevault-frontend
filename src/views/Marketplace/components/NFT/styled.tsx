import styled from 'styled-components'
import { Flex } from '@metagg/mgg-uikit';


const Container = styled.div`
  border: 2px solid ${({theme}) => theme.colors.MGG_accent2};
`

export default Container;

export const CardContainer = styled(Container)`
  padding: 1.5rem;
  min-width: 250px;
  background-color: ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
  
  ${({theme}) => theme.mediaQueries.sm} {
    padding: 2rem;
  }
`

export const FontResponsive = styled.div`
  font-size: 9px;

  ${({theme}) => theme.mediaQueries.sm} {
    font-size: 12px;
  }
`

