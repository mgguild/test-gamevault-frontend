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
  padding: 25px;
  text-align: left;
  max-width: 900px;
  justify-content: center;
  align-items: flex-start;
  row-gap: 40px;
  ${(({theme}) => theme.mediaQueries.sm)} {
    padding: 80px;
  }
`
const HeadingAdapt = styled(Heading)`
  font-size: 4rem;
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
  // @media screen and (max-width: 500px) {
  //   font-size: 0.5rem;
  // }
`

const HomeContainerAdapt = styled(TwoColumnHeader)`
  @media (min-width: 2500px) {
    min-height: 72vmin;
  }
  @media (min-width: 1534px) {
    min-height: 78vmin;
  }
  & > * {
    margin: 0px auto;
  }
`
const AnimContainerAdapt = styled(AnimContainer)`
  @media (min-width: 2500px) {
   height: 1080px;
  }
  @media (max-width: 1100px) {
   height: 500px;
  }
  @media (max-width: 500px) {
    height: 300px;
  }
  // @media (max-width: 400px) {
  //   height: 300px;
  // }
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
  ${({theme}) => !theme.isDark && `
  border: 1px solid ${theme.colors.primary};
  `}
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
              <div style={{width: '100%'}}>
              <Button href="https://coinmarketcap.com/currencies/metagaming-guild/" external fullWidth as='a'  style={{ borderRadius: '4px' }}>
                Buy MGG
              </Button>
              </div>
              <div style={{width: '100%'}}>
                <Button href="https://verify-with.blockpass.org/?clientId=dao_gaming_guild_limited_45e18&serviceName=DAO%20GAMING%20GUILD%20LIMITED&env=prod" external fullWidth as='a' style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '4px' }}>
                  Apply KYC
                </Button>
                <Text fontSize='10px'>
                  <em>MGG holders who are qualified to participate based on IGO Tier List are required to undergo KYC.</em>
                </Text>
              </div>
            </ButtonContainer>
          </StyledFlex>
          <AnimContainerAdapt>
            <LottieAnimation lotti={data} position="center" />
          </AnimContainerAdapt>
        </HomeContainerAdapt>
        <HomeContainer>
          <Flex style={{margin: '10px auto',}} padding="25px" flexDirection='column' alignItems='center'>
          <Text color="textSubtle" style={{ margin: '10px', fontSize: '20px', textAlign: 'center'}} >
            EXCLUSIVELY ON MULTIPLE CHAINS
          </Text>
          <Flex justifyContent='space-around' style={{ width: '100%'}} flexWrap="wrap">
          <img
              src="./images/icons/exclusive_binance.png"
              alt="ex-binance"
              style={{ verticalAlign: 'middle' }}
            />
            <img
              src="./images/icons/exclusive_eth.png"
              alt="ex-binance"
              style={{ verticalAlign: 'middle'}}
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
