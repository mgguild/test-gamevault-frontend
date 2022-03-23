import BigNumber from 'bignumber.js'
import { orderBy } from 'lodash'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Route, useLocation, useRouteMatch } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Farm, Pool } from 'state/types'
import {
  useFarms,
  usePollFarmsData,
  usePriceCakeBusd,
  usePools,
  useFetchPublicPoolsData,
  useCakeVault,
  useFetchCakeVault,
} from 'state/hooks'
import { getFarmApr, getFarmV2Apr } from 'utils/apr'
import { latinise } from 'utils/latinise'
import isArchivedPid from 'utils/farmHelpers'
import { Text, Flex, Heading } from '@metagg/mgg-uikit'
import { Toggle } from '@pancakeswap/uikit'
import SearchInput from 'components/SearchInput'
import { FarmWithStakedValue } from './components/config'
import TabButtons from './components/TabButtons'
import { BodySection, FilterItem, HeaderSection, ToggleWrapper } from './styled'
import FarmCard from './components/Cards/Farm'

const Gamefi: React.FC = () => {
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const { pools: poolsWithoutAutoVault } = usePools(account)
  const cakePrice = usePriceCakeBusd()
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100
  usePollFarmsData(isArchived)
  useFetchCakeVault()
  useFetchPublicPoolsData()
  // Users with no wallet connected should see 0 as Earned amount
  // Connected users should see loading indicator until first userData has loaded
  const userDataReady = !account || (!!account && userDataLoaded)
  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && !farm.hasEnded && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.hasEnded && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  const pools = useMemo(() => {
    const cakePool = poolsWithoutAutoVault.map((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }

    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedArchivedFarms = archivedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)
  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !farm.quoteToken.busdPrice) {
          return farm
        }
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(farm.quoteToken.busdPrice)
        const apr = isActive ? getFarmApr(new BigNumber(farm.poolWeight), cakePrice, totalLiquidity) : 0

        return { ...farm, apr, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm: FarmWithStakedValue) => {
          return (
            latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery) ||
            latinise(farm.quoteToken.symbol.toLowerCase()).includes(lowercaseQuery)
          )
        })
      }
      return farmsToDisplayWithAPR
    },
    [cakePrice, query, isActive],
  )

  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return farmsStaked
  }, [
    farmsList,
    activeFarms,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
  ])

  const renderContent = (): JSX.Element => {
    return (
      <div style={{ marginTop: '25x', paddingTop: '25px' }}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-evenly',
            columnGap: '2rem',
            rowGap: '2rem',
          }}
        >
          <Route exact path={`${path}`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                userDataReady={userDataReady}
                key={farm.pid}
                farm={farm}
                cakePrice={cakePrice}
                account={account}
              />
            ))}
          </Route>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        padding: '5rem',
      }}
    >
      <HeaderSection>
        <FilterItem>
          <ToggleWrapper>
            <Toggle scale="sm" />
            <Text marginLeft="10px"> Staked only</Text>
          </ToggleWrapper>
          {/* <TabButtons /> */}
        </FilterItem>
        <FilterItem>
          <Text textTransform="uppercase">Search</Text>
          {/* <SearchInput placeholder='Search Farms' /> */}
        </FilterItem>
      </HeaderSection>
      <BodySection>
        <Heading size="xl">Live Farms</Heading>
        {renderContent()}
      </BodySection>
    </div>
  )
}

export default Gamefi
