import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Grid } from '@mui/material'
import { Flex, Heading, Text } from '@metagg/mgg-uikit'
import { IGuildpad } from 'config/constants/types'
import PageSection from '../Layout'
import Card from '../../components/Card'
import { BoxContainer, BoxHeader } from '../styled'
import NoLaunches from '../../components/NoLaunches'



const CardGroup: React.FC<{guildpads?: IGuildpad[]}> = ({guildpads}) => {
    return guildpads.length !==0 ? (
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
            {
                guildpads.map(guildpad => (
                <Grid item xs='auto' md={5}>
                <Card key={guildpad.address} guildpad={guildpad}/> 
                </Grid>
                ))
            }
        </Grid>
    ) : <NoLaunches section="ONGOING" />
}

const Active: React.FC<{guildpads?: IGuildpad[]}> = ({guildpads}) => {
    const theme = useContext(ThemeContext);
    return (
        <PageSection direction='column' id="active"> 
            <BoxHeader><Heading size="l"> ONGOING LAUNCHES</Heading></BoxHeader>
            <BoxContainer borderColor={theme.colors.primary}>
                <CardGroup guildpads={guildpads} />
            </BoxContainer>
        </PageSection>
    )
}

export default Active