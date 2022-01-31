import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { useWeb3React } from '@web3-react/core'
// import { Card as SCard, Text, Heading, Flex, Button } from '@sparkpointio/sparkswap-uikit'
// import TokenLogo from 'components/Launchpad/Logo'
// import UnlockButton from 'components/UnlockButton'
// import { TimerContainer, Header, StatusBox, TimerBox, InfoBox, InfoRow } from '../styled'
import { Card as SCard, CardHeader as SCardHeader, Text, Heading, Flex, Button } from '@metagg/mgg-uikit'
import TokenLogo from 'components/Launchpad/Logo'
import UnlockButton from 'components/UnlockButton'

const GCard = styled(SCard)`
 background: ${(({theme}) => theme.colors.MGG_container)};
 border: 2px solid ${(({theme}) => theme.colors.MGG_active)};
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
  // background-image: url('/images/icons/oreBG6.png');
  background-position: center;
  background-size: cover;
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
    width; 100%;
    & > * {
      margin-top: 5px;
    }
`

const InfoRow = styled(Flex)`
  width: 100%;
`

const CountDown: React.FC = () => {
  return (
    <TimerContainer justifyContent="space-between" padding="10px">
      <div style={{ textAlign: 'left' }}>
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

const TokenInformation: React.FC<{ raise: string; coinForSale: string; buyingCoin: string; type: string; sellingCoin: string}> = ({
  raise,
  coinForSale,
  buyingCoin,
  type,
  sellingCoin
}) => {
  const totalRaise = `${raise} ${buyingCoin}`

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

const CardHeader: React.FC<{ status: string }> = ({ status }) => (
  <Header>
    <StatusBox status={status.toLowerCase()} padding="10px">
      {status}
    </StatusBox>
  </Header>
)

const Card: React.FC = () => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext);
  return (
    <GCard>
      <CardHeader status="ONGOING" />
      <CountDown />
      <TokenLogo tokenName="MGG" image="MGG" subtitle="MGG" />
      <TokenInformation raise="100" coinForSale="1000000" buyingCoin="BNB" type="Vesting" sellingCoin="MGG" />
      <Flex padding="24px">
        {!account ? (
          <UnlockButton fullWidth />
        ) : (
          <Button fullWidth style={{ backgroundColor: 'rgba(41, 178, 19, 1)', borderRadius: '5px' }}>
            Participate
          </Button>
        )}
      </Flex>
    </GCard>
  )
}

export default Card
