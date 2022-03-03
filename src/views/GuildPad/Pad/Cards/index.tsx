import React, { useContext, useState } from 'react'
// import Countdown from 'react-countdown'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Container from 'components/layout/Container'
import { AboutColumn as Column, TwoColumn, TierColumns } from 'components/Column'
import { Socials, GuildpadConfig, GUILDPAD_STATUS, TYPE } from 'config/constants/types'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import { useFetchBanner, useFetchPadBG } from 'utils/assetFetch'
import Timer from 'views/GuildPad/components/Timer'
import { getStatus } from 'utils/guildpadHelpers'
import Anchor from 'components/Launchpad/Anchor'
import SvgIcon from 'components/Launchpad/SvgIcon'
import { ReactComponent as MediumIcon } from 'components/Launchpad/icons/MediumIcon.svg'
import { Card as SCard, CardHeader as SCardHeader, Text, Heading, Flex, Button } from '@metagg/mgg-uikit'
import TokenLogo from 'components/Launchpad/Logo'
import { PostBody, NavOption, SaleContainer, SaleRow } from '../../../../components/Launchpad/styled'
import Boxcard from '../BoxCard'
import '../../../../css/styleFX.css'
import Content from '../../../../components/Launchpad/Content'
import IdoCard from './Ido'

const GCard = styled(SCard)<{ src?: string }>`
  border: 2px solid ${({ theme }) => theme.colors.MGG_active};
  border-radius: 5px;
  width: 100%;
  margin: 0 8rem;
  background: #101010;
  @media screen and (max-width: 925px) {
    margin: 0px auto;
  }
  ${({ src, theme }) =>
    src &&
    `&:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      opacity: ${theme.isDark ? 0.1 : 0.4};
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: url(${src});
      background-repeat: no-repeat;
      // background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }`}
`

const Header = styled(SCardHeader)<{ src?: string }>`
  display: flex;
  padding: 15px;
  align-items: center;
  position: relative;
  height: 10vh;
  justify-content: flex-start;
  background: #101010;
  ${({ src, theme }) =>
    src &&
    `
        &:before {
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            opacity: ${theme.isDark ? 0.3 : 0.6};
            width: 100%;
            height: 100%;
            z-index: 0;
            background-image: url(${src});
            background-repeat: no-repeat;
            // background-attachment: fixed;
            background-position: top;
            background-size: cover;
        }
    `}
`
const TimerBox = styled(Flex)`
  display: grid;
  position: relative;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
  text-align: center;
  & > * {
    flex: 1;
    margin-right: 0px;
  }
`
const TimerContainer = styled(Flex)`
  z-index: 1;
  //background-color: rgba(41, 178, 19, 1);
`

const InfoBox = styled(Flex)`
  width: 100%;
  & > * {
    margin-top: 5px;
  }
`

const InfoRow = styled(Flex)`
  width: 100%;
`

const ColumnTwo = styled(TwoColumn)`
  z-index: 1;
  max-width: 100%;
`

const Contain = styled(Container)`
  padding: 0;
  margin: 0;
  max-width: 100%;
`

const ContainerBoxCard = styled(Flex)`
  max-width: 100%;
  margin: 4rem 5rem;
  align-items: center;
  justify-content: center;
`

const ContainerProjDesc = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.MGG_container};
  z-index: 1;
  position: relative;
  margin: 1.5rem;
`
const Box = styled.div`
  height: 100%;
  min-width: 100px;
`

const HOrbitron = styled(Heading)`
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: Orbitron !important;
  line-height: 0.7em;
  color: grey;
`
const TimeSpan = styled.div`
  margin: 1rem 0 1.5rem 0;
`

// COUNTDOWN TIMER
const CountDown: React.FC<{ round: string, start?:boolean, end?:number}> = ({round, start, end}) => {
  const endDate = end
  const isStart = start;

  const Renderer = (days?: number, hours?: number, minutes?: number, seconds?: number) => {
    return(
      <div>
      <Heading color='white' style={{textAlign: 'center', paddingTop: '0.5rem'}} size="l">ROUND {round} ENDS IN</Heading>
      <TimerContainer>
      <TimerBox>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{days}</HOrbitron>
            </TimeSpan>
            <Text color='white' fontSize="1rem"> DAYS </Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{hours}</HOrbitron>
            </TimeSpan>
            <Text color='white' fontSize="1rem"> HOURS </Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{minutes}</HOrbitron>
            </TimeSpan>
            <Text color='white' fontSize="1rem"> MINUTES</Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{seconds}</HOrbitron>
            </TimeSpan>
            <Text color='white' fontSize="1rem"> SECONDS</Text>
          </Box>
        </TimerBox>
      </TimerContainer>
      </div>
    )
   }

  return (
    <TimerContainer justifyContent="right" padding={isStart? '10px':'0px'}>
      { isStart ? (
        <Timer
        dateSettings={{ isStart, end: endDate }}
        Renderer={Renderer}
       />
      ) : (
        <Heading className='glow' size='xl' color='white' textTransform='uppercase' style={{whiteSpace: 'nowrap', letterSpacing: ' 0.2rem'}}>
          「 Round Ended 」
        </Heading>
      )}
    </TimerContainer>
  )
}

