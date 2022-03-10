import { Guildpad } from '../state/types'
import { GUILDPAD_STATUS } from '../config/constants/types'
import { toBigNumber } from './formatBalance'

export const getCountDown = (guildpad: Guildpad) => {
  // asd
}

export const getGuildpadStatus = (guildpad: Guildpad) => {
  const remainingSupply = toBigNumber(guildpad.remainingSupply)

  switch (guildpad.status) {
    case GUILDPAD_STATUS.ongoing:
      if (guildpad.hasEnded || remainingSupply.isZero()) {
        return GUILDPAD_STATUS.completed
      }
      break
    case GUILDPAD_STATUS.upcoming:
      if (guildpad.hasStarted) {
        return GUILDPAD_STATUS.ongoing
      }
      break
    default:
  }

  return guildpad.status
}
