import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { Flex } from '@pancakeswap/uikit'
import { Heading, Text } from '@metagg/mgg-uikit'
import { useWeb3React } from '@web3-react/core'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import { getFarmV2Apr } from 'utils/apr'
import { useFarmPrice } from 'hooks/price'
import usePrevious from 'utils/refHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { Badge, Card2Container, Cards2, StatusContainer, StatusText, TokenLogo } from './styled'
import { FarmWithStakedValue } from '../../config'
import { MAINNET_CHAIN_ID } from '../../../../config'
import { getFarmStatus } from '../../../../utils/farmHelpers'

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `./images/tokens/${address}.${token.iconExtension ?? 'svg'}`
}

interface FarmCard2Props {
  bgColor?: string
  src?: string
  userDataReady?: boolean
  farm?: FarmWithStakedValue
  removed?: boolean
  cakePrice?: BigNumber
  account?: string
  isNew?: boolean
}

const FarmCard2: React.FC<FarmCard2Props> = ({
  bgColor = '#030f62',
  src = './MGG.png',
  userDataReady,
  farm,
  removed,
  cakePrice,
  account,
  isNew,
}) => {
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  // const formatTotalRewardRate = getBalanceAmount(new BigNumber(farm.totalRewardRate ?? 0)).toFormat(4)
  // const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  // const earnLabel = farm.quoteToken.symbol
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({
  //   mainTokenAddress: farm.token.address,
  //   pairTokenAddress: farm.pairToken.address,
  // })

  const [isFetchData, setFetchData] = useState<boolean>(false)
  const { chainId } = useWeb3React()
  const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID

  const lpTotalSupply = getBalanceNumber(new BigNumber(farm.totalDeposits ?? 0))
  const { LPPrice, rewardPrice } = useFarmPrice(farm, chain, isFetchData)
  const prevLPPrice = usePrevious(LPPrice)
  const prevRewardPrice = usePrevious(rewardPrice)

  useEffect(() => {
    if (LPPrice > 0 || rewardPrice > 0) {
      setFetchData(false)
    }
    setTimeout(() => {
      setFetchData(true)
      if (LPPrice !== prevLPPrice || rewardPrice !== prevRewardPrice) {
        setFetchData(true)
      } else {
        setFetchData(false)
      }
    }, 60000)
    if (prevLPPrice === LPPrice || prevRewardPrice === rewardPrice) {
      setFetchData(false)
    }
  }, [LPPrice, rewardPrice, setFetchData, prevLPPrice, prevRewardPrice])

  const farmV2Apr = useMemo(
    () => getFarmV2Apr(LPPrice, rewardPrice, Number(farm.totalDeposits), Number(farm.rewardRate)),
    [LPPrice, rewardPrice, farm.totalDeposits, farm.rewardRate],
  )

  const apr = farmV2Apr > 0 ? `${farmV2Apr.toFixed(2)} %` : 0

  return (
    <>
      <Cards2
        src={src}
        bgColor={farm.UIProps ? farm.UIProps.bgColor : null}
        className="shodow-pop"
        style={{ cursor: 'pointer' }}
      >
        <Link to={`/gamefi/${`LP`}/${farm.pid}`} style={farm.comingSoon ? { pointerEvents: 'none' } : {}}>
          <Card2Container>
            <TokenLogo size="3.5rem" src={getImageUrlFromToken(farm.quoteToken)} />
            <Flex
              style={{
                flexFlow: 'row wrap',
                columnGap: '0.5rem',
                justifyContent: 'end',
              }}
            >
              {isNew && (
                <div>
                  <Badge>
                    <Text color="white">New</Text>
                  </Badge>
                </div>
              )}

              <TokenLogo size="2rem" src={getImageUrlFromToken(farm.pairToken)} />
              <div>
                <Badge type={1}>
                  <Text color="white">LP Staking</Text>
                </Badge>
              </div>
            </Flex>
            <StatusContainer>
              <StatusText comingSoon={farm.comingSoon || farm.hasEnded}>{getFarmStatus(farm)}</StatusText>
            </StatusContainer>
            <Flex style={{ alignItems: 'end' }}>
              <div>
                <Text color="white">{farm.lpSymbol}</Text>
                <Heading color="white">{farm.name}</Heading>
              </div>
            </Flex>
            { farm.comingSoon || farm.hasEnded && (
            <Flex style={{ justifyContent: 'end', alignItems: 'end' }}>
              <div style={{ textAlign: 'end' }}>
                <Text color="white"> {apr ? `APR: ${apr}` : ''}</Text>
                <Heading color="white">{farm.remainingDays} Days Left</Heading>
              </div>
            </Flex>)}
          </Card2Container>
        </Link>
      </Cards2>
    </>
  )
}

export default FarmCard2
