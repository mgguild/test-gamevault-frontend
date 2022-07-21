import BigNumber from 'bignumber.js'
import { orderBy, partition } from 'lodash'
import { ThemeContext } from 'styled-components'
import React, { useState, useEffect, useCallback, useMemo, useRef, useContext } from 'react'
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
import usePersistState from 'hooks/usePersistState'
import { SelectChangeEvent } from '@mui/material/Select'
import { Text, Flex, Heading, Button } from '@metagg/mgg-uikit'
import { Toggle } from '@pancakeswap/uikit'
import SearchInput from 'components/SearchInput'
import ToggleView, { ViewMode } from './components/ToggleView/ToggleView'
import { FarmWithStakedValue } from './config'
import VaultBanner from './components/Banner'
import TabButtons from './components/TabButton'
import NotAvailable from './components/NotAvailable'
import { BodySection, FilterButton, FilterItem, HeaderSection, Layout, StakeSection, ToggleWrapper } from './styled'
import FarmCard from './components/Cards/Farm'
import PoolCard from './components/Cards/Pool'
import Select from './components/Select'

const Gamefi: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [query, setQuery] = useState('')
  const { account } = useWeb3React()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const [sortBy, setSortBy] = useState('')
  const [isLiveVaults, setLiveVaults] = useState('')

  const handleIsLiveVaults = (value: string) => {
    setLiveVaults(value)
  }
  const handleChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value)
  }
  const [viewMode, setViewMode] = usePersistState(ViewMode.TABLE, { localStorageKey: 'mgg_vaults_view' })
  const { data: farmsLP, userDataLoaded } = useFarms()
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
  const userDataReady = !account // || (!!account && userDataLoaded)
  const [stakedOnly, setStakedOnly] = useState(!isActive)
  useEffect(() => {
    setStakedOnly(!isActive)
  }, [isActive])
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && !farm.hasEnded && !isArchivedPid(farm.pid))
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.hasEnded && !isArchivedPid(farm.pid))
  const archivedFarms = farmsLP.filter((farm) => isArchivedPid(farm.pid))

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
      stakingList.activeFarms = farmsList(stakedOnlyFarms)
      stakingList.inactiveFarms = farmsList(stakedInactiveFarms)
      stakingList.activePools = stakedOnlyOpenPools
      stakingList.inactivePools = stakedOnlyFinishedPools
    } else {
      stakingList.activeFarms = farmsList(activeFarms)
      stakingList.inactiveFarms = farmsList(inactiveFarms)
      stakingList.activePools = openPools
      stakingList.inactivePools = finishedPools
    }
    return stakingList
  }, [
    farmsList,
    activeFarms,
    inactiveFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
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
              {stakedMemoized.inactiveFarms.length !== 0 ? (
                <Grid container spacing={{ md: 4 }}>
                  {stakedMemoized.inactiveFarms.map((farm) => (
                    <Grid key={farm.pid} item xs={12} md={11.5}>
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
                <NotAvailable title="Inactive Vaults" />
              )}
              {stakedMemoized.inactivePools.length !== 0 ? (
                <Grid container spacing={{ md: 4 }}>
                  {stakedMemoized.inactivePools.map((pool) => (
                    <Grid key={pool.sousId} item xs={12} md={12}>
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
                <NotAvailable title="Inactive Vaults" />
              )}
            </StakeSection>
          ) : (
            <NotAvailable title="Inactive Vaults" />
          )
        default:
          return stakedMemoized.activePools.length !== 0 ? (
            <StakeSection>
              {stakedMemoized.activeFarms.length !== 0 ? (
                <Grid container spacing={4}>
                  {stakedMemoized.activeFarms.map((farm) => (
                    <Grid key={farm.pid} item xs={12} md={11.5}>
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
                <NotAvailable title="Active Vaults" />
              )}
              {stakedMemoized.activePools.length !== 0 ? (
                <Grid container spacing={2}>
                  {stakedMemoized.activePools.map((pool) => (
                    <Grid key={pool.sousId} item xs={12} md={12} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
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
                <NotAvailable title="Active Vaults" />
              )}
            </StakeSection>
          ) : (
            <NotAvailable title="Active Vaults" />
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
    <>
      <VaultBanner />
      <Layout>
        <BodySection>
          <Heading size="xl">MGG Vaults</Heading>
          {/* Sample render for MGG, update with live mgg vault */}
          {renderContent({ RENDER_TYPE: '' })}
        </BodySection>
        <HeaderSection>
          <FilterItem>
            <FilterButton>
              <Text>FILTER</Text>
            </FilterButton>
          </FilterItem>
          <FilterItem>
            <TabButtons tabAction={handleIsLiveVaults} tabState={isLiveVaults} />
          </FilterItem>
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
          <FilterItem>
            <Text>SORT BY:</Text>
            <Select handleSortBy={setSortBy} sortBy={sortBy} />
          </FilterItem>
          {/* <FilterItem>
          <Text textTransform='uppercase'>View</Text>
          <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
        </FilterItem> */}
        </HeaderSection>
        <BodySection>
          <Heading size="xl">{isLiveVaults === '' ? 'Live' : 'Past'} Vaults</Heading>
          {renderContent({ RENDER_TYPE: isLiveVaults })}
        </BodySection>
      </Layout>
    </>
  )
}

export default Gamefi
