/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { GUILDPAD_STATUS } from 'config/constants/types'
import { Guildpad } from '../types'


const mergingGuildpads = async (guildpads: Guildpad[]): Promise<Guildpad[]> => {

  guildpads.forEach((guildpad, index) => {
    // Find toMergeID property exists and check if ended and completed
    if(guildpad.toMergeID && guildpad.hasEnded && guildpad.status === GUILDPAD_STATUS.completed){

      // copy all first round values
      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.toMergeID)[0]
      guildpads[index] = toMergeGP

      if(toMergeGP.nextRoundID && toMergeGP.hasEnded && toMergeGP.status === GUILDPAD_STATUS.completed){
        const nextRoundGP = guildpads.filter((gp) => gp.id === toMergeGP.nextRoundID)[0]

        Object.keys(guildpads[index]).forEach((key) => {
          if(key === 'totalSold' || key === 'totalRaise'){
            // Sum of totalSold and totalsRaise of from rounds
            guildpads[index][key] = new BigNumber(guildpads[index][key]).plus(new BigNumber(nextRoundGP[key])).toString()
          }
          if(key === 'epochEndDate'){
            // get latest round epochEndDate
            guildpads[index][key] = nextRoundGP[key]
          }
        })
        guildpads[index].round = 'MERGED'
        guildpads[index].display = true // auto apply if merge successful
      }else{
        guildpads[index].display = false
      }
    }
  })
  return guildpads // guildpads merged
}

export default mergingGuildpads