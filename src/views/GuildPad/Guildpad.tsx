import React from 'react'
import { Text } from '@metagg/mgg-uikit'
import Page from 'components/layout/Page'
import { ActiveSection, HomeSection } from './sections';

const Guildpad: React.FC = () => {
    return (
        <>
            <HomeSection />
            <Page>
                <ActiveSection />
            </Page>
        </>
    )
}

export default Guildpad