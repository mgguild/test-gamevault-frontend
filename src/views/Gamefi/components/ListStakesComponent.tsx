import React, { Dispatch, SetStateAction, useState, useContext, useMemo, useCallback, useEffect } from 'react'
import moment from 'moment'
import styled, { ThemeContext } from 'styled-components'
import { Flex, Text, Button, Input, Heading, useModal } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { getBalanceNumber, getDecimalAmount, toBigNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import ClaimModal from './Modals/WithdrawModal'
import { FarmWithStakedValue } from '../config'

const ButtonSM = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.MGG_container};
`

const Card = styled.div`
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${({ theme }) => theme.colors.MGG_accent2};
  display: grid;
  position: relative;
  padding: 1rem 1rem;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`

const StakesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  align-items: stretch;
`

const daysRemaining = (date: number, duration: number) => {
  const eventdate = moment(date).add(duration, 'days')
  const todaysdate = moment()
  return eventdate.diff(todaysdate, 'days')
}

interface ComponentProps {
  stakingType: string
  currentFarm?: FarmWithStakedValue
  currentPoolBased?: Pool
  account?: any
  chainId?: number
}

interface StakeProps {
  currentStake: FarmWithStakedValue | Pool
  pairSymbol: string
  stakeDetails: any
  chainId: number
}

const StakesCard: React.FC<StakeProps> = ({ currentStake, pairSymbol, stakeDetails, chainId }) => {
  const thisTier = currentStake.fixedAprConfigs.tiers[new BigNumber(stakeDetails.tier).toNumber()]
  const stakedAt = getDecimalAmount(new BigNumber(stakeDetails.stakedAt), 3).toNumber()
  const amount = getBalanceNumber(new BigNumber(stakeDetails.amount), currentStake.stakingToken.decimals)
  const profit = getBalanceNumber(new BigNumber(stakeDetails.profit), currentStake.stakingToken.decimals)
  const daysLeft = daysRemaining(stakedAt, thisTier.duration)

  const [onPresentUnstakeAction] = useModal(
    <ClaimModal
      chainId={chainId}
      stakingType="pool"
      currentStake={currentStake}
      pairSymbol={pairSymbol}
      maxFine={currentStake.fixedAprConfigs.maxFine}
      stakeDetails={stakeDetails}
      tier={thisTier}
      amount={amount}
      profit={profit}
      stakedAt={stakedAt}
      daysLeft={daysLeft}
    />,
  )

  const timeZone = new Intl.DateTimeFormat('en-us', { timeZoneName: 'short' })
    .formatToParts(new Date())
    .find((part) => part.type === 'timeZoneName').value

  return (
    <>
      <Card>
        <Flex style={{ textAlign: 'left' }}>
          <div>
            <Text color="black" fontSize="0.8rem">
              Duration:
            </Text>
            <Heading color="black">{thisTier.duration} days</Heading>
            {daysLeft > 0 ? (
              <Text style={{ color: 'white', textShadow: '1px 1px 1px black' }}>{daysLeft} days left</Text>
            ) : (
              <Text style={{ color: 'white', textShadow: '1px 1px 1px black' }}>Claimable</Text>
            )}
          </div>
        </Flex>
        <Flex style={{ justifyContent: 'end' }}>
          <div style={{ textAlign: 'end' }}>
            <Heading size="l" fontSize="0.9rem" color="black">
              Staked At:
            </Heading>
            <Text fontSize="0.9rem" color="black">
              {moment(stakedAt).format('ll')}
            </Text>
            <Text fontSize="0.9rem" color="black">
              {moment(stakedAt).format('LT')} {timeZone}
            </Text>
          </div>
        </Flex>

        <Flex style={{ textAlign: 'left' }}>
          <div>
            <Heading size="l" color="black">
              Staked:
            </Heading>
            <Text style={{ color: 'white', textShadow: '1px 1px 1px black' }}>{`${new BigNumber(
              amount,
            ).toFormat(4)} ${pairSymbol}`}</Text>
          </div>
        </Flex>

        <Flex style={{ justifyContent: 'end', alignItems: 'end', minWidth: '5.83rem', textAlign: 'right' }}>
          <div>
            <Heading size="l" fontSize="0.9rem" color="black">
              Recent Profit:
            </Heading>
            <Text style={{ color: 'white', textShadow: '1px 1px 1px black' }}>
              {new BigNumber(profit).toFormat(4)} {pairSymbol}
            </Text>
          </div>
        </Flex>
      </Card>
      <ButtonSM
        color="black"
        style={{ width: '100%', borderRadius: '0 0 0.5rem 0.5rem' }}
        onClick={() => onPresentUnstakeAction()}
      >
        {daysLeft > 0 ? <Text>Unstake</Text> : <Text>CLAIM</Text>}
      </ButtonSM>
    </>
  )
}

const Component: React.FC<ComponentProps> = ({ stakingType, currentFarm, currentPoolBased, account, chainId }) => {
  const theme = useContext(ThemeContext)
  const pairSymbol = stakingType === 'farm' ? currentFarm.lpSymbol : currentPoolBased.stakingToken.symbol
  const currentStake = stakingType === 'farm' ? currentFarm : currentPoolBased

  const userStakes = useMemo(() => {
    if (currentStake.userData && currentStake.userData.fixedApr) {
      return currentStake.userData.fixedApr.stakesDetails.filter((stake) =>
        new BigNumber(stake.amount).gt(new BigNumber(0)),
      )
    }

    return null
  }, [currentStake])

  return (
    <>
      {userStakes && userStakes.length > 0 ? (
        <StakesContainer>
          {userStakes.map((stake, index) => {
            return (
              <div style={{ width: '100%', flex: 1 }} key={stake.id}>
                <StakesCard
                  currentStake={currentStake}
                  pairSymbol={pairSymbol}
                  stakeDetails={stake}
                  chainId={chainId}
                />
              </div>
            )
          })}
        </StakesContainer>
      ) : (
        <Flex style={{ textAlign: 'center', justifyContent: 'center', width: '100%' }}>
          <Text>No Stakes</Text>
        </Flex>
      )}
    </>
  )
}

export default Component
