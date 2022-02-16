import ino from 'config/abi/ino.json'
import { getAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import { Guildpad } from '../types'
import { isAddress } from '../../utils'

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
    return {
      hasStarted: false,
      hasEnded: false,
      totalSupply: '0',
      boxInfo: {},
      totalSold: '0',
      totalRaise: '0'
    }
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
  ]

  const [hasStarted, hasEnded, totalSupply, boxInfo, totalSold, totalRaise] =
    await multicallv2(ino, calls)

  return {
    hasStarted,
    hasEnded,
    totalSupply: totalSupply.toString(),
    boxInfo: {
      1: {
        price: boxInfo.rarityPrice.toString(),
        supply: boxInfo.raritySupply.toString(),
      }
    },
    totalSold: totalSold.toString(),
    totalRaise: totalRaise.toString()
  }
}

export default fetchPublicGuildpadData
