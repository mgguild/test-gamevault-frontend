import React, { useEffect, useState, useRef, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Slider, BalanceInput, AutoRenewIcon, Link } from '@pancakeswap/uikit'
import { Modal, Text, Flex, Heading, Image, Button } from '@metagg/mgg-uikit'
import { useTranslation } from 'contexts/Localization'
import { BASE_EXCHANGE_URL, BASE_SWAP_URL } from 'config'
import { useSousStake, useFixedAprPoolStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
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
import { Tiers } from 'config/constants/types'

const ModalBody = styled.div`
  min-width: 450px;
  margin-top: -20px;
  padding: 20px;
`

interface InsufficientModalProps {
  chainId: number
  stakingType: string
  currentStake: Pool | FarmWithStakedValue
  pairSymbol: string
  onDismiss?: () => void
}

const InsufficientModal: React.FC<InsufficientModalProps> = ({
  chainId,
  stakingType,
  currentStake,
  pairSymbol,
  onDismiss,
}) => {
  const stakingTknAddress = getAddress(currentStake.stakingToken.address, chainId.toString())

  return (
    <>
      <Modal title="" onDismiss={onDismiss}>
        <Flex justifyContent="center">
          <Heading size="lg" mt="-48px" style={{ textAlign: 'center' }}>
            Insufficent {pairSymbol} Token
          </Heading>
        </Flex>
        <ModalBody>
          <Text>It appears that you are staking more than your current {pairSymbol} token balance </Text>
          <br/>
          <Flex style={{justifyContent: 'center'}}>
            <Button onClick={() => {window.open(`${BASE_SWAP_URL}/${stakingTknAddress}`, '_blank')}}>Add More {pairSymbol} Tokens</Button>
          </Flex>
        </ModalBody>
      </Modal>
    </>
  )
}

export default InsufficientModal
