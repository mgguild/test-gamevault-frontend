import React, { useContext, useState } from 'react'
import Countdown from 'react-countdown'
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


const GCard = styled(SCard)<{ src?: string }>`
  border: 2px solid ${({ theme }) => theme.colors.MGG_active};
  border-radius: 5px;
  width: 100%;
  margin: 0 8rem;
  @media screen and (max-width: 925px) {
    margin: 0px auto;
  }
  ${({ src }) =>
    src &&
    `&:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.1;
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
  ${({ src }) =>
    src &&
    `
        &:before {
            content: ' ';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0.3;
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
const CountDown: React.FC<{start?:boolean, end?:number}> = ({start, end}) => {
  const endDate = end
  const isStart = start;

  const Renderer = (days?: number, hours?: number, minutes?: number, seconds?: number) => {
    return(
      <div>
        <Heading style={{textAlign: 'center', paddingTop: '0.5rem'}} size="l">ROUND 1 ENDS IN</Heading>
      <TimerContainer>
      <TimerBox>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{days}</HOrbitron>
            </TimeSpan>
            <Text fontSize="1rem"> DAYS </Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{hours}</HOrbitron>
            </TimeSpan>
            <Text fontSize="1rem"> HOURS </Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{minutes}</HOrbitron>
            </TimeSpan>
            <Text fontSize="1rem"> MINUTES</Text>
          </Box>
          <Box>
            <TimeSpan>
              <HOrbitron size="xl" className='glow'>{seconds}</HOrbitron>
            </TimeSpan>
            <Text fontSize="1rem"> SECONDS</Text>
          </Box>
        </TimerBox>
      </TimerContainer>
      </div>
    )
   }

  return (
    <TimerContainer justifyContent="right" padding="10px">
      { isStart ? (
        <Timer
        dateSettings={{ isStart, end: endDate }}
        Renderer={Renderer}
      />
      ) : (
        ''
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

// PROJECT CONTENT
const Content: React.FC<{ guildpad: GuildpadConfig,  userDataLoaded: boolean, rarity?: string }> = ({
  guildpad,
  userDataLoaded,
  rarity = '1',
}) => {
  const theme = useContext(ThemeContext)
  const [active, setActive] = useState(1)

  const renderDescription = () => {
    const description = guildpad.description !== '' ? guildpad.description : 'No description'

    return (
      <Text color="textSubtle" margin="10px 0px" style={{ lineHeight: '2em' }}>
        {description}
      </Text>
    )
  }

  const renderSale = () => {
    const price = guildpad.boxInfo[rarity].price !== '0' ? guildpad.boxInfo[rarity].price : 'TBA'
    const ratio = guildpad.inoDetails.ratio && guildpad.inoDetails.ratio
    const boxes = guildpad.inoDetails.boxes ?? 'TBA'
    const start = guildpad.date.start ?? 'TBA'
    const end = guildpad.date.end ?? 'TBA'
    const distribution = guildpad.distribution
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'

    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <div style={{textAlign: 'right'}}>
              <Text>{price !== 'TBA' ? `${price} ${guildpad.buyingCoin.symbol} (1425 WBOND)` : price }</Text>
              { price !== 'TBA' && <Text fontSize='12px'>(<em>as of Feb 18, 2022 8PM GMT+8</em>)</Text> }
            </div>
          </SaleRow>
          {ratio && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Ratio</Text>
              <Text>{guildpad.inoDetails.ratio}</Text>
            </SaleRow>
          )}
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Start Time</Text>
            <Text>{start}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale End Time</Text>
            <Text>{end}</Text>
          </SaleRow>
        </Flex>
        <Flex flexDirection="column">
          {guildpad.type === TYPE.INO && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Boxes for Sale</Text>
              <Text>{boxes}</Text>
            </SaleRow>
          )}
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">{guildpad.type === TYPE.INO ? 'NFT' : 'TOKEN'} Distribution</Text>
            <Text>{distribution}</Text>
          </SaleRow>
          {guildpad.type === TYPE.IDO && (
            <>
              <SaleRow justifyContent="space-between">
                <Text color="textSubtle">Initial Market Cap</Text>
                <Text>{initMarketCap}</Text>
              </SaleRow>
              <SaleRow justifyContent="space-between">
                <Text color="textSubtle">Initial Token Circulation</Text>
                <Text>{initTokenCirc}</Text>
              </SaleRow>
            </>
          )}
        </Flex>
      </SaleContainer>
    )
  }

  return (
    <PostBody style={{ zIndex: 1, backgroundColor: `${theme.colors.MGG_container}` }}>
      <Flex
        alignItems="center"
        margin="10px 0px 20px 0px"
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
      >
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Project Description
        </NavOption>
        <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
          {guildpad.type === TYPE.INO? 'NFT' : 'TOKEN'} Sale
        </NavOption>
      </Flex>
      {active === 1 ? renderDescription() : active === 2 && renderSale()}
    </PostBody>
  )
}

const Card: React.FC<{ guildpad: GuildpadConfig, userDataLoaded: boolean }> = ({ guildpad, userDataLoaded }) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const src = useFetchBanner(guildpad.sellingCoin.symbol)
  const bgSrc = useFetchPadBG(guildpad.sellingCoin.symbol)
  const status = getStatus(guildpad)

  return (
    <GCard src={bgSrc}>
      <CardHeader status={status} background={src} guildpad={guildpad}/>
      <Contain>
        <Flex justifyContent='center' style={{background: 'black'}}>
        <CountDown start={status === GUILDPAD_STATUS.ongoing} end={guildpad.epochEndDate}/>
        </Flex>
        <ContainerBoxCard>
          {/* BOX CARD */}
          <Boxcard imgProps={{ src: 'Chest3.png', size: '15rem' }} guildpad={guildpad} userDataLoaded={userDataLoaded} />
        </ContainerBoxCard>
        <ContainerProjDesc>
          <Content guildpad={guildpad} userDataLoaded={userDataLoaded} />
        </ContainerProjDesc>
      </Contain>
    </GCard>
  )
}

export default Card
