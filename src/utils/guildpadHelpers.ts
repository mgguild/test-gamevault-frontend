import { Guildpad } from '../state/types'
import { GUILDPAD_STATUS } from '../config/constants/types'

export const getCountDown = (guildpad: Guildpad) => {
  // asd
}

export const getStatus = (guildpad: Guildpad) => {
  switch (guildpad.status) {
    case GUILDPAD_STATUS.ongoing:
      if (guildpad.hasEnded[0]) {
        return GUILDPAD_STATUS.completed
      } 
      break;
    case GUILDPAD_STATUS.upcoming:
      if (guildpad.hasStarted[0]) {
        return GUILDPAD_STATUS.ongoing
      } 
      break;
    default:
  }

  return guildpad.status;
}
