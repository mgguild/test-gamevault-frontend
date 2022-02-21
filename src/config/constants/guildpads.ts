import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'

const Guildpads: GuildpadConfig[] = [
  {
    id: 1,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad
  },
  {
    id: 2,
    title: 'Demole',
    ... DemoleGuildpad
  },
]

export default Guildpads
