import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useMemo, useContext } from 'react'
import { Button, Card, Flex, Heading, Text } from '@metagg/mgg-uikit'
import { Calendar, HelpCircle } from 'react-feather'
import { useWeb3React } from '@web3-react/core'
import { Token } from 'config/constants/types'
import styled, { ThemeContext } from 'styled-components'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import { getFullDisplayBalance } from 'utils/formatBalance'
import UnlockButton from 'components/UnlockButton'
import CustomInput from './CustomInput'
import { MainForm } from './styled'

const Container = styled(Card)`
  width: 720px;
  background-color: ${({ theme }) => theme.colors.MGG_container};
  padding: 24px;
  border-radius: 10px;
  & > * {
    margin: 10px 0px;
  }
  @media (max-width: 500px){
      width: 400px;
  }
  @media (max-width: 400px){
    width: 350px;
    }
    @media (max-width: 300px){
        width: 300px;
    }
`
const StyledLogo = styled.img`
  width: 50px;
  margin-right: 10px;
`
interface FormInterface {
  max: BigNumber
}

const Form: React.FC<FormInterface> = ({ max }) => {
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const getImageUrlFromToken = (token: Token) => {
    const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
    return `/images/tokens/${address}.${token.iconExtension ?? 'svg'}`
  }
  // temp userbalance checker
  const userBalance = 0
  const [val, setVal] = useState('0')
  const [days, setDays] = useState('0')
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])
  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const handleMaxDays = useCallback(() => {
    setDays('10')
  }, [setDays])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleDays = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setDays(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setDays],
  )

  return (
    <Container>
      <Heading>MGG to be Staked</Heading>
      <MainForm flexDirection="column">
        <Flex justifyContent="space-between" style={{ width: '100%' }}>
          <Flex alignItems="center" marginBottom="30px" justifyContent="center" style={{ width: '100%' }}>
            <StyledLogo src={getImageUrlFromToken(tokens.mgg)} alt="mgg-logo" />
            <Text fontSize="20px">MGG</Text>
          </Flex>
          <CustomInput
            purpose="staking"
            value={val}
            onSelectMax={handleSelectMax}
            onChange={handleChange}
            max={fullBalance}
            symbol="MGG"
            addLiquidityUrl="sparkswap.finance"
          />
        </Flex>
        <hr style={{ width: '100%', border: `1px solid ${theme.colors.primary}`, margin: '20px 0px' }} />
        <Heading>Enter days to be Staked</Heading>
        <Flex justifyContent="space-between" style={{ width: '100%' }} marginTop="10px">
          <Flex alignItems="center" marginTop="5px" justifyContent="center" style={{ width: '100%' }}>
            <Calendar color={theme.colors.primary} style={{ marginRight: '25px', marginLeft: '10px' }} />
            <Text fontSize="20px">DAYS</Text>
          </Flex>
          <CustomInput
            value={days}
            onSelectMax={handleMaxDays}
            onChange={handleDays}
            max="10"
            symbol=""
            addLiquidityUrl=""
          />
        </Flex>
        <Flex>
          <HelpCircle color={theme.colors.primary} style={{ marginRight: '10px' }} />
          <Text>
            Long term bonus: <span style={{ color: theme.colors.MGG_accent2 }}>296%</span>
          </Text>
        </Flex>
        <Flex
          style={{ width: '100%' }}
          margin="25px 0px 0px 0px"
          padding="25px 0px 0px 0px"
          flexDirection="column"
          alignItems="center"
        >
          {!account ? (
            <>
              <Text marginBottom="5px">Please connect your wallet</Text>
              <UnlockButton fullWidth style={{ borderRadius: '5px' }} />
            </>
          ) : (
            <>
              <Text marginBottom="5px">You don&apos;t have enough MGG to Stake</Text>
              <Button fullWidth style={{ borderRadius: '5px' }}> BUY MGG</Button>
            </>
          )}
        </Flex>
      </MainForm>
    </Container>
  )
}

export default Form
