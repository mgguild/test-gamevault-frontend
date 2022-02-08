import styled from 'styled-components'
import { Heading, Button, Flex } from '@sparkpointio/sparkswap-uikit'
// import Container from '../styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledContainer = styled(Container)`
  padding: 40px;
  margin-top: 30px;
  margin-bottom: 30px;
  height: auto;
  min-height: 40vh;
  justify-content: space-around;
  align-items: center;
  background-image: url('/images/icons/Project_icon.svg'), url('/images/icons/Mail_icon.svg');
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-position: left top 10px, right bottom 20px;
  background-size: 25% 70%;
  @media (max-width: 500px) {
    padding: 10px;
    text-align: center;
    margin: auto;
    background-position: left top -30px, right bottom -40px;
  }
`

export default StyledContainer

export const StyledHeading = styled(Heading)`
  padding: 20px;
  &:after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 80%;
    padding-top: 20px;
    border-bottom: 3px solid ${({ theme }) => theme.colors.MGG_active };
  }
`
