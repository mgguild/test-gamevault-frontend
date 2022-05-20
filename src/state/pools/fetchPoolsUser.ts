import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import fixedAprPoolABI from 'config/abi/fixedAprPool.json'
import multicall from 'utils/multicall'
import { getMasterchefContract } from 'utils/contractHelpers'
import { getAddress } from 'utils/addressHelpers'
import web3NoAccount from 'utils/web3'
import BigNumber from 'bignumber.js'
import { PoolCategory } from 'config/constants/types'
import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from 'config'

// Test or Main Mode
const testnetMode = process.env.REACT_APP_BSC_TESTNETMODE === 'true'
const chainMode = testnetMode ? TESTNET_CHAIN_ID : MAINNET_CHAIN_ID

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.symbol !== 'BNB')
const bnbPools = poolsConfig.filter((p) => p.stakingToken.symbol === 'BNB')
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0 && p.poolCategory !== PoolCategory.FIXEDAPR)
const fixedAPRPools = poolsConfig.filter((p) => p.poolCategory === PoolCategory.FIXEDAPR)
const masterChefContract = getMasterchefContract(null, chainMode)

export const fetchPoolsAllowance = async (account) => {
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address, testnetMode ? TESTNET_CHAIN_ID : p.chain),
    name: 'allowance',
    params: [account, getAddress(p.contractAddress, testnetMode ? TESTNET_CHAIN_ID : p.chain)],
  }))

  const allowances = await multicall(erc20ABI, calls, {}, chainMode)

  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: getAddress(p.stakingToken.address, testnetMode ? TESTNET_CHAIN_ID : p.chain),
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls, {}, chainMode)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await web3NoAccount.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress, testnetMode ? TESTNET_CHAIN_ID : p.chain),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls, {}, chainMode)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress, testnetMode ? TESTNET_CHAIN_ID : p.chain),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls, {}, chainMode)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Cake / Cake pool
  const pendingReward = await masterChefContract.methods.pendingCake('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}

export const fetchUserFixedAprDetails = async (account) => {
  const callUserFixedAprStakedOf = fixedAPRPools.map((p) => (
    {
      address: getAddress(p.contractAddress, testnetMode ? TESTNET_CHAIN_ID : p.chain),
      name: 'stakedOf',
      params: [account],
    }
  ))

  const callUserAllStakesDetails = fixedAPRPools.map((p) => (
    {
      address: getAddress(p.contractAddress, testnetMode ? TESTNET_CHAIN_ID : p.chain),
      name: 'getAllStakeDetails',
      params: [account],
    }
  ))

  const userStakedOf = await multicall(fixedAprPoolABI, callUserFixedAprStakedOf, {}, chainMode)
  const allStakesDetails = await multicall(fixedAprPoolABI, callUserAllStakesDetails, {}, chainMode)

  const parseDetails = {}

  fixedAPRPools.forEach((p, index) => {
    const parseStakes = []

    allStakesDetails[index][0].forEach(detail => {
      parseStakes.push(
        {
          id: new BigNumber(detail.id._hex).toJSON(),
          owner: detail.owner,
          tier: new BigNumber(detail.tier._hex).toJSON(),
          amount: new BigNumber(detail.amount._hex).toJSON(),
          claimed: new BigNumber(detail.claimed._hex).toJSON(),
          stakedAt: new BigNumber(detail.stakedAt._hex).toJSON(),
          lastClaimedAt: new BigNumber(detail.lastClaimedAt._hex).toJSON(),
        }
      )
    })

    parseDetails[p.sousId] = {
      totalStaked: new BigNumber(userStakedOf[index][0]._hex).toJSON(),
      stakesDetails: parseStakes
    }
  })

  return parseDetails
}