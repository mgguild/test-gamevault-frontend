import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'

const Guildpads: GuildpadConfig[] = [
  {
    id: 1,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad2
  },
  {
    id: 2,
    title: 'Demole',
    ... DemoleGuildpad
  },
]

export default Guildpads
