import React from 'react'
import { Text } from '@metagg/mgg-uikit'
import Page from 'components/layout/Page'
import { AboutSection, ActiveSection, ApplySection, FooterSection, HomeSection } from './sections';


const Guildpad: React.FC = () => {
    return (
        <>
            <HomeSection />
            <Page>
                <ActiveSection />
                <AboutSection />
                <ApplySection />
            </Page>
            <FooterSection />
        </>
    )
}

export default Guildpad