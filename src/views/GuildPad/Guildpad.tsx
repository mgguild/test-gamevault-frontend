import React, { useMemo } from 'react'
import { Text } from '@metagg/mgg-uikit'
import Guildpads from 'config/constants/guildpads'
import { STATE } from 'config/constants/types';
import Page from 'components/layout/Page'
import { AboutSection, ActiveSection, ApplySection, FooterSection, HomeSection, InactiveSection } from './sections';



const Guildpad: React.FC = () => {

    const activeGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.active), [])
    const inactiveGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.upcoming || guildpad.status === STATE.completed), [])
    // const completedGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.completed), [])

    return (
        <>
            <HomeSection />
            <Page>
                <ActiveSection guildpads={activeGP} />
                <InactiveSection guildpads={inactiveGP} />
                <AboutSection />
                <ApplySection />
            </Page>
            <FooterSection />
        </>
    )
}

export default Guildpad