import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { toNumber } from 'lodash'
import { Guildpad } from 'state/types'
import { Button, Flex, Heading, Progress, Text, useModal } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material'
import Logo from 'components/Launchpad/Logo'
import UnlockButton from 'components/UnlockButton'
import Timer from 'views/GuildPad/components/Timer'
import BuyIdoModal from 'views/GuildPad/components/Modals/BuyIdo'
import {
  ActionSection,
  AllocSection,
  ContainerBoxCard,
  DataRow,
  DetailSection,
  MarketCard,
  ProgressSection,
  TimerContainer,
} from './styled'
import ModalWhitelist from '../Modal'
import useToast from '../../../../hooks/useToast'


const CountDown: React.FC<{ round: string; start?: boolean; end?: number }> = ({ round, start, end }) => {
  const endDate = end
  const isStart = start

  const Renderer = (days?: number, hours?: number, minutes?: number, seconds?: number) => {
    return (
      <Flex justifyContent="space-between" style={{ width: '100%', padding: '5px'}}>
        <Flex flexDirection="column" flex='1'>
          <Heading size="xl">Round 1</Heading>
          <Text>Ends in</Text>
        </Flex>
        <Flex justifyContent='space-evenly' flex='1'>
          <Flex flexDirection='column'>
            <Heading size='xl'>{days}</Heading>
            <Text>DAYS</Text>
          </Flex>
          <Flex flexDirection='column'>
              <Heading size='xl'>{hours}</Heading>
              <Text>HOURS</Text>
          </Flex>
          <Flex flexDirection='column'>
              <Heading size='xl'>{minutes}</Heading>
              <Text>MINUTES</Text>
          </Flex>
          <Flex flexDirection='column'>
              <Heading size='xl'>{seconds}</Heading>
              <Text>SECONDS</Text>
          </Flex>
        </Flex>
      </Flex>
    )
  }

  return (
    <TimerContainer isStart={isStart} justifyContent="right" padding={isStart ? '10px' : '0px'}>
      <Timer dateSettings={{ isStart, end: endDate }} Renderer={Renderer} />
    </TimerContainer>
  ) 
}

const IdoCard: React.FC<{ guildpad: Guildpad; userDataLoaded: boolean }> = ({ guildpad, userDataLoaded }) => {
  const { account } = useWeb3React()
  const [useBuyIDOModal] = useModal(<BuyIdoModal guildpad={guildpad}/>)
  const details = guildpad.description
  const [whitelistModalShowed, setWhitelistModalShowed] = useState(false)

  const [showNotInWhitelistModal] = useModal(
    <ModalWhitelist onDismiss={() => {
      setWhitelistModalShowed(false)
    }} />,
  )

  useEffect(() => {
    if (account && !guildpad.userData.details.whitelist && !whitelistModalShowed && userDataLoaded) {
      showNotInWhitelistModal()
      setWhitelistModalShowed(true)
    }
  }, [account, guildpad, showNotInWhitelistModal, whitelistModalShowed, userDataLoaded])

  return (
    <ContainerBoxCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CountDown round="1" start end={guildpad.epochEndDate} />
          <Text color="rgba(216, 209, 232, 1)" fontSize="17px" padding='10px 0px 0px 0px' margin='10px 0px 0px 0px'>{details}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <MarketCard>
            <ProgressSection>
              <Heading>
                {`${guildpad.percentage}%`} {guildpad.sellingCoin.symbol} SOLD
              </Heading>
              <div>
                <Progress variant="flat" primaryStep={toNumber(guildpad.percentage)} />
                <Flex justifyContent="space-between">
                  <Text fontSize="12px">{guildpad.percentage}%</Text>
                  <Text fontSize="12px">{guildpad.totalSold} / {guildpad.totalSupply}</Text>
                </Flex>
              </div>
            </ProgressSection>
            <DetailSection>
              <DataRow>
                <Text>Total Raise</Text>
                <Text>{guildpad.totalRaise} {guildpad.buyingCoin.symbol}</Text>
              </DataRow>
              <DataRow>
                <Text>{guildpad.sellingCoin.symbol} Price</Text>
                <Text>{guildpad.tokenRate}</Text>
              </DataRow>
              <DataRow>
                <Text>{guildpad.sellingCoin.symbol} Sold</Text>
                <Text>{guildpad.totalSold}</Text>
              </DataRow>
              <DataRow modify>
                <Text>Max Allocation</Text>
                <Text>{guildpad.userData.details.maxPayableAmount?? '0'} {guildpad.sellingCoin.symbol}</Text>
              </DataRow>
            </DetailSection>
            <AllocSection>
              <Text>My Allocation</Text>
              <div>
                <Logo tokenSize='35px' tokenName={`${guildpad.userData.details.rewardedAmount ?? '0'} ${guildpad.sellingCoin.symbol}`} primaryToken={guildpad.sellingCoin} padding="0px" />
              </div>
            </AllocSection>
            <ActionSection>
              {!account ? (
                <UnlockButton customTitle="CONNECT WALLET TO PARTICIPATE" />
              ) : (
                <Button onClick={useBuyIDOModal} disabled={!guildpad.userData.details.whitelist} fullWidth> PURCHASE {guildpad.sellingCoin.symbol}</Button>
              )}
            </ActionSection>
          </MarketCard>
        </Grid>
      </Grid>
    </ContainerBoxCard>
  )
}

export default IdoCard
