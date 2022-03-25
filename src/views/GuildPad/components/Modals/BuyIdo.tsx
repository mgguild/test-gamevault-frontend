import React, { useCallback, useState } from 'react'
import { Guildpad } from 'state/types'
import { useWeb3React } from '@web3-react/core'
import { Button, Flex, Heading, Modal, Text } from '@metagg/mgg-uikit'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import Logo from 'components/Launchpad/Logo'
import { ActionSection, AllocSection, ContentContainer, HeaderSection, SwapSection } from './styled'
import { useAppDispatch } from '../../../../state'
import { useBuyIgo } from '../../../../hooks/useGuildPad'
import { getAddress } from '../../../../utils/addressHelpers'
import { fetchGuildpadUserDataAsync, fetchPublicGuildpadDataAsync } from '../../../../state/guildpads'
import { getBalanceAmount, toBigNumber } from '../../../../utils/formatBalance'
import useTokenBalance, { useTokenAllowance } from '../../../../hooks/useTokenBalance'
import { useApproveGuildpad } from '../../../../hooks/useApprove'
import { fetchFarmUserDataAsync } from '../../../../state/farms'
import { useGuildpadApproval } from '../../../../hooks/useApproval'
import useToast from '../../../../hooks/useToast'
import { useTranslation } from '../../../../contexts/Localization'

interface ModalProps {
  onDismiss?: () => void
  guildpad?: Guildpad
}

const ModalComponent: React.FC<ModalProps> = ({ onDismiss, guildpad }) => {
  const { account } = useWeb3React()
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  const [input, setInput] = useState<string>('')
  const [output, setOutput] = useState<string>('')
  const [swapDisabled, setSwapDisabled] = useState<boolean>(true)
  const [buyInitiated, setBuyInitiated] = useState(false)

  const { balance: bal } = useTokenBalance(getAddress(guildpad.buyingCoin.address))
  const { balance: allow } = useTokenAllowance(
    getAddress(guildpad.buyingCoin.address),
    getAddress(guildpad.contractAddress),
  )
  const balance = getBalanceAmount(bal)
  const allowance = getBalanceAmount(allow)
  const tokenRate = toBigNumber(guildpad.tokenRate)
  const maxPayableAmount = toBigNumber(guildpad.userData.details.maxPayableAmount)
  const rewardedAmount = toBigNumber(guildpad.userData.details.rewardedAmount)
  const purchasable = maxPayableAmount.minus(rewardedAmount)
  const expendable = purchasable.multipliedBy(tokenRate)

  const dispatch = useAppDispatch()
  const { onBuyIgo } = useBuyIgo(getAddress(guildpad.contractAddress))
  const { handleApprove, requestedApproval } = useGuildpadApproval(
    getAddress(guildpad.buyingCoin.address),
    getAddress(guildpad.contractAddress),
  )

  const handleBuy = async () => {
    const ids = [guildpad.id]
    setBuyInitiated(true)
    try {
      await onBuyIgo(input)
      toastSuccess(`Successfully Bought!`)
      setBuyInitiated(false)
      dispatch(fetchPublicGuildpadDataAsync([guildpad.id]))
      dispatch(fetchGuildpadUserDataAsync({ account, ids }))
      onDismiss()
    } catch (e) {
      setBuyInitiated(false)
      toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas'))
    }
  }

  const toggleSwap = (value, type = 'input') => {
    const amount = toBigNumber(value)

    if (type === 'input') {
      const balAllowanceSufficient = balance.gte(amount) && !balance.isZero() && !allowance.isZero()
      setSwapDisabled(!(amount.lte(expendable) && balAllowanceSufficient))
    } else {
      const toSpend = amount.multipliedBy(tokenRate)
      const balAllowanceSufficient = balance.gte(toSpend) && !balance.isZero() && !allowance.isZero()

      setSwapDisabled(!(amount.lte(purchasable) && balAllowanceSufficient))
    }
  }

  // Input
  const handleUserInput = (value) => {
    setInput(value)

    const inp = toBigNumber(value)
    if (inp.isGreaterThanOrEqualTo(tokenRate)) {
      setOutput(toBigNumber(value).dividedBy(toBigNumber(guildpad.tokenRate)).toString())
    }

    toggleSwap(value, 'input')
  }

  const handleMaxInput = () => {
    const value = expendable.toString()
    handleUserInput(value)
  }

  // Output
  const handleUserOutput = (value) => {
    setOutput(value)

    const inp = toBigNumber(value)
    if (inp.isGreaterThanOrEqualTo(tokenRate)) {
      setInput(toBigNumber(value).multipliedBy(toBigNumber(guildpad.tokenRate)).toString())
    }

    toggleSwap(value, 'output')
  }

  const handleMaxOuput = () => {
    const value = purchasable.toString()
    handleUserOutput(value)
  }

  return (
    <Modal onDismiss={onDismiss} title="">
      <ContentContainer>
        <HeaderSection flexDirection="column">
          <Heading size="xl">Swap Coins</Heading>
          <Text color="textSubtle" fontSize="1.1em">
            Max. Allocation is {maxPayableAmount.toString()} {guildpad.sellingCoin.symbol}
          </Text>
        </HeaderSection>
        <SwapSection>
          <CurrencyInputPanel
            label="From"
            id="swap-input"
            value={input}
            onUserInput={handleUserInput}
            currency={guildpad.buyingCoin}
            showMaxButton
            onMax={handleMaxInput}
            disabled={allowance.isZero()}
            remainingSupply={expendable.toString()}
          />
          <CurrencyInputPanel
            label="To"
            id="swap-output"
            value={output}
            onUserInput={handleUserOutput}
            currency={guildpad.sellingCoin}
            showMaxButton
            onMax={handleMaxOuput}
            disabled={allowance.isZero()}
            remainingSupply={purchasable.toString()}
          />
          <Text>Price: {`${guildpad.tokenRate} ${guildpad.sellingCoin.symbol} per ${guildpad.buyingCoin.symbol}`}</Text>
        </SwapSection>
        <ActionSection>
          {allowance.isZero() && (
            <Button onClick={handleApprove} disabled={requestedApproval} fullWidth>
              Approve {guildpad.buyingCoin.symbol}
            </Button>
          )}
          {!allowance.isZero() && (
            <Button disabled={swapDisabled || buyInitiated} onClick={handleBuy} fullWidth>
              SWAP
            </Button>
          )}
        </ActionSection>
        <AllocSection>
          <Text fontSize="14px">My Allocation</Text>
          <Flex alignItems="center">
            <Logo tokenSize="35px" primaryToken={guildpad.sellingCoin} padding="0px" />
            <Text>
              {rewardedAmount.toString()} {guildpad.sellingCoin.symbol}
            </Text>
          </Flex>
        </AllocSection>
      </ContentContainer>
    </Modal>
  )
}

export default ModalComponent
