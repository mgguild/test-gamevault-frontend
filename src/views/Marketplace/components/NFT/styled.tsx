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

export const Wrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex: 1;
`

export const ImageContainer = styled.div`
  border-radius: 5px;
  border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
  background-color: ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justifty-content: center;
`