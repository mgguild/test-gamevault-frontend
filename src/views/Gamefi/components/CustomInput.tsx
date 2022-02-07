import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Input, InputProps, Text } from '@metagg/mgg-uikit'
import { useTranslation } from 'contexts/Localization'

interface ModalInputProps {
    purpose?: string
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  decimals?: number
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  // box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 0px;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  flex: 1;
  margin: 0px 8px;
  padding: 0px 8px;
  background: none;
  text-align: right;
  font-weight: bold;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`
const InputContainer = styled(Flex)`
  padding: 5px;
`
// const StyledErrorMessage = styled(Text)`
//   position: absolute;
//   bottom: -22px;
//
//   a {
//     display: inline;
//   }
// `

const CustomInput: React.FC<ModalInputProps> = ({
purpose,
  max,
  // symbol,
  onChange,
  onSelectMax,
  value,
  // addLiquidityUrl,
  // inputTitle,
  decimals = 18,
}) => {
  const { t } = useTranslation()
  const isBalanceZero = max === '0' || !max

  return (
    <div style={{ position: 'relative', margin: '10px 0px' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <InputContainer alignItems="center" justifyContent="space-between">
          <Button size="sm" onClick={onSelectMax} mr="8px" style={{ borderRadius: '5px' }}>
            {t('Max')}
          </Button>
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder="0"
            value={value}
          />
          {/* <Text fontSize="16px">{symbol}</Text> */}
        </InputContainer>
      </StyledTokenInput>
      { purpose === 'staking' && (
      <Flex justifyContent='flex-end' marginTop='15px'>
        <Text fontSize="14px" color="textSubtle">
          Your balance: 0 MGG
        </Text>
      </Flex>)}
      {/* {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          {t('No tokens to stake')}:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure">
            {t('Get %symbol%', { symbol })}
          </Link>
        </StyledErrorMessage>
      )} */}
    </div>
  )
}

export default CustomInput
