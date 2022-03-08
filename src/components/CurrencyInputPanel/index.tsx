import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { Token } from 'config/constants/types'
import styled from 'styled-components'
import { Button, Flex, Text } from '@metagg/mgg-uikit'
import Logo from 'components/Launchpad/Logo'
import NumericalInput from 'components/NumericalInput'


const Container = styled.div`
  // border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  width: 100%;
`
const InputRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border-top: 1px inset ${(({ theme }) => theme.colors.primary)};
  border-bottom: 2px solid ${(({ theme }) => theme.colors.primary)};
  border-left: 1px inset ${(({ theme }) => theme.colors.primary)};
  border-right: 1px outset ${(({ theme }) => theme.colors.primary)};
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  disabled?: boolean
  label?: string
  currency?: Token // temporary
  hideInput?: boolean
  hideBalance?: boolean
  remainingSupply?: string
  id: string
  showCommonBases?: boolean
}

const CurrencyInputPanel: React.FC<CurrencyInputPanelProps> = (
  {
    value,
    onUserInput,
    onMax,
    showMaxButton,
    label,
    currency,
    remainingSupply = '',
    hideBalance = false,
    disabled,
    hideInput = false,
    id,
    showCommonBases,
  }) => {
  const { account } = useWeb3React()

  return (
    <InputPanel>
      <Text fontSize='1em' margin='5px 0px'>
        {label}
      </Text>
      <Container>
        <InputRow>
          <Aligner>
            <Logo tokenSize='25px' padding='0px' primaryToken={currency} />
          </Aligner>
          <Text>
            {(currency && currency.symbol && currency.symbol.length > 5
              ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                currency.symbol.length - 5,
                currency.symbol.length,
              )}`
              : currency?.symbol)}
            &nbsp;
          </Text>
          <NumericalInput
            disabled={disabled}
            error={false}
            align='left'
            className='token-amount-input'
            value={value}
            onUserInput={onUserInput}
          />
          <Button onClick={onMax} size='sm' variant='primary'
                  style={{ maxWidth: '50px', width: '20%', fontSize: '14px' }}>MAX</Button>
        </InputRow>
      </Container>
      <Flex>
        {account && (
          <Text onClick={onMax} fontSize='0.9em' color='textSubtle' style={{ display: 'inline', cursor: 'pointer' }}>
            {!hideBalance && !!currency
              ? `Remaining: ${remainingSupply} ${currency.symbol}`
              : ' -'}
          </Text>
        )}
      </Flex>
    </InputPanel>
  )
}

export default CurrencyInputPanel
