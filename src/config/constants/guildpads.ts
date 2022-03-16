import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'
import WizardiaGuildpad from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import Ookeenga from './Guildpads/Ookeenga'

const Guildpads: GuildpadConfig[] = [
  {
    id: 1,
    title: 'TankWars Zone',
    nextRoundID: 2,
    isStatic: false,
    ... TankWarsZoneGuildpad
  },
  {
    id: 2,
    title: 'TankWars Zone (Round 2)',
    isStatic: false,
    ... TankWarsZoneGuildpad2
  },
  {
    id: 3,
    title: 'Wizardia',
    isStatic: true,
    ... Wizardia2
  },
  {
    id: 4,
    title: 'Demole',
    isStatic: true,
    ... DemoleGuildpad
  },{
    id: 5,
    title: 'Ookeenga',
    isStatic: true,
    ... Ookeenga
  },
]

export default Guildpads
