import styled from 'styled-components'
import { Heading } from '@sparkpointio/sparkswap-uikit'
import { Link } from 'react-router-dom'
// import Container from 'styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledContainer = styled(Container)`
  min-height: 100vh;
  height: auto;
  padding: 20px;
  justify-content: space-evenly;
  padding-bottom: 100px;
`

export const StyledHeading = styled(Heading)`
  margin: 20px 15px;
  padding: 20px;
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

export const StyledTitle = styled(Heading)`
  margin: 5px 15px;
  &:after {
    content: '';
    display: block;
    margin: 0 auto;
    width: 80%;
    padding-top: 20px;
  }
  @media (max-width: 768px) {
    text-align: center;
  }
`

export const Image = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  margin: 10px;
`

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 5px;
  line-height: 5px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: default;
    transform: scale(1.1);
  }
`

export const Text = styled.div`
  display: flex;
  height: 7vh;
  width: 100%;
  margin-top: 15px;
`

export const BoxHeading = styled(Heading)`
  margin: 15px 0px;
  text-align: center;
`

export const TierTitle = styled(BoxHeading)`
    padding: 15px;
    display: block; 
    margin: 15px auto; 
    width: 100%; 
    border-bottom: 3px solid ${({ theme }) => theme.colors.MGG_active}; 
    // border-top: 3px solid ${({ theme }) => theme.colors.primary}; 
}
`

export const TierDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  min-height: 130px;
  & > * {
    margin: 10px 0px;
    padding: 5px 0px;
  }
`
export const TierFooter = styled.div`
  padding: 25px 0px;
`

export const StyledLink = styled.a`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`
