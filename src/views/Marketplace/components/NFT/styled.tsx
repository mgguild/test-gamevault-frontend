import styled from 'styled-components'
import { Flex } from '@metagg/mgg-uikit';

const Container = styled.div`
  border: 2px solid ${({theme}) => theme.colors.MGG_accent2};
`

export default Container;

export const CardContainer = styled(Container)`
  padding: 2em;
  min-width: 400px;
  background-color: ${({theme}) => theme.isDark? '#0c012c' : theme.colors.MGG_mainBG};
  & > ${Flex} {
    margin: 0 0.5rem;
  }
`


