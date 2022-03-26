import BigNumber from 'bignumber.js'
import ino from 'config/abi/ino.json'
import ido from 'config/abi/ido.json'
import vesting from 'config/abi/vesting.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { GuildpadConfig, TYPE } from 'config/constants/types'
import { epochEnded, isAddress } from '../../utils'
import { getBalanceAmount } from '../../utils/formatBalance'
import { Guildpad } from '../types'

export const fetchGuildpadUserBoxes = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch
    .map((guildpad) => {
      return {
        address: getAddress(guildpad.contractAddress),
        name: 'getAddressRewardedAmount',
        params: [account, 1],
        type: guildpad.type,
      }
    })
    .filter((gpad) => {
      return isAddress(gpad.address) && gpad.type === 'INO'
    })
  const rawBoxes = await multicall(ino, calls)
  const parsedBoxes = rawBoxes.map((box) => {
    return new BigNumber(box).toJSON()
  })
  return parsedBoxes
}

export const fetchGuildpadIsUserWhitelisted = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch
    .map((guildpad) => {
      return {
        address: getAddress(guildpad.contractAddress),
        name: 'getAddressInWhitelist',
        params: [account],
        type: guildpad.type,
      }
    })
    .filter((gpad) => {
      return isAddress(gpad.address) && gpad.type === 'INO'
    })
  const rawValues = await multicall(ino, calls)
  const parseValues = rawValues.map((value) => {
    return value[0]
  })
  return parseValues
}

export const fetchGuildpadIgoUserDetails = async (account: string, guildpadsToFetch: GuildpadConfig[]) => {
  const calls = guildpadsToFetch
    .map((guildpad) => {
      return {
        address: getAddress(guildpad.contractAddress),
        name: 'getWhitelist',
        params: [account],
        type: guildpad.type,
      }
    })
    .filter((gpad) => {
      return isAddress(gpad.address) && gpad.type === 'IDO'
    })
  const rawValues = await multicall(ido, calls)

  const parsedValues = guildpadsToFetch
    .filter((gpad) => {
      return gpad.type === 'IDO' && isAddress(getAddress(gpad.contractAddress))
    })
    .map((guildpad, index) => {
      return {
        id: guildpad.id,
        address: getAddress(guildpad.contractAddress),
        type: guildpad.type,
        details: {
          amount: getBalanceAmount(rawValues[index]._amount.toString(), guildpad.sellingCoin.decimals).toPrecision(),
          maxPayableAmount: getBalanceAmount(
            rawValues[index]._maxPayableAmount.toString(),
            guildpad.sellingCoin.decimals,
          ).toPrecision(),
          rewardedAmount: getBalanceAmount(
            rawValues[index]._rewardedAmount.toString(),
            guildpad.sellingCoin.decimals,
          ).toPrecision(),
          redeemed: rawValues[index]._redeemed,
          whitelist: rawValues[index]._whitelist,
        },
      }
    })

  // const parseValues = rawValues.map((value, index) => {
  //   return value
  // })
  return parsedValues
}

export const fetchUserHasClaimable = async (account: string, guildpadsToFetch: Guildpad[]) => {
  const calls = guildpadsToFetch
    .map((guildpad) => {
      return {
        address: guildpad.vestingAddress ? getAddress(guildpad.vestingAddress) : '',
        name: 'isWhitelistExist',
        params: [account],
        type: guildpad.type,
        vestingAddress: guildpad.vestingAddress,
      }
    })
    .filter((gpad) => {
      return isAddress(gpad.address) && gpad.type === 'IDO' && isAddress(getAddress(gpad.vestingAddress))
    })
  const rawValues = await multicall(vesting, calls)

  const parsedValues = guildpadsToFetch
    .filter((gpad) => {
      const isAddressValid = isAddress(getAddress(gpad.contractAddress))
      const isVestingAddressValid = gpad.vestingAddress ? isAddress(getAddress(gpad.vestingAddress)) : false
      return isAddressValid && isVestingAddressValid && gpad.type === TYPE.IDO
    })
    .map((guildpad, index) => {
      return {
        ...guildpad,
        userData: {
          vesting: {
            hasClaimable: rawValues[index][0],
          },
        },
      }
    })

  return parsedValues
}

export const fetchUserDistributionDetails = async (account: string, guildpadsToFetch: Guildpad[]) => {
  if (guildpadsToFetch.length === 0) {
    return []
  }
  const calls = guildpadsToFetch
    .filter((gpad) => {
      const isAddressValid = isAddress(getAddress(gpad.contractAddress))
      const userHasClaimable = gpad.userData.vesting.hasClaimable
      const isVestingAddressValid = gpad.vestingAddress ? isAddress(getAddress(gpad.vestingAddress)) : false
      return isAddressValid && isVestingAddressValid && gpad.type === TYPE.IDO && userHasClaimable
    })
    .map((guildpad) => {
      return {
        address: getAddress(guildpad.vestingAddress),
        name: 'distributedAmount',
        params: [account],
        type: guildpad.type,
        vestingAddress: guildpad.vestingAddress,
      }
    })

  const rawValues = await multicall(vesting, calls)
  const parsedValues = guildpadsToFetch
    .filter((gpad) => {
      const isAddressValid = isAddress(getAddress(gpad.contractAddress))
      const userHasClaimable = gpad.userData.vesting.hasClaimable
      const isVestingAddressValid = gpad.vestingAddress ? isAddress(getAddress(gpad.vestingAddress)) : false
      return isAddressValid && isVestingAddressValid && gpad.type === TYPE.IDO && userHasClaimable
    })
    .map((guildpad, index) => {
      let data = []
      let toClaimTotal = 0
      let epochToClaimNext = rawValues[index][0][0].epoch
      for (let x = 0; x < rawValues[index][0].length; x++) {
        if (epochEnded(rawValues[index][0][x].epoch) && !rawValues[index][0][x].isClaimed) {
          toClaimTotal += parseInt(rawValues[index][0][x].amount)
          if (x + 1 < rawValues[index][0].length && !epochEnded(rawValues[index][0][x + 1].epoch)) {
            epochToClaimNext = rawValues[index][0][x + 1].epoch
          }
        }
        data = [
          ...data,
          {
            amount: rawValues[index][0][x].amount.toString(),
            epoch: rawValues[index][0][x].epoch.toString(),
            isClaimed: rawValues[index][0][x].isClaimed,
          },
        ]
      }

      return {
        ...guildpad,
        userData: {
          vesting: {
            epochToClaimNext: epochToClaimNext.toString(),
            toClaimTotal,
            hasClaimable: guildpad.userData.vesting.hasClaimable,
            distributionDetails: data,
          },
        },
      }
    })
  return parsedValues
}
