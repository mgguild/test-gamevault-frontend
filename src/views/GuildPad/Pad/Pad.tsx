import React, { useContext } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router'
import { DEFAULT_META, getCustomMeta, getPadCustomMeta } from 'config/constants/meta'
import { PageMeta } from 'components/layout/Page'
import styled, { ThemeContext } from 'styled-components'
import { ChevronRight } from 'react-feather'
import { GUILDPAD_STATUS, TYPE } from 'config/constants/types'
import { Grid } from '@mui/material'
import { Breadcrumbs, Flex, Text } from '@metagg/mgg-uikit'
import { useGuildpadData, useGuildpads } from 'state/hooks'
import PageSection from '../sections/Layout'
import Footer from '../sections/Footer'
import Card from './Cards'
import { getGuildpadStatus } from '../../../utils/guildpadHelpers'

const Container = styled(Flex)`
  flex-direction: column;
  padding: 25px;
  width: 100%;
  margin: 0 auto;
  min-height: calc(80vh - 30px);
  background: ${({ theme }) =>
    theme.isDark ? `linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%)` : theme.colors.modal};
`

const GuildpadContainer = styled(Flex)`
  margin: 25px;
`

const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`

const Pad: React.FC<RouteComponentProps<{ guildpadTitle?: string }>> = ({
  match: {
    params: { guildpadTitle },
  },
}) => {
  const theme = useContext(ThemeContext)
  const { data: guildpads, userDataLoaded } = useGuildpads()
  useGuildpadData()
  const activeGuildpad = guildpads.filter((gpad) => gpad.title === guildpadTitle)[0]
  const { title } = activeGuildpad
  const status = getGuildpadStatus(activeGuildpad)

  return (
    <>
      <PageMeta guildpadTitle={guildpadTitle} />
      <Container>
        <PageSection direction="column">
          <GuildpadContainer>
            <Breadcrumbs separator={<ChevronRight color={theme.colors.MGG_accent2} />}>
              <Link to="/launchpad">
                <Text>MetaGaming Guild</Text>
              </Link>
              <Text>{status.toUpperCase()}</Text>
              <Text>{title}</Text>
            </Breadcrumbs>
          </GuildpadContainer>
          <Grid container justifyContent="center" alignItems="center">
            <Card guildpad={activeGuildpad} userDataLoaded={userDataLoaded} />
          </Grid>
        </PageSection>
      </Container>
      <Footer />
    </>
  )
}

export default Pad
