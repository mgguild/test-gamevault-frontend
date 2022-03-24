import BigNumber from 'bignumber.js'
import ino from 'config/abi/ino.json'
import ido from 'config/abi/ido.json'
import vesting from 'config/abi/vesting.json'
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


export const fetchIsWhitelisted = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: guildpad.vestingAddress ? getAddress(guildpad.vestingAddress) : "",
      name: 'isWhitelistExist',
      params: [account], type: guildpad.type, vestingAddress: guildpad.vestingAddress
    }
  }).filter(gpad => {
    return isAddress(gpad.address) && gpad.type === 'IDO'
  })
  const returnData = await multicall(vesting, calls)
  return returnData[0][0]
}

export const fetchDistributedAmount = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch.map((guildpad) => {
    return {
      address: guildpad.vestingAddress ? getAddress(guildpad.vestingAddress) : "",
      name: 'distributedAmount',
      params: [account], type: guildpad.type,
    }
  }).filter(gpad => {
    return isAddress(gpad.address) && gpad.type === 'IDO'
  })
  const returnData = await multicall(vesting, calls)
  console.log(returnData)
  let data = []

  for (let x = 0 ; x < returnData[0][0].length ; x++ ){
    data = [...data, { amount: (returnData[0][0][x].amount).toString(), epoch: (returnData[0][0][x].epoch).toString(), isClaimed: returnData[0][0][x].isClaimed }]
  }

  return data
} 