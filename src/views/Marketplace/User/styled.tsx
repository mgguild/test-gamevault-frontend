import styled from 'styled-components'
import { Flex } from '@sparkpointio/sparkswap-uikit'

const StyledContainer = styled(Flex)`
  display: flex;
`
export default StyledContainer

export const UserContainer = styled(StyledContainer)`
  flex-direction: column;
  justify-content: space-between;
  min-height: 30vh;
`
export const CollectionsContainer = styled(StyledContainer)`
  flex: 1;
`
export const UserImg = styled.img`
  border-radius: 50%;
`