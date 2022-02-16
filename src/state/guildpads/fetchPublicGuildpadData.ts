import ino from 'config/abi/ino.json'
import BigNumber from 'bignumber.js'
import { getAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { Guildpad } from '../types'
import { isAddress } from '../../utils'
import { getBalanceAmount } from '../../utils/formatBalance'

type PublicBridgeData = {
  hasStarted: boolean
  hasEnded: boolean
  totalSupply: string
  totalSold: string
  totalRaise: string
  boxInfo: any
}

const fetchPublicGuildpadData = async (guildpad: Guildpad): Promise<PublicBridgeData> => {
  const { contractAddress } = guildpad
  const guildpadAddress = getAddress(contractAddress)

  if (!isAddress(guildpadAddress)) {
    return guildpad
  }

  const calls = [
    // check if guildpad already started
    {
      address: guildpadAddress,
      name: 'isStart',
    },
    {
      address: guildpadAddress,
      name: 'getIsFinished',
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaritySupply',
    },
    {
      address: guildpadAddress,
      name: 'getRarity',
      params: [1]
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaritySold',
    },
    {
      address: guildpadAddress,
      name: 'getTotalRaised',
    },
    {
      address: guildpadAddress,
      name: 'getSoldRarity',
      params: [1]
    },
  ]

  const [hasStarted, hasEnded, totalSupply, boxInfo, totalSold, totalRaise, soldRarity1] =
    await multicallv2(ino, calls)

  const boxPrice = getBalanceAmount(new BigNumber(boxInfo.rarityPrice.toString()))
  return {
    hasStarted,
    hasEnded,
    totalSupply: totalSupply.toString(),
    boxInfo: {
      1: {
        price: boxPrice.toString(),
        supply: boxInfo.raritySupply.toString(),
        sold: soldRarity1['0'].toString(),
        percentSold: soldRarity1['0'].div(boxInfo.raritySupply).mul(100).toString(),
      }
    },
    totalSold: totalSold.toString(),
    totalRaise: totalRaise.toString()
  }
}

export default fetchPublicGuildpadData
