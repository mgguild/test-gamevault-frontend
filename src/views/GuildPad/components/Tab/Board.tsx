import React, { useMemo } from 'react'
import { Flex } from '@metagg/mgg-uikit'
import Post from 'components/Launchpad/Post'
import { IGuildpad, STATE } from 'config/constants/types'
import NoLaunches from '../NoLaunches'
import { OrganizerContainer } from './styled'

const Completed: React.FC<{ guildpads?: IGuildpad[] }> = ({ guildpads }) => {
  // Content for completed tab here

  const renderCompleted = (launchpads) => (
    <OrganizerContainer>
      {launchpads.map((launchpad) => (
        <Post guildpad={launchpad} />
      ))}
    </OrganizerContainer>
  )
  return guildpads.length === 0 ? <NoLaunches section="COMPLETED" /> : renderCompleted(guildpads)
}

const Upcoming: React.FC<{ guildpads?: IGuildpad[]}> = ({ guildpads }) => {
  const renderUpcoming = (launchpads) => (
    <OrganizerContainer>
      {launchpads.map((launchpad) => (
        <Post guildpad={launchpad} />
      ))}
    </OrganizerContainer>
  )
  return guildpads.length === 0 ? <NoLaunches section="UPCOMING" /> : renderUpcoming(guildpads)
}

const Board: React.FC<{ tab: number; guildpads?: IGuildpad[]}> = ({ tab, guildpads }) => {
  // Placeholder data
  const completedLaunches = useMemo(
    () => guildpads.filter((guildpad) => guildpad.status === STATE.completed),
    [guildpads],
  )
  const upcomingLaunches = useMemo(
    () => guildpads.filter((guildpad) => guildpad.status === STATE.upcoming),
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
