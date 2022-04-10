import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Route, useLocation, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Image, RowType, Toggle } from '@pancakeswap/uikit'
import { Text, Heading, Button } from '@metagg/mgg-uikit'
import styled, { ThemeContext } from 'styled-components'
import useMedia from 'use-media'
import {
  useFarms,
  usePollFarmsData,
  usePriceCakeBusd,
  usePools,
  useFetchPublicPoolsData,
  useCakeVault,
  useFetchCakeVault,
} from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { useFarmPrice } from 'hooks/price'
import usePrevious from 'utils/refHelpers'
import { Farm, Pool } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import { getFarmApr, getFarmV2Apr } from 'utils/apr'
import useTokenBalance from 'hooks/useTokenBalance'
import { orderBy } from 'lodash'
import partition from 'lodash/partition'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import FarmCard, { FarmWithStakedValue } from '../components/FarmCard/FarmCard'
import Table from '../components/FarmTable/FarmTable'
import FarmTabButtons from '../components/FarmTabButtons'
import { RowProps } from '../components/FarmTable/Row'
import { DesktopColumnSchema, ViewMode } from '../components/types'
import { ReactComponent as FarmsDarkLogo } from '../components/assets/farm-dark.svg'
import { ReactComponent as FarmsLightLogo } from '../components/assets/farm-light.svg'
import { getAprData, getCakeVaultEarnings } from '../../Pools/helpers'
import { FarmCard2, PoolCard2 } from '../components/FarmCards'
import SvgIcon from '../../../components/Launchpad/SvgIcon'
import { ReactComponent as IconGrid } from './icons/IconGrid.svg'
import { ReactComponent as IconList } from './icons/IconList.svg'

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/tokens/${address}.${token.iconExtension ?? 'svg'}`
}

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  ${Text} {
    margin-left: 8px;
  }
`

const FilterItem = styled(Flex)`
  align-items: center;
  text-align: center;
  flex-flow: row;
  column-gap: 0.5rem;
`

const ButtonA = styled(Button)`
  width: 10rem;
`
const ButtonB = styled(Button)<{ isGrid: boolean }>`
  padding: 1rem;
  background-color: ${({ isGrid, theme }) => (isGrid ? theme.colors.MGG_active : theme.colors.MGG_container)};
`

const NUMBER_OF_FARMS_VISIBLE = 12

