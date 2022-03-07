import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/formatBalance'
import { Guildpad } from 'state/types'
import { Text, Heading, Progress, Flex, Button, useModal } from '@metagg/mgg-uikit'
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
    <TimerContainer justifyContent="right" padding={isStart ? '10px' : '0px'}>
      {isStart && <Timer dateSettings={{ isStart, end: endDate }} Renderer={Renderer} />}
    </TimerContainer>
  )
}

const IdoCard: React.FC<{ guildpad: Guildpad; userDataLoaded: boolean }> = ({ guildpad, userDataLoaded }) => {
  const { account } = useWeb3React()
  const [useBuyIDOModal] = useModal(<BuyIdoModal guildpad={guildpad}/>)

  const details = guildpad.description
  const percent = 81 // Rate
  const progress = `118 / 150 BNB`

  // Guildpad details:
  const price = `0.001 ${guildpad.buyingCoin.symbol}`
  const sold = `${guildpad.totalSold}`
  const totalRaised = getBalanceNumber(new BigNumber(guildpad.totalRaise))
  const userAllocation = `NaN ${guildpad.sellingCoin.symbol}`
  const maxSwap = `N/A ${guildpad.buyingCoin.symbol}`

  return (
    <ContainerBoxCard>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CountDown round="1" start end={1646351540000} />
          <Text color="rgba(216, 209, 232, 1)" fontSize="17px" padding='10px 0px 0px 0px' margin='10px 0px 0px 0px'>{details}</Text>
        </Grid>
        <Grid item xs={12} md={6}>
          <MarketCard>
            <ProgressSection>
              <Heading>
                {`${percent}%`} {guildpad.sellingCoin.symbol} SOLD
              </Heading>
              <div>
                <Progress variant="flat" primaryStep={percent} />
                <Flex justifyContent="space-between">
                  <Text fontSize="12px">{percent}%</Text>
                  <Text fontSize="12px">{progress}</Text>
                </Flex>
              </div>
            </ProgressSection>
            <DetailSection>
              <DataRow>
                <Text>{guildpad.sellingCoin.symbol} Price</Text>
                <Text>{price}</Text>
              </DataRow>
              <DataRow>
                <Text>{guildpad.sellingCoin.symbol} Sold</Text>
                <Text>{sold}</Text>
              </DataRow>
              <DataRow>
                <Text>Total Raise</Text>
                <Text>{totalRaised} {guildpad.buyingCoin.symbol}</Text>
              </DataRow>
              <DataRow modify>
                <Text>My Allocation</Text>
                <Text>{userAllocation}</Text>
              </DataRow>
              <DataRow modify>
                <Text>Max BNB Swap</Text>
                <Text>{maxSwap}</Text>
              </DataRow>
            </DetailSection>
            <AllocSection>
              <Text>My Allocation</Text>
              <div>
                <Logo tokenName={guildpad.sellingCoin.symbol} primaryToken={guildpad.sellingCoin} padding="0px" />
              </div>
            </AllocSection>
            <ActionSection>
              {!account ? (
                <UnlockButton customTitle="CONNECT WALLET TO PARTICIPATE" />
              ) : (
                <Button onClick={useBuyIDOModal}  fullWidth> PURCHASE {guildpad.sellingCoin.symbol}</Button>
              )}
            </ActionSection>
          </MarketCard>
        </Grid>
      </Grid>
    </ContainerBoxCard>
  )
}

export default IdoCard
