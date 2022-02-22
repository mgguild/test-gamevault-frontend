/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { Guildpad, GuildpadState } from '../types'

interface GPsIDsToMerge{
  title: string
  startingIndex: number
}

const groupMergables = (guildpads: Guildpad[]) => {
  const GPTitles = []
  const GPsIDsToMerge: GPsIDsToMerge[] = []

  // Filter guildpad titles that has ended and skip if no nextRoundID
  guildpads.forEach((guildpad, index) => {
    if(guildpad.hasEnded && guildpad.nextRoundID && !GPTitles.includes(guildpad.title)){
      // Get unique titles only
      GPTitles.push(guildpad.title)
      GPsIDsToMerge.push({title: guildpad.title, startingIndex: index})
    }
    return true
  })

  return GPsIDsToMerge
}

const mergingGuildpads = async (guildpads: Guildpad[]): Promise<Guildpad[]> => {
  const GPsIDsToMerge = groupMergables(guildpads)

  GPsIDsToMerge.forEach((GPToMerge, index) => {

    let currentGP = guildpads[GPToMerge.startingIndex]

    // Iterate through nextRoundID
    while(currentGP.nextRoundID && guildpads[currentGP.nextRoundID] && guildpads[currentGP.nextRoundID].hasEnded){
      const iterateGP = currentGP;

      Object.keys(guildpads[iterateGP.id]).forEach((key) => {
        if(key === 'totalSold' || key === 'totalRaise'){
          // Sum of totalSold and totalsRaise of from rounds
          guildpads[GPToMerge.startingIndex][key] = new BigNumber(guildpads[iterateGP.id][key]).plus(new BigNumber(guildpads[iterateGP.nextRoundID][key])).toString()
        }
      })

      currentGP = guildpads[currentGP.nextRoundID]
    }
  })

  return guildpads // guildpads merged
}

export default mergingGuildpads