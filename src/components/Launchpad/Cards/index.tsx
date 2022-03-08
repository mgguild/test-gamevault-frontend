import BigNumber from 'bignumber.js'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Timer from 'views/GuildPad/components/Timer'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE } from 'config/constants/types'
import { useFetchBanner } from 'utils/assetFetch'
import { Button, Card as SCard, CardHeader as SCardHeader, Flex, Heading, Text } from '@metagg/mgg-uikit'
import TokenLogo from 'components/Launchpad/Logo'
import UnlockButton from 'components/UnlockButton'
import { getStatus } from 'utils/guildpadHelpers'
import { getBalanceAmount } from 'utils/formatBalance'

const GCard = styled(SCard)`
  background: ${({ theme }) => theme.colors.MGG_container};
  border: 2px solid ${({ theme }) => theme.colors.MGG_active};
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
            opacity: ${theme.isDark ? 0.2 : 0.5};
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
  & > * {
    position: relative;
    z-index: 2;
  }
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
  width: 100%;
  & > * {
    margin-top: 5px;
  }
`

const InfoRow = styled(Flex)`
  width: 100%;
`

const CountDown: React.FC<{ round: string, start?: boolean; end?: number }> = ({ round, start, end }) => {
  const endDate = end
  const isStart = start

  const Renderer = (days?: number, hours?: number, minutes?: number, seconds?: number) => {
    return (
      <TimerContainer justifyContent="space-between" padding="10px">
        <div style={{ textAlign: 'left' }}>
          <Heading size="l">ROUND {round}</Heading>
          <Text fontSize="12px"> ENDS IN</Text>
        </div>
        <TimerBox justifyContent="space-between">
          <div>
            <Heading size="l">{days}</Heading>
            <Text fontSize="12px"> DAYS </Text>
          </div>
          <div>
            <Heading size="l">{hours}</Heading>
            <Text fontSize="12px"> HOURS </Text>
          </div>
          <div>
            <Heading size="l">{minutes}</Heading>
            <Text fontSize="12px"> MINUTES</Text>
          </div>
          <div>
            <Heading size="l">{seconds}</Heading>
            <Text fontSize="12px"> SECONDS </Text>
          </div>
        </TimerBox>
      </TimerContainer>
    )
  }
  return <Timer dateSettings={{ isStart, end: endDate }} Renderer={Renderer} />
}

const TokenInformation: React.FC<{
  totalRaise: string
  boxesForSale: string
  buyingCoin: string
  type: string
  sellingCoin: string
  gpadType?: string
}> = ({ totalRaise, boxesForSale, buyingCoin, type, sellingCoin , gpadType = 'INO'}) => {
  return (
    <InfoBox flexDirection="column" padding="0px 24px 12px 24px">
      <InfoRow justifyContent="space-between">
        <Text>Total Raised</Text>
        <Text bold>
          {totalRaise ?? 0} {buyingCoin}
        </Text>
      </InfoRow>
      <InfoRow justifyContent="space-between">
        <Text>{gpadType === TYPE.INO ? 'Boxes' : sellingCoin} for Sale</Text>
        <Text bold>{boxesForSale}</Text>
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

const CardHeader: React.FC<{ status: string; background?: string }> = ({ status, background }) => (
  <Header src={background}>
    <StatusBox status={status.toLowerCase()} padding="10px">
      {status}
    </StatusBox>
  </Header>
)

const Card: React.FC<{ guildpad: GuildpadConfig }> = ({ guildpad }) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const src = useFetchBanner(guildpad.sellingCoin.symbol)
  const status = getStatus(guildpad)

  return (
    <GCard>
      <CardHeader status={status} background={src} />
      <CountDown round={guildpad.round} start={status === GUILDPAD_STATUS.ongoing} end={guildpad.epochEndDate} />
      <TokenLogo
        tokenName={guildpad.sellingCoin.symbol}
        primaryToken={guildpad.sellingCoin}
        subtitle={guildpad.title}
      />
      <TokenInformation
        totalRaise={guildpad.totalRaise}
        boxesForSale={guildpad.totalSupply.toString()}
        buyingCoin={guildpad.buyingCoin.symbol}
        type={guildpad.distribution}
        sellingCoin={guildpad.sellingCoin.symbol}
        gpadType={guildpad.type}
      />
      <Flex padding="24px">
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
