import React, { useMemo } from 'react'
import { Flex } from '@metagg/mgg-uikit'
import Post from 'components/Launchpad/Post'
import { GuildpadConfig, GUILDPAD_STATUS } from 'config/constants/types'
import NoLaunches from '../NoLaunches'
import { OrganizerContainer } from './styled'

const Completed: React.FC<{ guildpads?: GuildpadConfig[] }> = ({ guildpads }) => {
  // Content for completed tab here

  const renderCompleted = (launchpads) => {
    const temp = [...launchpads].reverse()
    return(
      <OrganizerContainer>
        {temp.map((launchpad) => (
          <Post key={launchpad.address} guildpad={launchpad} />
        ))}
      </OrganizerContainer>
    )
  }
  return guildpads.length === 0 ? <NoLaunches section="COMPLETED" /> : renderCompleted(guildpads)
}

const Upcoming: React.FC<{ guildpads?: GuildpadConfig[]}> = ({ guildpads }) => {
  const renderUpcoming = (launchpads) => {
     const temp = [...launchpads].reverse()
    return(
      <OrganizerContainer>
        {temp.map((launchpad) => (
          <Post key={launchpad.address} guildpad={launchpad} />
        ))}
    </OrganizerContainer>
    )
  }
  return guildpads.length === 0 ? <NoLaunches section="UPCOMING" /> : renderUpcoming(guildpads)
}

const Board: React.FC<{ tab: number; guildpads?: GuildpadConfig[]}> = ({ tab, guildpads }) => {
  // Placeholder data
  const completedLaunches = useMemo(
    () => guildpads.filter((guildpad) => guildpad.status === GUILDPAD_STATUS.completed),
    [guildpads],
  )
  const upcomingLaunches = useMemo(
    () => guildpads.filter((guildpad) => guildpad.status === GUILDPAD_STATUS.upcoming),
    [guildpads],
  )

  switch (tab) {
    case 2:
      return <Completed guildpads={completedLaunches} />
    case 1:
    default:
      return <Upcoming guildpads={upcomingLaunches} />
  }
}

export default Board
