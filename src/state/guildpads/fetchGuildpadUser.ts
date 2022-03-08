import BigNumber from 'bignumber.js'
import ino from 'config/abi/ino.json'
import ido from 'config/abi/ido.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { GuildpadConfig, TYPE } from 'config/constants/types'
import { isAddress } from '../../utils'
import { getBalanceAmount } from '../../utils/formatBalance'


export const fetchGuildpadUserBoxes = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: getAddress(guildpad.contractAddress),
      name: 'getAddressRewardedAmount',
      params: [account, 1], type: guildpad.type,

    }
  }).filter(gpad => {
    return isAddress(gpad.address) && gpad.type === 'INO'
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
      type: guildpad.type
    }
  }).filter(gpad => {
    return isAddress(gpad.address) && gpad.type === 'INO'
  })
  const rawValues = await multicall(ino, calls)
  const parseValues = rawValues.map((value) => {
    return value[0]
  })
  return parseValues
}

export const fetchGuildpadIgoUserDetails = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: getAddress(guildpad.contractAddress),
      name: 'getWhitelist',
      params: [account],
      type: guildpad.type
    }
  }).filter(gpad => {
    return isAddress(gpad.address) && gpad.type === 'IDO'
  })
  const rawValues = await multicall(ido, calls)

  const parsedValues = guildpadsToFetch.filter((gpad) => {
    return gpad.type === 'IDO' && isAddress(getAddress(gpad.contractAddress))
  })
    .map((guildpad, index) => {
    return {
      id: guildpad.id,
      address: getAddress(guildpad.contractAddress),
      type: guildpad.type,
      details: {
        amount: getBalanceAmount(rawValues[index]._amount.toString(), guildpad.sellingCoin.decimals).toPrecision(),
        maxPayableAmount: getBalanceAmount(rawValues[index]._maxPayableAmount.toString(), guildpad.sellingCoin.decimals).toPrecision(),
        rewardedAmount: getBalanceAmount(rawValues[index]._rewardedAmount.toString(), guildpad.sellingCoin.decimals).toPrecision(),
        redeemed: rawValues[index]._redeemed,
        whitelist: rawValues[index]._whitelist,
      }
    }
  })

  // const parseValues = rawValues.map((value, index) => {
  //   return value
  // })
  return parsedValues
}
