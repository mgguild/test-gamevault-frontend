import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import ino from 'config/abi/ino.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { FarmConfig, GuildpadConfig } from 'config/constants/types'
import { isAddress } from '../../utils'

export const fetchFarmUserAllowances = async (account: string, farmsToFetch: FarmConfig[]) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = getAddress(farm.lpAddresses)
    return { address: lpContractAddress, name: 'allowance', params: [account, getAddress(farm.stakingAddresses)] }
  })

  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchGuildpadUserBoxes = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: getAddress(guildpad.contractAddress),
      name: 'getAddressRewardedAmount',
      params: [account, 1],
    }
  }).filter(gpad => {
    return isAddress(gpad.address)
  })
  const rawBoxes = await multicall(ino, calls)
  const parsedBoxes = rawBoxes.map((box) => {
    return new BigNumber(box).toJSON()
  })
  return parsedBoxes
}

export const fetchGuildpadUserLimits = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: getAddress(guildpad.contractAddress),
      name: 'getAddressRewardedAmount',
      params: [account, 1],
    }
  }).filter(gpad => {
    return isAddress(gpad.address)
  })
  const rawBoxes = await multicall(ino, calls)
  const parsedBoxes = rawBoxes.map((box) => {
    return new BigNumber(box).toJSON()
  })
  return parsedBoxes
}
