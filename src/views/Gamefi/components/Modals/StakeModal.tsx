import React, { useEffect, useState, useRef, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Slider, BalanceInput, AutoRenewIcon, Link } from '@pancakeswap/uikit'
import { Modal, Text, Flex, Heading, Image, Button } from '@metagg/mgg-uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_EXCHANGE_URL } from 'config'
import { useSousStake, useFixedAprPoolStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { useSousApprove, useSousApproveWithAmount } from 'hooks/useApprove'
import { useTokenAllowance } from 'hooks/useTokenBalance'
import { useERC20 } from 'hooks/useContract'
import {
  getFullDisplayBalance,
  formatNumber,
  getDecimalAmount,
  getBalanceNumber,
  toBigNumber,
} from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import ModalInput from 'components/ModalInput'
import { getAddress } from 'utils/addressHelpers'
import { FarmWithStakedValue } from 'views/Gamefi/config'
import { Pool } from 'state/types'
import { Tiers } from 'config/constants/types'

interface StakeModalProps {
  stakingType: string
  currentStake: Pool | FarmWithStakedValue
  pairSymbol: string
  tierSelected: Tiers
  maxFine: number
  stakeAmount: string
  // estimatedProfit: string
  userTotalStaked: BigNumber
  userStakingBal: BigNumber
  userAllowance: BigNumber
  chainId: number
  onSelectMax?: () => void
  onDismiss?: () => void
}

const StyledDetails = styled(Flex)`
  width: 100%;
  flex-direction: column;
  margin: 0 0 1rem 0;
  & > * {
    justify-content: space-between;
    flex: 1;
    & :first-child {
      color: ${({ theme }) => theme.colors.textSubtle};
    }
  }
`
const HrBroken = styled.hr`
  width: 100%;
  border-top: 3px dashed ${({ theme }) => theme.colors.textSubtle};
  border-bottom: none;
`
const ModalBody = styled.div`
  min-width: 450px;
  margin-top: -20px;
  padding: 20px;

  @media (max-width: 477px) {
    min-width: 0px;
  }
`

const StakeModal: React.FC<StakeModalProps> = ({
  stakingType,
  currentStake,
  pairSymbol,
  tierSelected,
  maxFine,
  stakeAmount,
  // estimatedProfit,
  userTotalStaked,
  userStakingBal,
  userAllowance,
  chainId,
  onDismiss,
}) => {
  const { toastSuccess, toastError, toastWarning } = useToast()
  const { t } = useTranslation()
  const { onFixedAprPoolStake } = useFixedAprPoolStake(getAddress(currentStake.contractAddress, chainId.toString()))
  const [isStaking, setStaking] = useState(false)

  const handleStake = async () => {
    setStaking(true)
    try {
      const tx = await onFixedAprPoolStake(tierSelected.id, stakeAmount)
      if (tx) {
        toastSuccess(
          t('Transaction Completed'),
          t('Your %amount% %symbol% tokens has been staked!', {
            amount: stakeAmount,
            symbol: currentStake.stakingToken.symbol,
          }),
        )
        setStaking(false)
        onDismiss()
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setStaking(false)
        onDismiss()
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), e?.message)
      setStaking(false)
      onDismiss()
    }
  }

  const balDifference = userStakingBal.minus(new BigNumber(stakeAmount))
  const estimatedFee = new BigNumber(stakeAmount).multipliedBy(new BigNumber(maxFine).div(new BigNumber(100)))
  const stakingTokenContract = useERC20(getAddress(currentStake.stakingToken.address, chainId.toString()))
  const totalAllowance = useTokenAllowance(
    getAddress(currentStake.stakingToken.address, chainId.toString()),
    getAddress(currentStake.contractAddress, chainId.toString()),
  )
  const [pendingTx, setPendingTx] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const { handleApprove, requestedApproval } = useSousApprove(
    stakingTokenContract,
    currentStake.sousId,
    currentStake.earningToken.symbol,
  )

  useEffect(() => {
    const decimalUserAllowance = getDecimalAmount(totalAllowance.balance, currentStake.stakingToken.decimals)
    if (totalAllowance.fetchStatus === 'success') {
      setIsApproved(
        decimalUserAllowance.gte(getDecimalAmount(new BigNumber(stakeAmount), currentStake.stakingToken.decimals)),
      )
    }
  }, [requestedApproval, totalAllowance, stakeAmount, currentStake])

  const estimatedProfit = new BigNumber(stakeAmount)
    .multipliedBy(new BigNumber(tierSelected.APR).dividedBy(new BigNumber(100)))
    .toFormat(4)

  const allowance = new BigNumber(getBalanceNumber(totalAllowance.balance, currentStake.stakingToken.decimals))

  return (
    <>
      <Modal title="" onDismiss={onDismiss}>
        <Flex justifyContent="center">
          <Heading size="lg" mt="-48px" style={{ textAlign: 'center' }}>
            Staking Summary
          </Heading>
        </Flex>
        <ModalBody style={{ maxWidth: '25.625rem' }}>
          <StyledDetails>
            <Flex>
              <Text>Duration</Text>
              <Text>{tierSelected.duration} days</Text>
            </Flex>
            <Flex>
              <Text>APR</Text>
              <Text>{tierSelected.APR}%</Text>
            </Flex>
            <Flex>
              <Text>Max profit (estimated)</Text>
              <Text>
                ≈ {estimatedProfit} {pairSymbol}
              </Text>
            </Flex>
            <br />
            <hr style={{ width: '100%' }} />
            <br />
            <Flex>
              <Text>Your Balance</Text>
              <Text>
                {userStakingBal.toFormat(4)} {pairSymbol}
              </Text>
            </Flex>
            <Flex>
              <Text>To Stake</Text>
              <Text>
                -{new BigNumber(stakeAmount).toFormat(4)} {pairSymbol}
              </Text>
            </Flex>
            <hr style={{ width: '100%' }} />
            <Flex>
              <Text>New Balance</Text>
              <Text>
                {balDifference.toFormat(4)} {pairSymbol}
              </Text>
            </Flex>
            <br />
            <br />

            <Flex>
              <Text>Unstaking Fee (estimated)</Text>
              <Text>
                ≈{estimatedFee.toFormat(4)} {pairSymbol}
              </Text>
            </Flex>
          </StyledDetails>
          {isApproved && allowance.gte(toBigNumber(stakeAmount)) ? (
            <Button
              fullWidth
              isLoading={pendingTx}
              endIcon={isStaking ? <AutoRenewIcon spin color="currentColor" /> : null}
              onClick={handleStake}
              disabled={isStaking}
              style={{ backgroundColor: '#1c9f20' }}
            >
              Stake
            </Button>
          ) : (
            <Button
              fullWidth
              isLoading={pendingTx}
              endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
              onClick={handleApprove}
              disabled={requestedApproval}
            >
              Approve
            </Button>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default StakeModal