// SOCIALS LINKS IN HEADER
const SocMeds: React.FC<{ socials: Socials; status: string }> = ({ socials, status }) => {
  const theme = useContext(ThemeContext)
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
      <Flex>
        <Flex margin="0.2rem 0 0 0">
          {socials?.website && (
            <Anchor href={socials?.website}>
              <Globe size="20px" color={theme.colors.text} />
            </Anchor>
          )}
          {socials?.twitter && (
            <Anchor href={socials?.twitter}>
              <Twitter size="20px" color={theme.colors.text} />
            </Anchor>
          )}
          {socials?.telegram && (
            <Anchor href={socials?.telegram}>
              <Send size="20px" color={theme.colors.text} />
            </Anchor>
          )}
          {socials?.discord && (
            <Anchor href={socials?.discord}>
              <SiDiscord size="20px" color={theme.colors.text} />
            </Anchor>
          )}
          {socials?.medium && (
            <Anchor href={socials?.medium}>
              <SvgIcon width={20} Icon={MediumIcon} />
            </Anchor>
          )}
          {socials?.youtube && (
            <Anchor href={socials?.youtube}>
              <SiYoutube width={20} color={theme.colors.text} />
            </Anchor>
          )}
        </Flex>
      </Flex>
    </div>
  )
}

const TokenInformation: React.FC<{
  raise: string
  coinForSale: string
  buyingCoin: string
  type: string
  sellingCoin: string
}> = ({ raise, coinForSale, buyingCoin, type, sellingCoin }) => {
  const totalRaise = raise ? `${raise} ${buyingCoin}` : `0 ${buyingCoin}`

  return (
    <InfoBox flexDirection="column" padding="0px 24px 12px 24px">
      <InfoRow justifyContent="space-between">
        <Text>Total Raised</Text>
        <Text bold>{totalRaise}</Text>
      </InfoRow>
      <InfoRow justifyContent="space-between">
        <Text>{`${sellingCoin} for Sale`}</Text>
        <Text bold>{coinForSale}</Text>
      </InfoRow>
      <InfoRow justifyContent="space-between">
        <Text>Buying Coin</Text>
        <Text bold>{buyingCoin}</Text>
      </InfoRow>
      <InfoRow justifyContent="space-between">
        <Text>Distribution Type</Text>
        <Text bold>{type}</Text>
      </InfoRow>
    </InfoBox>
  )
}

const StatusColor = {
  ongoing: '#32a31b',
  upcoming: '#7a1ba3',
  completed: '#8e98a5',
}

const StatusBox = styled(Flex)<{ status: string }>`
  background-color: ${({ status, theme }) => (status ? StatusColor[status] : theme.colors.primary)};
  border-radius: 3px;
`
// CARD HEADER
const CardHeader: React.FC<{ status: string; background?: string; guildpad: GuildpadConfig }> = ({
  status,
  background,
  guildpad,
}) => (
  <Header src={background}>
    <Flex style={{zIndex: 1, width: '100%'}}>
      <ColumnTwo>
        <TokenLogo
          tokenName={guildpad.sellingCoin.symbol}
          nameSize='xl'
          primaryToken={guildpad.sellingCoin}
          padding="0"
          socMeds={guildpad.socials}
          color="white"
        />
        <Flex justifyContent='right'>
          <div>
            <StatusBox status={status.toLowerCase()} padding="10px">
              {status.toUpperCase()}
            </StatusBox>
          </div>
        </Flex>
      </ColumnTwo>
    </Flex>
  </Header>
)


const Card: React.FC<{ guildpad: GuildpadConfig, userDataLoaded: boolean }> = ({ guildpad, userDataLoaded }) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const src = useFetchBanner(guildpad.sellingCoin.symbol)
  const bgSrc = useFetchPadBG(guildpad.sellingCoin.symbol)
  const status = getStatus(guildpad)

  const renderType = (type:string) => {
    switch(type){
      case TYPE.INO:
        return (
          <>
            <Flex
          className='crt'
          style={{
            position: 'relative',
            background: 'black',
            minHeight: '6rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CountDown round={guildpad.round} start={status === GUILDPAD_STATUS.ongoing} end={guildpad.epochEndDate}/>
        </Flex>
        <ContainerBoxCard>
          {/* BOX CARD */}
          <Boxcard imgProps={{ src: 'Chest3.png', size: '15rem' }} guildpad={guildpad} userDataLoaded={userDataLoaded} />
        </ContainerBoxCard>
        <ContainerProjDesc>
          <Content guildpad={guildpad}/>
        </ContainerProjDesc>
          </>
        )
      case TYPE.IDO:
        return (
          <>
            <IdoCard guildpad={guildpad} userDataLoaded={userDataLoaded} />
            <ContainerProjDesc>
              <Content guildpad={guildpad} />
            </ContainerProjDesc>
          </>
        )
      default:
        return <Text>Please Wait</Text>
    }
  }

 
  return (
    <GCard src={bgSrc}>
      <CardHeader status={status} background={src} guildpad={guildpad}/>
      <Contain>
      { renderType(guildpad.type) }
        
      </Contain>
    </GCard>
  )
}

export default Card