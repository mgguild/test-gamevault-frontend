import { GuildpadConfig } from './types'
import DemoleGuildpad from './Guildpads/Demole'
import Wizardia from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import GuildpadsLaunched from './guildpadsLaunched'

const Guildpads: GuildpadConfig[] = [
  ...GuildpadsLaunched,
  {
    id: 3,
    title: 'Demole',
    isStatic: true,
    ... DemoleGuildpad
  },
]

export default Guildpads
