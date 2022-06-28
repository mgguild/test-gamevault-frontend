import React, { Dispatch, SetStateAction, useContext, useState, useMemo, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import moment from 'moment'
import styled, { ThemeContext } from 'styled-components'
import { getBalanceNumber, toBigNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import { Grid } from '@mui/material'
import { Flex, Text, Button, Heading, Input, useModal } from '@metagg/mgg-uikit'
import { FarmWithStakedValue } from 'views/Gamefi/config'
import { Pool } from 'state/types'
import { Tiers } from 'config/constants/types'
import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import StakeModal from './Modals/StakeModal'
import InsufficientModal from './Modals/InsufficientModal'
import { Stats } from '../NewUI/styled'

const ButtonSM = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 4px;
`

const StyledDetails = styled(Flex)`
  width: 100%;
  flex-direction: column;
  & > * {
    justify-content: space-between;
    flex: 1;
    & :first-child {
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }
`

interface ComponentProps {
  dayDuration: number
  dayFunction: Dispatch<SetStateAction<number>>
  currentFarm?: FarmWithStakedValue
  stakingType: string
  currentPoolBased?: Pool
  account?: any
  chainId?: number
}

const Component: React.FC<ComponentProps> = ({
  dayDuration,
  dayFunction,
  currentFarm,
  currentPoolBased,
  stakingType,
  account,
  chainId,
}) => {
  const theme = useContext(ThemeContext)
  const { toastSuccess, toastError, toastWarning } = useToast()
  const pairSymbol = stakingType === 'farm' ? currentFarm.lpSymbol : currentPoolBased.stakingToken.symbol
  const currentStake = stakingType === 'farm' ? currentFarm : currentPoolBased
  const userData = currentStake.userData ?? null

  const { userTotalStaked, userStakingBal, userAllowance } = useMemo(() => {
    return {
      userTotalStaked: userData.fixedApr
        ? new BigNumber(
            getBalanceNumber(new BigNumber(userData.fixedApr.totalStaked), currentStake.stakingToken.decimals),
          )
        : BIG_ZERO,
      userStakingBal: userData
        ? new BigNumber(
            getBalanceNumber(new BigNumber(userData.stakingTokenBalance), currentStake.stakingToken.decimals),
          )
        : BIG_ZERO,
      userAllowance: userData
        ? new BigNumber(getBalanceNumber(new BigNumber(userData.allowance), currentStake.stakingToken.decimals))
        : BIG_ZERO,
    }
  }, [currentStake, userData])

  const [tierSelected, setTierSelected] = useState<Tiers>({ id: '0', duration: 0, APR: 0 })
  const [stakeAmount, setStakeAmount] = useState('')
  const [percentage, setPercentage] = useState('0.0')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        const val = e.currentTarget.value.replace(/,/g, '.')
        setStakeAmount(val)
      }
    },
    [setStakeAmount],
  )

  const handleTierChange = useCallback(
    (index: number) => {
      dayFunction(currentStake.fixedAprConfigs.tiers[index].duration)
      setTierSelected(currentStake.fixedAprConfigs.tiers[index])
      setPercentage(new BigNumber(currentStake.fixedAprConfigs.tiers[index].APR).div(new BigNumber(100)).toString())
    },
    [dayFunction, setPercentage, setTierSelected, currentStake],
  )

  const [onPresentStakeAction] = useModal(
    <StakeModal
      chainId={chainId}
      stakingType={stakingType}
      currentStake={currentStake}
      pairSymbol={pairSymbol}
      tierSelected={tierSelected}
      maxFine={currentStake.fixedAprConfigs.maxFine}
      stakeAmount={stakeAmount}
      userTotalStaked={userTotalStaked}
      userStakingBal={userStakingBal}
      userAllowance={userAllowance}
    />,
  )

  const [onPresentInsufficientAction] = useModal(
    <InsufficientModal
      chainId={chainId}
      pairSymbol={pairSymbol}
      stakingType={stakingType}
      currentStake={currentStake}
    />,
  )

  const handleStakeClick = useCallback(() => {
    if (!userStakingBal.lte(new BigNumber(stakeAmount))) {
      onPresentStakeAction()
    } else {
      onPresentInsufficientAction()
      // toastWarning('Insufficient balance!', 'Staking amount is greater then your current balance')
    }
  }, [onPresentStakeAction, onPresentInsufficientAction, stakeAmount, userStakingBal])

  return (
    <>
      <Flex justifyContent="center" style={{ width: '100%' }}>
        <Grid container spacing={{ xs: 2, md: 1 }} justifyContent="center">
          {[1, 2, 3, 4].map((index) => (
            <Grid key={index} item xs={12} sm={3} md={3}>
              <ButtonSM fullWidth onClick={() => handleTierChange(index)}>
                {`${currentStake.fixedAprConfigs.tiers[index].duration} Days`}
              </ButtonSM>
            </Grid>
          ))}
        </Grid>
      </Flex>
      <StyledDetails>
        <Flex style={{ width: '100%', flexFlow: 'row wrap', gap: '1rem', justifyContent: 'space-evenly' }}>
          {tierSelected.duration !== 0 ? (
            <>
              <Stats>
                <div>
                  <Heading size="l">{moment().add(tierSelected.duration, 'days').format('LL')}</Heading>
                  <Text fontSize="0.8rem">Claim On</Text>
                </div>
              </Stats>
              <Stats>
                <div>
                  <Heading size="l">{tierSelected.duration} days</Heading>
                  <Text fontSize="0.8rem">Selected Duration</Text>
                </div>
              </Stats>
              <Stats>
                <div>
                  <Heading size="l">{tierSelected.APR}%</Heading>
                  <Text fontSize="0.8rem">Annual Percentage Rate</Text>
                </div>
              </Stats>
            </>
          ) : (
            <Stats style={{ width: '100%', height: '3.3rem' }}>
              <Text>Select duration</Text>
            </Stats>
          )}
        </Flex>
        <hr style={{ width: '100%' }} />
        <Flex>
          <Text>Your balance</Text>
          <Text>
            {userStakingBal.toFormat()} {pairSymbol}
          </Text>
        </Flex>
        <Flex>
          <Text>Your total stake</Text>
          <Text>
            {userTotalStaked.toFormat()} {pairSymbol}
          </Text>
        </Flex>
      </StyledDetails>
      <Flex style={{ flex: '0 50%' }}>
        <Text>Amount</Text>
      </Flex>
      <Flex style={{ flex: '0 50%', justifyContent: 'end' }}>
        <ButtonSM
          onClick={() => {
            setStakeAmount(userStakingBal.toString())
          }}
        >
          Deposit Max
        </ButtonSM>
      </Flex>
      <Flex style={{ flex: '0 100%', position: 'relative' }}>
        <Input
          pattern={`^[0-9]*[.,]?[0-9]{0,${18}}$`}
          inputMode="decimal"
          step="any"
          min="0"
          value={stakeAmount}
          onChange={handleChange}
          style={{ padding: '1.5rem' }}
          placeholder="0"
          type="number"
        />
        <div style={{ position: 'absolute', top: '0.7rem', right: '1.5rem' }}>
          <Text color={theme.colors.textSubtle}>{pairSymbol}</Text>
        </div>
      </Flex>
      <Flex style={{ flex: '0 100%', justifyContent: 'center' }}>
        {account ? (
          <Button
            fullWidth
            onClick={handleStakeClick}
            disabled={tierSelected.duration === 0 || stakeAmount === '' || parseFloat(stakeAmount) <= 0.0}
          >
            Stake
          </Button>
        ) : (
          <UnlockButton />
        )}
      </Flex>
    </>
  )
}

export default Component
