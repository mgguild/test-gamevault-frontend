import { GuildpadConfig } from './types'
import DemoleGuildpad from './Guildpads/Demole'
import Wizardia from './Guildpads/Wizardia'
import Wizardia2 from './Guildpads/Wizardia2'
import GuildpadsLaunched from './guildpadsLaunched'
import Ookeenga from './Guildpads/Ookeenga'
import Ookeenga2 from './Guildpads/Ookeenga2'

const Guildpads: GuildpadConfig[] = [
  ...GuildpadsLaunched,
  {
    id: 4,
    title: 'Demole',
    isStatic: true,
    ...DemoleGuildpad,
  },
]

export default Guildpads
