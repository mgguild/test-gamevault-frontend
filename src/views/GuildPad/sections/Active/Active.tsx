import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'

import { Grid } from '@mui/material'
import { Flex, Heading, Text } from '@metagg/mgg-uikit'
import { GuildpadConfig } from 'config/constants/types'
import PageSection from '../Layout'
import Card from '../../components/Card'
import { BoxContainer, BoxHeader } from '../styled'
import NoLaunches from '../../components/NoLaunches'
import { getAddress } from '../../../../utils/addressHelpers'



const CardGroup: React.FC<{guildpads?: GuildpadConfig[]}> = ({guildpads}) => {
    return guildpads.length !==0 ? (
        <Grid container spacing={2} justifyContent='center' alignItems='center'>
            {
                guildpads.map(guildpad => (
                <Grid key={getAddress(guildpad.contractAddress)} item xs='auto' md={5}>
                <Card guildpad={guildpad}/>
                </Grid>
                ))
            }
        </Grid>
    ) : <NoLaunches section="ONGOING" />
}

const Active: React.FC<{ guildpads?: GuildpadConfig[] }> = ({ guildpads }) => {
  const theme = useContext(ThemeContext)
  return (

      <PageSection direction="column">
        <BoxHeader>
          <Heading size="l"> ONGOING LAUNCHES</Heading>
        </BoxHeader>
        <BoxContainer borderColor={theme.colors.primary}>
          <CardGroup guildpads={guildpads} />
        </BoxContainer>
      </PageSection>
  )
}

export default Active
