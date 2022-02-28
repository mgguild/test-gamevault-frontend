import { GuildpadConfig } from './types'
import MergingTemplate from './Guildpads/mergingTemplate'
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
    toMergeID: 1,
    ... MergingTemplate
  },
  {
    id: 4,
    title: 'Demole',
    ... DemoleGuildpad
  }
]

export default Guildpads
