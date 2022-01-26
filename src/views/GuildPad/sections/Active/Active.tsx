import React from 'react'
import { Heading, Text } from '@metagg/mgg-uikit'
import PageSection from '../Layout'
import Card from '../../components/Card'
import { BoxContainer, BoxHeader } from '../styled'

const Active: React.FC = () => {
    return (
        <PageSection direction='column'> 
            <BoxHeader><Heading size="l"> ONGOING LAUNCHES</Heading></BoxHeader>
            <BoxContainer>
                <Card />
            </BoxContainer>
        </PageSection>
    )
}

export default Active