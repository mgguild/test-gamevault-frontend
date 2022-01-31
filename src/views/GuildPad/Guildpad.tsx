import React, { useMemo } from 'react'
import { Text } from '@metagg/mgg-uikit'
import Guildpads from 'config/constants/guildpads'
import { STATE } from 'config/constants/types';
import Page from 'components/layout/Page'
import { AboutSection, ActiveSection, ApplySection, FooterSection, HomeSection } from './sections';



const Guildpad: React.FC = () => {

    const activeGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.active), [])
    const upcomingGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.upcoming), [])
    const completedGP = useMemo(() => Guildpads.filter((guildpad) => guildpad.status === STATE.completed), [])

    return (
        <>
            <HomeSection />
            <Page>
                <ActiveSection guildpads={activeGP} />
                <AboutSection />
                <ApplySection />
            </Page>
            <FooterSection />
        </>
    )
}

export default Guildpad