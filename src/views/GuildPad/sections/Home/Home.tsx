import React, { useContext } from 'react'
import { Text, Flex, Heading, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import { ArrowDown } from 'react-feather'
import LottieAnimation from 'lottie'
import data from 'Animation/data.json'
import { StyledContainer, HomeContainer, AnimContainer, ButtonContainer } from './styled'
import PageSection from '../Layout'

const StyledFlex = styled(Flex)`
  text-align: left;
  width: 900px;
  justify-content: center;
  padding: 80px;
  align-items: flex-start;
  row-gap: 40px;
`

const HomeSection: React.FC = () => {
  const theme = useContext(ThemeContext)

  return (
    <PageSection direction='column'>
      <StyledContainer>
        <HomeContainer>
          <StyledFlex flexDirection="column">
            <Heading size='xl' color={theme.colors.primary}>
                Acquire early access to the incoming P2E Games in the Metaverse
            </Heading>
            <Text color="textSubtle" fontSize="19px">
             IGO and INO Launchpad for exciting GameFi projects
            </Text>
            <hr  style={{width: '100%', border: 'none', borderBottom: `1px solid ${theme.colors.primary}`}}/>
            <ButtonContainer>
              <Button fullWidth style={{ borderRadius: '4px' }}>
                BUY MGG
              </Button>
              <Button fullWidth style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '4px' }}>
                Apply for KYC
              </Button>
            </ButtonContainer>
          </StyledFlex>
          {/* <AnimContainer>
            <LottieAnimation lotti={data} position="center" />
          </AnimContainer> */}
          
        </HomeContainer>
        <HomeContainer>
          <Flex style={{margin: '0px auto'}} flexDirection='column' alignItems='center'>
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
      <Button style={{borderRadius: '50%', height: '50px', width: '50px', margin: '-50px auto 0px auto', background: theme.colors.MGG_container}}>
          <Text><ArrowDown color={theme.colors.MGG_accent2} /></Text>
      </Button>
    </PageSection>
  )
}

export default HomeSection