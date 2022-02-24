/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { GUILDPAD_STATUS } from 'config/constants/types'
import { Guildpad } from '../types'


const mergingGuildpads = async (guildpads: Guildpad[]): Promise<Guildpad[]> => {

  guildpads.forEach((guildpad, index) => {
    // Find toMergeID property exists and check if ended
    if(guildpad.toMergeID && guildpad.hasEnded && guildpad.status === GUILDPAD_STATUS.completed){

      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.toMergeID)[0]

      if(toMergeGP.hasEnded && toMergeGP.status === GUILDPAD_STATUS.completed){
        Object.keys(guildpad).forEach((key) => {
          if(key === 'totalSold' || key === 'totalRaise'){
            // Sum of totalSold and totalsRaise of from rounds
            guildpads[index][key] = new BigNumber(guildpad[key]).plus(new BigNumber(toMergeGP[key])).toString()
          }
          if(key === 'epochEndDate'){
            // get latest round epochEndDate
            guildpads[index][key] = toMergeGP[key]
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