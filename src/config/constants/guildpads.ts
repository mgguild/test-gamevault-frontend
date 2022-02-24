import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'

const Guildpads: GuildpadConfig[] = [
  {
    id: 0,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad
  },
  {
    id: 1,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad2
  },
  { // MERGE HOLDER
    id: 2,
    title: 'TankWars Zone',
    toMergeID: 1,
    display: true,
    ... TankWarsZoneGuildpad
  },
  {
    id: 3,
    title: 'Demole',
    ... DemoleGuildpad
  }
]

export default Guildpads
