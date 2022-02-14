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

const HomeSection: React.FC = () => {
  const theme = useContext(ThemeContext)
  const scrollTo = () => Scroll.animateScroll.scrollTo(900);
  return (
    <PageSection direction='column'>
      <StyledContainer>
        <HomeContainer>
          <StyledFlex flexDirection="column">
            <Heading size='xl' color={theme.colors.primary}>
                Acquire early access to the incoming P2E Games in the Metaverse
            </Heading>
            <Text fontSize="19px">
             IGO and INO Launchpad for exciting GameFi projects
            </Text>
            <hr  style={{width: '100%', border: 'none', borderBottom: `1px solid ${theme.colors.primary}`}}/>
            <ButtonContainer>
              <form action="https://sparkswap.finance" style={{width: '100%'}}>
              <Button type="submit"fullWidth style={{ borderRadius: '4px' }}>
                BUY MGG
              </Button>
              </form>
              <form action="mailto: support@metagg.com" style={{width: '100%'}}>
              <Button type="submit" fullWidth style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '4px' }}>
                Apply for KYC
              </Button>
              </form>
            </ButtonContainer>
          </StyledFlex>
          <AnimContainer>
            <LottieAnimation lotti={data} position="center" />
          </AnimContainer>
        </HomeContainer>
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