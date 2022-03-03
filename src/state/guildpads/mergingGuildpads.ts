/* eslint-disable no-param-reassign */

import BigNumber from 'bignumber.js'
import { GUILDPAD_STATUS } from 'config/constants/types'
import { Guildpad } from '../types'


const mergingGuildpads = (guildpads: Guildpad[]): Guildpad[] => {

  const mergesGP = []

  guildpads.forEach((guildpad, index) => {
    let merging: Guildpad = {
      id: guildpads.length + 1,
      title: guildpad.title,
      description: guildpad.description,
      round: `MERGED ${guildpad.title}`,
      status: GUILDPAD_STATUS.completed,
    }
    // Find toMergeID property exists and check if ended and completed
    if(!guildpad.merged && guildpad.nextRoundID && guildpad.hasEnded && guildpad.status === GUILDPAD_STATUS.completed){
      // copy all first round values
      merging = {...guildpads[index], ...merging}
      // Get next round GP
      const toMergeGP = guildpads.filter((gp) => gp.id === guildpad.nextRoundID)[0]

      if(toMergeGP && toMergeGP.hasEnded && toMergeGP.status === GUILDPAD_STATUS.completed){
        guildpads[index].nextRoundID = 0
        Object.keys(guildpads[index]).forEach((key) => {
          if(key === 'totalSold' || key === 'totalRaise'){
            // Sum of totalSold and totalsRaise of from rounds
            merging[key] = new BigNumber(guildpads[index][key]).plus(new BigNumber(toMergeGP[key])).toString()
          }
          if(key === 'epochEndDate'){
            // get latest round epochEndDate
            merging[key] = toMergeGP[key]
          }
        })
        merging.id = guildpads.length + 1
        merging.display = true

        // remove mergable conditions
        merging.nextRoundID = 0
        guildpads[index].merged = true

        mergesGP.push(merging)
      }
    }
  })
  return mergesGP // guildpad merges
}

export default mergingGuildpads