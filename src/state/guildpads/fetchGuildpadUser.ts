import BigNumber from 'bignumber.js'
import ino from 'config/abi/ino.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { GuildpadConfig } from 'config/constants/types'
import { isAddress } from '../../utils'


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

export const fetchGuildpadIsUserWhitelisted = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: getAddress(guildpad.contractAddress),
      name: 'getAddressInWhitelist',
      params: [account],
    }
  }).filter(gpad => {
    return isAddress(gpad.address)
  })
  const rawValues = await multicall(ino, calls)
  const parseValues = rawValues.map((value) => {
    return value[0]
  })
  return parseValues
}
