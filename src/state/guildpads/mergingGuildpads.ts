/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { Guildpad, GuildpadState } from '../types'


const mergingGuildpads = async (guildpads: Guildpad[]): Promise<Guildpad[]> => {

  guildpads.forEach((guildpad, index) => {
    // Find toMergeID property exists
    if(guildpad.toMergeID){
      guildpads[index].round = 'MERGED'
      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.toMergeID)[0]

      Object.keys(guildpad).forEach((key) => {
        if(key === 'totalSold' || key === 'totalRaise'){
          // Sum of totalSold and totalsRaise of from rounds
          guildpads[index][key] = new BigNumber(guildpad[key]).plus(new BigNumber(toMergeGP[key])).toString()
        }
      })
    }
  })

  return guildpads // guildpads merged
}

export default mergingGuildpads