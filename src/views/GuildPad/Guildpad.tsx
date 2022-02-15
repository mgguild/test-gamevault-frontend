import React, { useMemo } from 'react'
import { Text } from '@metagg/mgg-uikit'
import { Element } from 'react-scroll'
import { useGuildpads } from 'state/hooks'
import { STATE } from 'config/constants/types'
import Page from 'components/layout/Page'
import { AboutSection, ActiveSection, ApplySection, FooterSection, HomeSection, InactiveSection } from './sections'

const Guildpad: React.FC = () => {
  const { data: Guildpads } = useGuildpads()
  const activeGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.active), [Guildpads])
  const inactiveGP = useMemo(
    () => Guildpads.filter((guildpad) => guildpad.status === STATE.upcoming || guildpad.status === STATE.completed),
    [Guildpads],
  )
  // const completedGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.completed), [])

  return (
    <>
      <HomeSection />
      <Page>
        <Element name="activeSection">
          <ActiveSection guildpads={activeGP} />
        </Element>
        <InactiveSection guildpads={inactiveGP} />
        <AboutSection />
        <ApplySection />
      </Page>
      <FooterSection />
    </>
  )
}

export default Guildpad