const NewFarms: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [isGrid, setIsGrid] = useState(true)
  const { account, chainId } = useWeb3React()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const { t } = useTranslation()
  const { data: farmsLP, userDataLoaded } = useFarms()
  const { pools: poolsWithoutAutoVault } = usePools(account)
  const cakePrice = usePriceCakeBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = usePersistState(ViewMode.CARD, { localStorageKey: 'sparkswap_farm_view' })
  const [sortOption, setSortOption] = useState('earned')
  const isArchived = pathname.includes('archived')
  const isInactive = pathname.includes('history')
  const isActive = !isInactive && !isArchived
  const isMobile = useMedia({ maxWidth: 500 })
  const [searchQuery, setSearchQuery] = useState('')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
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

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const loadMoreRef = useRef<HTMLDivElement>(null)

  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const farmsStakedMemoized = useMemo(() => {
    let farmsStaked = []

    const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
      switch (sortOption) {
        case 'apr':
          return orderBy(farms, (farm: FarmWithStakedValue) => farm.apr, 'desc')

        case 'duration':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.remainingDays ? Number(farm.remainingDays) : 0),
            'desc',
          )

        case 'multiplier':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0),
            'desc',
          )

        case 'earned':
          return orderBy(
            farms,
            (farm: FarmWithStakedValue) => (farm.userData ? Number(farm.userData.earnings) : 0),
            'desc',
          )
        case 'liquidity':
          return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      farmsStaked = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      farmsStaked = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }
    if (isArchived) {
      farmsStaked = stakedOnly ? farmsList(stakedArchivedFarms) : farmsList(archivedFarms)
    }

    return sortFarms(farmsStaked).slice(0, numberOfFarmsVisible)
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    archivedFarms,
    isActive,
    isInactive,
    isArchived,
    stakedArchivedFarms,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
  ])

  const [activeTab, setActiveTab] = useState(0)
  const handleItemClick = (index: number) => setActiveTab(index)
  const tabs = [t('Total'), 'Storm', 'Flippers', 'Cakers']

  // TODO aren't arrays in dep array checked just by reference, i.e. it will rerender every time reference changes?
  const [finishedPools, openPools] = useMemo(() => partition(pools, (pool) => pool.isFinished), [pools])
  const [upcomingPools, notUpcomingPools] = useMemo(() => partition(pools, (pool) => pool.isComingSoon), [pools])
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

  const hasStakeInFinishedPools = stakedOnlyFinishedPools.length > 0

  useEffect(() => {
    const showMoreFarms = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    // Uncomment this if !comingsoon
    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [farmsStakedMemoized, observerIsSet])

  const showFinishedPools = pathname.includes('history')
  const showUpcomingPools = pathname.includes('upcoming')

  const handleChangeSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  const sortPools = (poolsToSort: Pool[]) => {
    switch (sortOption) {
      case 'apr':
        // Ternary is needed to prevent pools without APR (like MIX) getting top spot
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.apr ? getAprData(pool, performanceFeeAsDecimal).apr : 0),
          'desc',
        )
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.earningTokenPrice) {
              return 0
            }
            return pool.isAutoVault
              ? getCakeVaultEarnings(
                  account,
                  cakeAtLastUserAction,
                  userShares,
                  pricePerFullShare,
                  pool.earningTokenPrice,
                ).autoUsdToDisplay
              : pool.userData.pendingReward.times(pool.earningTokenPrice).toNumber()
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) => (pool.isAutoVault ? totalCakeInVault.toNumber() : pool.totalStaked.toNumber()),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  const poolsToShow = () => {
    let chosenPools = []
    if (showUpcomingPools) {
      chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    } else if (showFinishedPools) {
      chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    } else {
      chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
    }

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenPools = chosenPools.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  const rowData = farmsStakedMemoized.map((farm) => {
    const { token, quoteToken } = farm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: farm.apr && farm.apr.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: farm.apr,
      },
      farm: {
        label: lpLabel,
        pid: farm.pid,
        token: farm.token,
        quoteToken: farm.quoteToken,
      },
      earned: {
        earnings: getBalanceNumber(new BigNumber(farm.userData.earnings)),
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    return (
      <div style={{ marginTop: '25px', paddingTop: '25px' }}>
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'space-evenly',
            columnGap: '2rem',
            rowGap: '2rem',
          }}
        >
          {farmsStakedMemoized.map((farm) => (
            <FarmCard2
              userDataReady={userDataReady}
              key={farm.pid}
              farm={farm}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}
          {poolsToShow().map((pool, index) => (
            <PoolCard2
              userDataReady={userDataReady}
              key={pool.sousId}
              pool={pool}
              cakePrice={cakePrice}
              account={account}
              removed={false}
            />
          ))}

          <Route exact path={`${path}/history`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                userDataReady={userDataReady}
                key={farm.pid}
                farm={farm}
                cakePrice={cakePrice}
                account={account}
                removed
              />
            ))}
          </Route>
          <Route exact path={`${path}/archived`}>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard
                userDataReady={userDataReady}
                key={farm.pid}
                farm={farm}
                cakePrice={cakePrice}
                account={account}
                removed
              />
            ))}
          </Route>
          {/* {farmsList(activeFarms).map((farm) => ( */}
          {/*  <FarmCard userDataReady={userDataReady} key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed={false} /> */}
          {/* ))} */}
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        style={{
          margin: '5rem 5rem',
        }}
      >
        <Heading size="xl">MGG Vaults</Heading>

        {renderContent()}

        <Flex
          style={{
            flexFlow: 'row wrap',
            justifyContent: 'space-between',
            textAlign: 'center',
            rowGap: '1rem',
            columnGap: '1rem',
            margin: '3rem 0 2rem 0',
          }}
        >
          <FilterItem>
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text> {t('Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons hasStakeInFinishedFarms={stakedInactiveFarms.length > 0} />
          </FilterItem>
          <FilterItem>
            <Text textTransform="uppercase">{t('Search')}</Text>
            <SearchInput onChange={handleChangeQuery} placeholder="Search Farms" />
          </FilterItem>
        </Flex>
        <Heading size="xl">Live Farms</Heading>
        {renderContent()}
        <br />
        <br />
        {/* <Heading size='xl'>
          Past Farms
        </Heading>
        {renderContent()} */}
        <div ref={loadMoreRef} />
      </div>
    </>
  )
}

export default NewFarms
