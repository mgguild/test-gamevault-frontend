import React from 'react'
import { Grid } from '@mui/material'
import { Flex, Heading, Text } from '@metagg/mgg-uikit'
import { IGuildpad } from 'config/constants/types'
import PageSection from '../Layout'
import Card from '../../components/Card'
import { BoxContainer, BoxHeader } from '../styled'



const CardGroup: React.FC<{guildpads?: IGuildpad[] | null}> = ({guildpads}) => {
    return guildpads.length !==0 ? (
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
            {
                guildpads.map(guildpad => (
                <Grid item xs='auto' md={5}>
                <Card key={guildpad.address} /> 
                </Grid>
                ))
            }
        </Grid>
    ) : <Text>No Active Guildpads ...</Text>
}

const Active: React.FC<{guildpads?: IGuildpad[] | null}> = ({guildpads}) => {
    return (
        <PageSection direction='column'> 
            <BoxHeader><Heading size="l"> ONGOING LAUNCHES</Heading></BoxHeader>
            <BoxContainer>
                <CardGroup guildpads={guildpads} />
            </BoxContainer>
        </PageSection>
    )
}

export default Active