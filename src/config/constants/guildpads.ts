import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'
import WizardiaGuildpad from './Guildpads/Wizardia'

const Guildpads: GuildpadConfig[] = [
  {
    id: 3,
    title: 'Wizardia',
    ... WizardiaGuildpad
  },
  {
    id: 2,
    title: 'Demole',
    ... DemoleGuildpad
  },
  {
    id: 1,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad
  },
]

export default Guildpads
