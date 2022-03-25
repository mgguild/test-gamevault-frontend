import { GuildpadConfig } from './types'
import DemoleGuildpad from './Guildpads/Demole'
import Wizardia from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import GuildpadsLaunched from './guildpadsLaunched'
import Ookeenga from './Guildpads/Ookeenga'

const Guildpads: GuildpadConfig[] = [
  ...GuildpadsLaunched,
  {
    id: 5,
    title: 'Ookeenga',
    isStatic: true,
    ...Ookeenga,
  },
  {
    id: 4,
    title: 'Demole',
    isStatic: true,
    ...DemoleGuildpad,
  },
]

export default Guildpads
