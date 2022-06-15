import BigNumber from 'bignumber.js'
import { orderBy, partition } from 'lodash'
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Route, useLocation, useRouteMatch } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { Grid } from '@mui/material'
import { Farm, Pool } from 'state/types'
import { PoolCategory } from 'config/constants/types'
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
import { FarmWithStakedValue } from './config'
import TabButtons from './components/TabButtons'
import NotAvailable from './components/NotAvailable'
import { BodySection, FilterItem, HeaderSection, StakeSection, ToggleWrapper } from './styled'
import FarmCard from './components/Cards/Farm'
import PoolCard from './components/Cards/Pool'

const Gamefi: React.FC = () => {
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  // const { data: farmsLP, userDataLoaded } = useFarms()
  const { pools: poolsWithoutAutoVault } = usePools(account)
  const cakePrice = usePriceCakeBusd()
  const isArchived = pathname.includes('archived')
  const isActive = true
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
  // Temporarily Hide Farms
  const userDataReady = !account // || (!!account && userDataLoaded)
  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])
  // Temporarily Hide Farms
  // const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && !farm.hasEnded && !isArchivedPid(farm.pid))
  // const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.hasEnded && !isArchivedPid(farm.pid))
  // const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

  // const stakedOnlyFarms = activeFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )

  // const stakedInactiveFarms = inactiveFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )

  // const stakedArchivedFarms = archivedFarms.filter(
  //   (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  // )

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

  const fixedAprsOnly = poolsWithoutAutoVault.filter((pool) => pool.poolCategory === PoolCategory.FIXEDAPR)

  const pools = useMemo(() => {
    const cakePool = fixedAprsOnly.map((pool) => pool.sousId === 0)
    const cakeAutoVault = { ...cakePool, isAutoVault: true }

    return [...fixedAprsOnly]
  }, [fixedAprsOnly])

  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const stakedOnlyFinishedPools = useMemo(
    () =>
      finishedPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [finishedPools, accountHasVaultShares],
  )
  const stakedOnlyOpenPools = useMemo(
    () =>
      openPools.filter((pool) => {
        if (pool.isAutoVault) {
          return accountHasVaultShares
        }
        return pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0)
      }),
    [openPools, accountHasVaultShares],
  )

  const stakedMemoized = useMemo(() => {
    const stakingList = { activeFarms: [], inactiveFarms: [], activePools: [], inactivePools: [] }

    if (stakedOnly) {
      // Temporarily Hide Farms
      // stakingList.activeFarms = farmsList(stakedOnlyFarms)
      // stakingList.inactiveFarms = farmsList(stakedInactiveFarms)
      stakingList.activePools = stakedOnlyOpenPools
      stakingList.inactivePools = stakedOnlyFinishedPools
    } else {
      // Temporarily Hide Farms
      // stakingList.activeFarms = farmsList(activeFarms)
      // stakingList.inactiveFarms = farmsList(inactiveFarms)
      stakingList.activePools = openPools
      stakingList.inactivePools = finishedPools
    }
    return stakingList
  }, [
    // Temporarily Hide Farms
    // farmsList,
    // activeFarms,
    // inactiveFarms,
    // stakedInactiveFarms,
    stakedOnly,
    // stakedOnlyFarms,
    finishedPools,
    openPools,
    stakedOnlyOpenPools,
    stakedOnlyFinishedPools,
  ])

  const renderContent = ({ RENDER_TYPE }: { RENDER_TYPE?: string }): JSX.Element => {
    const render = (type) => {
      switch (type) {
        case 'RENDER_ENDED':
          return stakedMemoized.inactivePools.length !== 0 ? (
            <StakeSection>
              {/* Temporarily Hide Farms
              {stakedMemoized.inactiveFarms.length !== 0 ? (
                <Grid container spacing={4}>
                  {stakedMemoized.inactiveFarms.map((farm) => (
                    <Grid key={farm.pid} item md={11}>
                      <FarmCard
                        userDataReady={userDataReady}
                        farm={farm}
                        cakePrice={cakePrice}
                        account={account}
                        removed={false}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NotAvailable title="Inactive Farms" />
              )} */}
              {stakedMemoized.inactivePools.length !== 0 ? (
                <Grid container spacing={4}>
                  {stakedMemoized.inactivePools.map((pool) => (
                    <Grid key={pool.sousId} item md={11}>
                      <PoolCard
                        userDataReady={userDataReady}
                        pool={pool}
                        cakePrice={cakePrice}
                        account={account}
                        removed={false}
                        bgColor="#b10303d6"
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NotAvailable title="Inactive Pools" />
              )}
            </StakeSection>
          ) : (
            <NotAvailable title="inactive farms and pools" />
          )
        default:
          return stakedMemoized.activePools.length !== 0 ? (
            <StakeSection>
              {/* Temporarily Hide Farms
              {stakedMemoized.activeFarms.length !== 0 ? (
                <Grid container spacing={4}>
                  {stakedMemoized.activeFarms.map((farm) => (
                    <Grid key={farm.pid} item md={11}>
                      <FarmCard
                        userDataReady={userDataReady}
                        farm={farm}
                        cakePrice={cakePrice}
                        account={account}
                        removed={false}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NotAvailable title="Active Farms" />
              )} */}
              {stakedMemoized.activePools.length !== 0 ? (
                <Grid container spacing={2}>
                  {stakedMemoized.activePools.map((pool) => (
                    <Grid key={pool.sousId} item md={11} style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                      <PoolCard
                        userDataReady={userDataReady}
                        pool={pool}
                        cakePrice={cakePrice}
                        account={account}
                        removed={false}
                        bgColor="#b10303d6"
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NotAvailable title="Active Pools" />
              )}
            </StakeSection>
          ) : (
            <NotAvailable title="active farms and pools" />
          )
      }
    }

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
          {render(RENDER_TYPE)}
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
            <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
            <Text marginLeft="10px"> Staked only</Text>
          </ToggleWrapper>
          {/* <TabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} /> */}
        </FilterItem>
        <FilterItem>
          <Text textTransform="uppercase">Search</Text>
          <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
        </FilterItem>
      </HeaderSection>
      <BodySection>
        <Heading size="xl">Live Farms</Heading>
        {renderContent({ RENDER_TYPE: '' })}
      </BodySection>
      <BodySection>
        <Heading size="xl">Past Farms</Heading>
        {renderContent({ RENDER_TYPE: 'RENDER_ENDED' })}
      </BodySection>
    </div>
  )
}

export default Gamefi
