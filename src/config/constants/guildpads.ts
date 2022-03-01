import { GuildpadConfig, GUILDPAD_STATUS } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'

const Guildpads: GuildpadConfig[] = [
  {
    id: 1,
    title: 'TankWars Zone',
    nextRoundID: 2,
    ... TankWarsZoneGuildpad
  },
  {
    id: 2,
    title: 'TankWars Zone (Round 2)',
    ... TankWarsZoneGuildpad2
  },
  { // MERGE HOLDER
    id: 3,
    title: 'TankWars Zone',
    description: 'MERGING TEMPLATE',
    round: '1',
    status: GUILDPAD_STATUS.completed,
    toMergeID: 1,
    contractAddress: {
      97: '0x002',
      56: '0x002',
    },
    hasEnded: true,
  },
  {
    id: 4,
    title: 'Demole',
    ... DemoleGuildpad
  }
]

export default Guildpads
