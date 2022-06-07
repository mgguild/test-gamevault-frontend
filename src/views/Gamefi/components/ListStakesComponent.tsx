import React, { Dispatch, SetStateAction, useState, useContext, useMemo, useCallback, useEffect } from 'react'
import moment from 'moment'
import styled, { ThemeContext } from 'styled-components'
import { Flex, Text, Button, Input, Heading, useModal } from '@metagg/mgg-uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber, getDecimalAmount, toBigNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
// import ClaimModal from './Modals/WithdrawModal'
import { FarmWithStakedValue } from '../config'

BigNumber.config({
  DECIMAL_PLACES: 4,
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
  },
})

const ButtonSM = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.MGG_container};
`

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.MGG_accent2};
  display: grid;
  position: relative;
  padding: 1rem 1.5rem;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
`

const StakesContainer = styled.div`
  display: grid;
  width: 100%;
  flex-flow: row wrap;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-columns: 1fr 1fr;
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
  const daysLeft = daysRemaining(stakedAt, thisTier.duration)

  // const [onPresentUnstakeAction] = useModal(
  //   <ClaimModal
  //     chainId={chainId}
  //     stakingType='pool'
  //     currentStake={currentStake}
  //     pairSymbol={pairSymbol}
  //     maxFine={currentStake.fixedAprConfigs.maxFine}
  //     stakeDetails={stakeDetails}
  //     tier={thisTier}
  //     amount={amount}
  //     stakedAt={stakedAt}
  //     daysLeft={daysLeft}
  //   />
  // )

  return (
    <>
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
            {moment(stakedAt).format('LLL')} GMT
          </Text>
        </div>
      </Flex>

      <Flex style={{ textAlign: 'left' }}>
        <div>
          <Heading size="l" color="black">
            Staked:
          </Heading>
          <Text style={{ color: 'white', textShadow: '1px 1px 1px black' }}>{`${amount} ${pairSymbol}`}</Text>
        </div>
      </Flex>

      <Flex style={{ justifyContent: 'end', alignItems: 'end' }}>
        <div>
          <ButtonSM
            color="black"
            // onClick={() => onPresentUnstakeAction()}
          >
            <Text>CLAIM</Text>
          </ButtonSM>
        </div>
      </Flex>
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
      {userStakes ? (
        <StakesContainer>
          {userStakes.map((stake, index) => {
            return (
              <>
                <Card key={stake.id}>
                  <StakesCard
                    currentStake={currentStake}
                    pairSymbol={pairSymbol}
                    stakeDetails={stake}
                    chainId={chainId}
                  />
                </Card>
              </>
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
