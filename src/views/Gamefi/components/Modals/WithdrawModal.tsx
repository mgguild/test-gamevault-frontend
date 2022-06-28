import React, { useEffect, useState, useContext, useMemo } from 'react'
import moment from 'moment'
import styled, { ThemeContext } from 'styled-components'
import { Slider, BalanceInput, AutoRenewIcon, Link } from '@pancakeswap/uikit'
import { Modal, Text, Flex, Heading, Image, Button } from '@metagg/mgg-uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_EXCHANGE_URL } from 'config'
import { useFixedAprPoolUnstake } from 'hooks/useUnstake'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import BigNumber from 'bignumber.js'
import { useSousApprove, useSousApproveWithAmount } from 'hooks/useApprove'
import { useTokenAllowance } from 'hooks/useTokenBalance'
import { useERC20 } from 'hooks/useContract'
import { getFullDisplayBalance, formatNumber, getDecimalAmount, getBalanceNumber } from 'utils/formatBalance'
import { BIG_ZERO } from 'utils/bigNumber'
import ModalInput from 'components/ModalInput'
import { getAddress } from 'utils/addressHelpers'
import { FarmWithStakedValue } from 'views/Gamefi/config'
import { Pool } from 'state/types'

interface StakeModalProps {
  chainId: number
  stakingType: string
  currentStake: Pool | FarmWithStakedValue
  pairSymbol: string
  maxFine: number
  stakeDetails: any
  tier: any
  amount: number
  stakedAt: number
  daysLeft: number
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

const WithdrawModal: React.FC<StakeModalProps> = ({
  chainId,
  stakingType,
  currentStake,
  maxFine,
  pairSymbol,
  stakeDetails,
  tier,
  amount,
  stakedAt,
  daysLeft,
  onDismiss,
}) => {
  const theme = useContext(ThemeContext)
  const { toastSuccess, toastError, toastWarning } = useToast()
  const { t } = useTranslation()
  const { onFixedAprUnstake } = useFixedAprPoolUnstake(
    currentStake.sousId,
    getAddress(currentStake.contractAddress, chainId.toString()),
  )
  const [isUnstaking, setUnstaking] = useState(false)

  const handleUnstake = async () => {
    setUnstaking(true)
    try {
      const tx = await onFixedAprUnstake(stakeDetails.id)
      if (tx) {
        toastSuccess(
          t('%action% Completed', {
            action: daysLeft > 0 ? 'Unstaking' : 'Claiming',
          }),
          t('Your staked %symbol% tokens has been withdrawn/claimed!', {
            symbol: currentStake.stakingToken.symbol,
          }),
        )
        setUnstaking(false)
        onDismiss()
      } else {
        // user rejected tx or didn't go thru
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setUnstaking(false)
        onDismiss()
      }
    } catch (e) {
      console.error(e)
      toastError(t('Error'), e?.message)
      setUnstaking(false)
      onDismiss()
    }
  }

  const estimatedProfit = new BigNumber(amount)
    .multipliedBy(new BigNumber(tier.APR).dividedBy(new BigNumber(100)))
    .toString()

  const timeZone = new Intl.DateTimeFormat('en-us', { timeZoneName: 'short' })
    .formatToParts(new Date())
    .find((part) => part.type === 'timeZoneName').value

  return (
    <>
      <Modal title="" onDismiss={onDismiss}>
        <Flex justifyContent="center">
          <Heading size="lg" mt="-48px" style={{ textAlign: 'center' }}>
            Stake Details
          </Heading>
        </Flex>
        <ModalBody>
          <StyledDetails>
            <Flex>
              <Text>Duration</Text>
              <Text>{tier.duration} days</Text>
            </Flex>
            <Flex>
              <Text>APR</Text>
              <Text>{tier.APR}%</Text>
            </Flex>
            <Flex>
              <Text>{pairSymbol} Staked</Text>
              <Text>
                {amount} {pairSymbol}
              </Text>
            </Flex>
            <br />
            <hr style={{ width: '100%' }} />
            <Flex>
              <div>
                <Text>Staked at</Text>
                <Text>
                  {moment(stakedAt).format('LLL')} {timeZone}
                </Text>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text>Can be claimed on</Text>
                <Text>
                  {moment(stakedAt).add(tier.duration, 'days').format('LL')}
                  {daysLeft > 0 ? (
                    <Text color={theme.colors.textSubtle}>({daysLeft} days left)</Text>
                  ) : (
                    <Text color={theme.colors.textSubtle}>(Claimable)</Text>
                  )}
                </Text>
              </div>
            </Flex>
            <hr style={{ width: '100%' }} />
            <Flex>
              <Text>Max profit (estimated)</Text>
              <Text>
                ≈ {estimatedProfit} {pairSymbol}
              </Text>
            </Flex>
            {daysLeft > 0 && (
              <>
                <br />
                <br />
                <Flex>
                  <Text style={{ color: '#ff6c16' }}>
                    Early Unstaking/Withdrawal will result in {maxFine}% fee penalty
                  </Text>
                </Flex>
                <Flex>
                  <Text style={{ color: '#ff6c16' }}>Max Fee penalty (estimated)</Text>
                  <Text style={{ color: '#ff6c16' }}>
                    ≈ {new BigNumber(amount).multipliedBy(new BigNumber(maxFine).div(new BigNumber(100))).toFormat()}{' '}
                    {pairSymbol}
                  </Text>
                </Flex>
              </>
            )}
          </StyledDetails>
          <Button
            fullWidth
            isLoading={isUnstaking}
            endIcon={isUnstaking ? <AutoRenewIcon spin color="currentColor" /> : null}
            onClick={() => handleUnstake()}
            disabled={isUnstaking}
          >
            {daysLeft > 0 ? <Text>Withdraw</Text> : <Text>Claim</Text>}
          </Button>
        </ModalBody>
      </Modal>
    </>
  )
}

export default WithdrawModal
