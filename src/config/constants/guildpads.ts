import { GuildpadConfig } from './types'
import DemoleGuildpad from './Guildpads/Demole'
import WizardiaGuildpad from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import GuildpadsLaunched from './guildpadsLaunched'

const Guildpads: GuildpadConfig[] = [
  ...GuildpadsLaunched,
  {
    id: 3,
    title: 'Wizardia',
    isStatic: false,
    ... Wizardia2
  },
  {
    id: 4,
    title: 'Demole',
    isStatic: true,
    ... DemoleGuildpad
  },
]

export default Guildpads
