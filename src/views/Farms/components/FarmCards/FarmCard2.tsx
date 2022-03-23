import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Image, RowType, Toggle } from '@pancakeswap/uikit'
import { Text, Heading } from '@metagg/mgg-uikit'
import { Oval } from 'react-loading-icons'
import styled, { ThemeContext } from 'styled-components'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { Farm, Pool } from 'state/types'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { getAddress } from 'utils/addressHelpers'
import { getFarmApr, getFarmV2Apr } from 'utils/apr'
import { useFarmPrice } from 'hooks/price'
import usePrevious from 'utils/refHelpers'
import { getBalanceNumber, getBalanceAmount } from '../../../../utils/formatBalance'
import { FarmWithStakedValue } from '../FarmCard/FarmCard'
import { Cards2, Card2Container, TokenLogo, Badge } from './styles'


const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/tokens/${address}.${token.iconExtension?? 'svg'}`
}

interface FarmCard2Props {
  bgColor?: string
  src?: string
  userDataReady: boolean
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  account?: string
  isNew?: boolean
}

const FarmCard2: React.FC<FarmCard2Props> = ({bgColor = "#030f62", src="./MGG.png", userDataReady, farm, removed, cakePrice, account, isNew }) => {
  const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const formatTotalRewardRate = getBalanceAmount(new BigNumber(farm.totalRewardRate ?? 0)).toFormat(4)
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const earnLabel = farm.quoteToken.symbol
  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    mainTokenAddress: farm.token.address,
    pairTokenAddress: farm.pairToken.address,
  })
  const [ isFetchData, setFetchData] = useState<boolean | null>(true);

  const lpTotalSupply = getBalanceNumber(new BigNumber(farm.totalDeposits ?? 0))
  const { LPPrice, rewardPrice } = useFarmPrice(
    Number(lpTotalSupply),
    farm.token.address[56],
    farm.pairToken.address[56],
    farm.quoteToken.address[56],
    farm.lpAddresses[56],
    isFetchData
  )
  const prevLPPrice = usePrevious(LPPrice);
  const prevRewardPrice = usePrevious(rewardPrice);

  useEffect(() => {
    if ((LPPrice > 0) || (rewardPrice > 0)) {
      setFetchData(false);
    }
    setTimeout(() => {
      setFetchData(true);
      if ((LPPrice !== prevLPPrice) || (rewardPrice !== prevRewardPrice)) {
        setFetchData(true);
      } else {
        setFetchData(false);
      }
    }, 60000);
    if ((prevLPPrice === LPPrice) || (prevRewardPrice === rewardPrice)) {
      setFetchData(false);
    }

  }, [LPPrice, rewardPrice, setFetchData, prevLPPrice, prevRewardPrice])

  useEffect(() => {
    return setFetchData(null)
  }, [])

  const farmV2Apr = useMemo(
    () => getFarmV2Apr(LPPrice, rewardPrice, Number(farm.totalDeposits), Number(farm.rewardRate)),
    [LPPrice, rewardPrice, farm.totalDeposits, farm.rewardRate],
  )

  const apr = farmV2Apr > 0 ? `${farmV2Apr.toFixed(2)} %` : <Oval width="20px" height="20px" />

  return (
    <>
      <Cards2 src={src} bgColor={bgColor} className='shodow-pop'>
        <Card2Container>
          <TokenLogo size='3.5rem' src={getImageUrlFromToken(farm.quoteToken)} />
          <Flex style={{
            flexFlow: 'row wrap',
            columnGap: '0.5rem',
            justifyContent: 'end',
          }}>
            { isNew && <div><Badge><Text color='white'>New</Text></Badge></div> }
            <TokenLogo size='2rem' src={getImageUrlFromToken(farm.pairToken)} />
            <div><Badge type={1}><Text color='white'>LP FARM</Text></Badge></div>
          </Flex>
          <Flex style={{alignItems: 'end'}}>
            <div>
              <Text color='white'>{farm.lpSymbol}</Text>
              <Heading color='white'>MetaGaming Guild</Heading>
            </div>
          </Flex>
          <Flex style={{justifyContent: 'end', alignItems: 'end'}}>
            <div style={{textAlign: 'end'}}>
              <Text color='white'>APR {apr}</Text>
              <Heading color='white'>{farm.remainingDays} Days Left</Heading>
            </div>
          </Flex>
        </Card2Container>
      </Cards2>
    </>
  )
}

export default FarmCard2