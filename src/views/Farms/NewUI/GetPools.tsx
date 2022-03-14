import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import usePersistState from 'hooks/usePersistState'
import BigNumber from 'bignumber.js'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { usePools, useFetchCakeVault, useFetchPublicPoolsData, usePollFarmsData, useCakeVault } from 'state/hooks'
import { latinise } from 'utils/latinise'
import useMedia from 'use-media'
import Select, { OptionProps } from 'components/Select/Select'
import { Pool } from 'state/types'
import { getAprData, getCakeVaultEarnings } from '../../Pools/helpers'

const NUMBER_OF_POOLS_VISIBLE = 12

const GetPools = async (loadMoreRef, account) => {
  // const { account, chainId } = useWeb3React()
  const { pools: poolsWithoutAutoVault, userDataLoaded } = usePools(account)
  const userDataReady = !account || (!!account && userDataLoaded)
  const [stakedOnly, setStakedOnly] = usePersistState(false, { localStorageKey: 'pancake_pool_staked' })
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOption, setSortOption] = useState('hot')
  const isMobile = useMedia({ maxWidth: 500 })
  const {
    userData: { cakeAtLastUserAction, userShares },
    fees: { performanceFee },
    pricePerFullShare,
    totalCakeInVault,
  } = useCakeVault()
  const accountHasVaultShares = userShares && userShares.gt(0)
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  const pools = useMemo(() => {
  const cakePool = poolsWithoutAutoVault.map((pool) => pool.sousId === 0)
  const cakeAutoVault = { ...cakePool, isAutoVault: true }

    return [...poolsWithoutAutoVault]
  }, [poolsWithoutAutoVault])

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

  usePollFarmsData()
  useFetchCakeVault()
  useFetchPublicPoolsData()

  useEffect(() => {
    const showMorePools = (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      // loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  // const showFinishedPools = location.pathname.includes('history')
  // const showUpcomingPools = location.pathname.includes('upcoming')

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
    // if (showUpcomingPools) {
    //   chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    // } else if (showFinishedPools) {
    //   chosenPools = stakedOnly ? stakedOnlyFinishedPools : finishedPools
    // } else {
    //   chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools
    // }

    chosenPools = stakedOnly ? stakedOnlyOpenPools : openPools

    if (searchQuery) {
      const lowercaseQuery = latinise(searchQuery.toLowerCase())
      chosenPools = chosenPools.filter((pool) =>
        latinise(pool.earningToken.symbol.toLowerCase()).includes(lowercaseQuery),
      )
    }

    console.log(chosenPools)

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  return poolsToShow
}

export default GetPools