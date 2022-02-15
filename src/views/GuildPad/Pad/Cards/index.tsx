import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Container from 'components/layout/Container'
import { AboutColumn as Column, TwoColumn, TierColumns } from 'components/Column'
import { Socials, IGuildpad, STATE, TYPE } from 'config/constants/types'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import Anchor from 'components/Launchpad/Anchor'
import SvgIcon from 'components/Launchpad/SvgIcon'
import { ReactComponent as MediumIcon } from 'components/Launchpad/icons/MediumIcon.svg'
import { Card as SCard, CardHeader as SCardHeader, Text, Heading, Flex, Button } from '@metagg/mgg-uikit'
import TokenLogo from 'components/Launchpad/Logo'
import { PostBody, NavOption } from '../../../../components/Launchpad/styled'
import Boxcard from '../BoxCard'


const GCard = styled(SCard)<{ src?: string }>`
  border: 2px solid ${(({theme}) => theme.colors.MGG_active)};
  border-radius: 5px;
  width: 100%;
  margin 0 8rem;
  @media screen and (max-width: 925px){
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
    }`
  }
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
            z-index: 1;
            background-image: url(${src});
            background-repeat: no-repeat;
            // background-attachment: fixed;
            background-position: center;
            background-size: cover;
        }
    `}
`
const TimerBox = styled(Flex)`
  & > * {
    flex: 1;
    margin-right: 10px;
  }
`
const TimerContainer = styled(Flex)`
  //background-color: rgba(41, 178, 19, 1);
`

const InfoBox = styled(Flex)`
    width; 100%;
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
  background-color: ${(({theme}) => theme.colors.MGG_container)};
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
  background-color: ${(({theme}) => theme.colors.MGG_container)};
  z-index: 1;
  margin: 1.5rem;
`
// COUNTDOWN TIMER
const CountDown: React.FC = () => {
  return (
    <TimerContainer justifyContent='right' padding="10px">
      <div style={{ padding: '0 3rem 0 0' }}>
        <Heading size="l">ROUND 1</Heading>
        <Text fontSize="12px"> ENDS IN</Text>
      </div>
      <TimerBox justifyContent="space-between">
        <div>
          <Heading size="l">10</Heading>
          <Text fontSize="12px"> DAYS </Text>
        </div>
        <div>
          <Heading size="l">20 </Heading>
          <Text fontSize="12px"> HOURS </Text>
        </div>
        <div>
          <Heading size="l">30</Heading>
          <Text fontSize="12px"> MINUTES</Text>
        </div>
        <div>
          <Heading size="l">40</Heading>
          <Text fontSize="12px"> SECONDS </Text>
        </div>
      </TimerBox>
    </TimerContainer>
  )
}

// SOCIALS LINKS IN HEADER
const SocMeds: React.FC<{socials: Socials, status: string}> = ({socials, status}) => {
  const theme = useContext(ThemeContext);
  return (
    <div style={{display: 'flex', alignItems: 'center', padding: '1rem'}}>
      <Flex>
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

        <StatusBox style={{marginLeft: '1rem'}} status={status.toLowerCase()} padding="10px">
          {status}
        </StatusBox>
      </Flex>
    </div>
  )
}

const TokenInformation: React.FC<{ raise: string; coinForSale: string; buyingCoin: string; type: string; sellingCoin: string}> = ({
  raise,
  coinForSale,
  buyingCoin,
  type,
  sellingCoin
}) => {
  const totalRaise = raise? `${raise} ${buyingCoin}` : `0 ${buyingCoin}`;

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
const CardHeader: React.FC<{ status: string, background?: string, guildpad: IGuildpad }> = ({ status, background, guildpad }) => (
  <Header src={background}>
    <TokenLogo
      tokenName={guildpad.sellingCoin.symbol}
      nameSize='xl'
      primaryToken={guildpad.sellingCoin}
      padding="0"
    />
  </Header>
)

// PROJECT CONTENT
const Content: React.FC<{guildpad: IGuildpad; }>= ({guildpad}) => {
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
    return (<p>sale</p>)
  }

  return (
    <PostBody style={{zIndex: 1, backgroundColor: `${theme.colors.MGG_container}`}}>
      <Flex
        alignItems="center"
        margin="10px 0px 20px 0px"
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
      >
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Project Description
        </NavOption>
      </Flex>
      {active === 1 ? renderDescription() : active === 2 && renderSale()}
    </PostBody>
  )
}

const Card: React.FC<{guildpad: IGuildpad}> = ({guildpad}) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const src = `/images/guildpad-assets/${guildpad.sellingCoin.symbol}/${guildpad.sellingCoin.symbol}Banner.png`

  // TEMP: ONLY PUTS BACKGROUND ON ACKNOLDGER
  const bgSrc = guildpad.title === 'Acknoledger' ? `/images/guildpad-assets/${guildpad.sellingCoin.symbol}/${guildpad.sellingCoin.symbol}PadBG.png` : '';

  return (
    <GCard src={bgSrc}>
      <CardHeader status="ONGOING" background={src} guildpad={guildpad}/>
      <Contain>
        <Flex>
          <ColumnTwo>
            <SocMeds socials={guildpad.socials} status="ONGOING"/>
            <CountDown />
          </ColumnTwo>
        </Flex>
        <ContainerBoxCard>
          {/* BOX CARD */}
          <Boxcard imgProps={{src: 'Chest3.png', size: '15rem'}} guildpad={guildpad}/>
        </ContainerBoxCard>

          <ContainerProjDesc>
              <Content guildpad={guildpad}  />
          </ContainerProjDesc>
      </Contain>
    </GCard>
  )
}

export default Card
