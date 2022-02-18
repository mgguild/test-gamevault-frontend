import React, { useContext } from 'react'
import { Text, Flex, Heading, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import * as Scroll from 'react-scroll'
import { ArrowDown } from 'react-feather'
import LottieAnimation from 'lottie'
import { TwoColumnHeader } from 'components/Column'
import data from 'Animation/data.json'
import { StyledContainer, HomeContainer, AnimContainer, ButtonContainer } from './styled'
import PageSection from '../Layout'


const StyledFlex = styled(Flex)`
  text-align: left;
  max-width: 900px;
  justify-content: center;
  padding: 80px;
  align-items: flex-start;
  row-gap: 40px;
`
const HeadingAdapt = styled(Heading)`
  font-size: 4rem;
  @media screen and (max-width: 1024px) {
    font-size: 2.5rem;
  }
`

const HomeContainerAdapt = styled(TwoColumnHeader)`
  @media (min-width: 2500px) {
    min-height: 72vmin;
  }
  & > * {
    margin: 0px auto;
  }
`
const AnimContainerAdapt = styled(AnimContainer)`
  @media (min-width: 2500px) {
   max-height: 1080px;
   max-width: 1080px;
  }
  @media screen and (max-width: 1100px) {
    max-height: 600px;
    max-width: 800px;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`

const StyledLink = styled(Scroll.Link)`
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(({theme}) => theme.colors.MGG_container)};
  margin: -25px auto;
`

const HomeSection: React.FC = () => {
  const theme = useContext(ThemeContext)
  const scrollTo = () => Scroll.animateScroll.scrollTo('activeSection');
  return (
    <PageSection direction='column'>
      <StyledContainer>
        <HomeContainerAdapt>
          <StyledFlex flexDirection="column">
            <HeadingAdapt color={theme.colors.primary}>
                Acquire early access to the incoming P2E Games in the Metaverse
            </HeadingAdapt>
            <Text fontSize="19px">
             IGO and INO Launchpad for exciting GameFi projects
            </Text>
            <hr  style={{width: '100%', border: 'none', borderBottom: `1px solid ${theme.colors.primary}`}}/>
            <ButtonContainer>
              <form action="https://coinmarketcap.com/currencies/metagaming-guild/" style={{width: '100%'}}>
              <Button type="submit"fullWidth style={{ borderRadius: '4px' }}>
                BUY MGG
              </Button>
              </form>
              <form action="https://docs.google.com/forms/d/1BqJHkJYQSuKScdyLKrtMqMkhi5SHe8srOQnQxjcEQ8k" style={{width: '100%'}}>
              <Button type="submit" disabled fullWidth style={{ backgroundColor: theme.colors.backgroundDisabled, borderRadius: '4px' }}>
                Apply KYC
              </Button>
              </form>
            </ButtonContainer>
          </StyledFlex>
          <AnimContainerAdapt>
            <LottieAnimation lotti={data} position="center" />
          </AnimContainerAdapt>
        </HomeContainerAdapt>
        <HomeContainer>
          <Flex style={{margin: '10px auto'}} padding="25px" flexDirection='column' alignItems='center'>
          <Text color="textSubtle" style={{ margin: '10px', fontSize: '20px' }}>
            EXCLUSIVELY ON MULTIPLE CHAINS
          </Text>
          <Flex justifyContent='space-around' style={{ width: '100%'}}>
          <img
              src="./images/icons/exclusive_binance.png"
              alt="ex-binance"
              style={{ verticalAlign: 'middle' }}
            />
            <img
              src="./images/icons/exclusive_eth.png"
              alt="ex-binance"
              style={{ verticalAlign: 'middle' }}
            />
            </Flex>
          </Flex>
        </HomeContainer>
      </StyledContainer>
      <StyledLink to="activeSection" isDynamic smooth>
          <Text><ArrowDown color={theme.colors.MGG_accent2} /></Text>
      </StyledLink>
    </PageSection>
  )
}

export default HomeSection