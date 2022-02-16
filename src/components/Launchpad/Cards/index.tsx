import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { GuildpadConfig } from 'config/constants/types'
import { Button, Card as SCard, CardHeader as SCardHeader, Flex, Heading, Text } from '@metagg/mgg-uikit'
import TokenLogo from 'components/Launchpad/Logo'
import UnlockButton from 'components/UnlockButton'
import history from '../../../routerHistory'
import { Guildpad } from '../../../state/types'


const GCard = styled(SCard)`
  background: ${(({ theme }) => theme.colors.MGG_container)};
  border: 2px solid ${(({ theme }) => theme.colors.MGG_active)};
  border-radius: 5px;
  width: 100%;
  margin: 0px auto;
`

const Header = styled(SCardHeader)<{ src?: string }>`
  display: flex;
  padding: 20px;
  align-items: flex-start;
  position: relative;
  height: 20vh;
  justify-content: flex-end;
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
  background-color: rgba(41, 178, 19, 1);
`

const InfoBox = styled(Flex)`
  width;
100%;
& > * {
  margin-top: 5px;
}
`

const InfoRow = styled(Flex)`
  width: 100%;
`

const CountDown: React.FC = () => {
  return (
    <TimerContainer justifyContent='space-between' padding='10px'>
      <div style={{ textAlign: 'left' }}>
        <Heading size='l'>ROUND 1</Heading>
        <Text fontSize='12px'> ENDS IN</Text>
      </div>
      <TimerBox justifyContent='space-between'>
        <div>
          <Heading size='l'>10</Heading>
          <Text fontSize='12px'> DAYS </Text>
        </div>
        <div>
          <Heading size='l'>20 </Heading>
          <Text fontSize='12px'> HOURS </Text>
        </div>
        <div>
          <Heading size='l'>30</Heading>
          <Text fontSize='12px'> MINUTES</Text>
        </div>
        <div>
          <Heading size='l'>40</Heading>
          <Text fontSize='12px'> SECONDS </Text>
        </div>
      </TimerBox>
    </TimerContainer>
  )
}

const TokenInformation: React.FC<{ raise: string; coinForSale: string; buyingCoin: string; type: string; sellingCoin: string }> = ({
                                                                                                                                     raise,
                                                                                                                                     coinForSale,
                                                                                                                                     buyingCoin,
                                                                                                                                     type,
                                                                                                                                     sellingCoin,
                                                                                                                                   }) => {
  const totalRaise = raise ? `${raise} ${buyingCoin}` : `0 ${buyingCoin}`

  return (
    <InfoBox flexDirection='column' padding='0px 24px 12px 24px'>
      <InfoRow justifyContent='space-between'>
        <Text>Total Raised</Text>
        <Text bold>{totalRaise}</Text>
      </InfoRow>
      <InfoRow justifyContent='space-between'>
        <Text>{`${sellingCoin} for Sale`}</Text>
        <Text bold>{coinForSale}</Text>
      </InfoRow>
      <InfoRow justifyContent='space-between'>
        <Text>Buying Coin</Text>
        <Text bold>{buyingCoin}</Text>
      </InfoRow>
      <InfoRow justifyContent='space-between'>
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

const CardHeader: React.FC<{ status: string, background?: string }> = ({ status, background }) => (
  <Header src={background}>
    <StatusBox status={status.toLowerCase()} padding='10px'>
      {status}
    </StatusBox>
  </Header>
)

const Card: React.FC<{ guildpad: GuildpadConfig }> = ({ guildpad }) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const src = `/images/guildpad-assets/${guildpad.sellingCoin.symbol}Banner.png`

  // const handleParticipate = (gpad: Guildpad) => {
  //   history.push(`/launchpad/${gpad.title}`)
  // }

  return (
    <GCard>
      <CardHeader status='ONGOING' background={src} />
      <CountDown />
      <TokenLogo tokenName={guildpad.sellingCoin.symbol} primaryToken={guildpad.sellingCoin}
                 subtitle={guildpad.title} />
      <TokenInformation raise={guildpad.FundstoRaise} coinForSale={guildpad.available}
                        buyingCoin={guildpad.buyingCoin.symbol} type={guildpad.distribution}
                        sellingCoin={guildpad.sellingCoin.symbol} />
      <Flex padding='24px'>
        {!account ? (
          <UnlockButton fullWidth />
        ) : (
          <Link to={`/launchpad/${guildpad.title}`} style={{ width: '100%' }}>
            <Button fullWidth style={{ backgroundColor: 'rgba(41, 178, 19, 1)', borderRadius: '5px' }}>
              Participate
            </Button>
          </Link>
        )}
      </Flex>
    </GCard>
  )
}

export default Card
