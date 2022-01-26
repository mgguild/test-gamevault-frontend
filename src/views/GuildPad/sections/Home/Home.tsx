import React, { useContext } from 'react'
import { Text, Flex, Heading, Button } from '@sparkpointio/sparkswap-uikit'
import useMedia from 'use-media'
import { ThemeContext } from 'styled-components'
import { ArrowDown } from 'react-feather'
import LottieAnimation from 'lottie'
import data from 'Animation/data.json'
import { StyledContainer, HomeContainer, AnimContainer, ButtonContainer } from './styled'
import PageSection from '../Layout'


const HomeSection: React.FC = () => {
  const theme = useContext(ThemeContext)
  const isMobile = useMedia({ maxWidth: 500 })

  return (
    <PageSection direction='column'>
      <StyledContainer>
        <HomeContainer>
          <Flex
            flexDirection="column"
            style={
              isMobile
                ? { textAlign: 'center', justifyContent: 'center', gridRow: 2, padding: '10px', rowGap: '20px' }
                : {
                    textAlign: 'left',
                    maxWidth: '900px',
                    justifyContent: 'center',
                    padding: '80px',
                    alignItems: 'flex-start',
                    rowGap: '40px',
                  }
            }
          >
            <Heading size={isMobile ? 'xl' : 'xxl'} color={theme.colors.primary}>
                 IGO Launchpad
            </Heading>
            <Text color="textSubtle" fontSize="19px">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam porro, ut ad magnam deserunt unde eos mollitia natus doloribus cumque quod possimus.
            </Text>
            <hr  style={{width: '100%', border: 'none', borderBottom: `1px solid ${theme.colors.primary}`}}/>
            <ButtonContainer>
              <Button fullWidth style={{ borderRadius: '4px' }}>
                BUY ON SWAP
              </Button>
              <Button fullWidth style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '4px' }}>
                Apply for IDO
              </Button>
            </ButtonContainer>
          </Flex>
          {/* <AnimContainer>
            <LottieAnimation lotti={data} position="center" />
          </AnimContainer> */}
          
        </HomeContainer>
        <HomeContainer>
          <Text color="textSubtle" style={isMobile ? { margin: '10px' } : { margin: '20px', fontSize: '20px' }}>
            EXCLUSIVELY ON{' '}
            <img
              src="./images/icons/exclusive_binance.png"
              alt="ex-binance"
              width="20vw"
              height="20vh"
              style={{ verticalAlign: 'middle' }}
            />{' '}
            BINANCE SMART CHAIN
          </Text>
        </HomeContainer>
        
      </StyledContainer>
      <Button style={{borderRadius: '50%', height: '50px', width: '50px', margin: '-50px auto 0px auto', background: theme.colors.MGG_container}}>
          <Text><ArrowDown color={theme.colors.MGG_accent2} /></Text>
      </Button>
    </PageSection>
  )
}

export default HomeSection