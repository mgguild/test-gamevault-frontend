import React, { useContext } from 'react'
import { Text, Flex, Heading, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import * as Scroll from 'react-scroll'
import { ArrowDown } from 'react-feather'
import LottieAnimation from 'lottie'
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

const HomeContainerAdapt = styled(HomeContainer)`
  @media screen and (min-width: 1100px) {
    height: 74vmin;
  }
`
const AnimContainerAdapt = styled(AnimContainer)`
  @media screen and (min-width: 1100px) {
    max-height: 600px;
    max-width: 800px;
  }
`

const HomeSection: React.FC = () => {
  const theme = useContext(ThemeContext)
  const scrollTo = () => Scroll.animateScroll.scrollTo(900);
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
              <Button type="submit" fullWidth style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '4px' }}>
                Apply for KYC
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
      <Button onClick={scrollTo} margin="-25px auto" style={{borderRadius: '50%', width: '50px', background: theme.colors.MGG_container}}>
          <Text><ArrowDown color={theme.colors.MGG_accent2} /></Text>
      </Button>
    </PageSection>
  )
}

export default HomeSection