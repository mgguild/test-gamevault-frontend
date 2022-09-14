import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Element } from 'react-scroll'
import { useGuildpadData, useGuildpads } from 'state/hooks'
import { GUILDPAD_STATUS } from 'config/constants/types'
import Page from 'components/layout/Page'
import { AboutSection, ActiveSection, ApplySection, FooterSection, HomeSection, InactiveSection, MGGVestingSection } from './sections'

const Guildpad: React.FC = () => {
  const { data: Guildpads } = useGuildpads()
  const activeGP = useMemo(
    () => Guildpads.filter((guildpad) => guildpad.status === GUILDPAD_STATUS.ongoing),
    [Guildpads],
  )
  const inactiveGP = useMemo(
    () =>
      Guildpads.filter(
        (guildpad) =>
          guildpad.status === GUILDPAD_STATUS.upcoming ||
          (guildpad.status === GUILDPAD_STATUS.completed && guildpad.display),
      ),
    [Guildpads],
  )
  useGuildpadData()
  return (
    <>
      <HomeSection />
      <Page>
        <Element name="activeSection">
          <ActiveSection guildpads={activeGP} />
        </Element>
        <InactiveSection guildpads={inactiveGP} />
        <MGGVestingSection />
        <AboutSection />
        <ApplySection />
      </Page>
      <FooterSection />
    </>
  )
}

export default Guildpad
