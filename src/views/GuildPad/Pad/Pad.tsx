import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import styled from 'styled-components'
import { STATE } from 'config/constants/types'
import { ChevronLeft } from 'react-feather';
import { Heading, Flex, Text, Breadcrumbs, Button } from '@metagg/mgg-uikit';
import { useGuildpads, useSetGuildpad } from 'state/hooks';
import Page from 'components/layout/Page';
import Footer from '../sections/Footer';

const Container = styled(Flex)`
    flex-direction: column;
    padding: 25px;
    width: 100%;
    margin: 0 auto;
    min-height: calc(80vh - 30px);
    background: ${({ theme }) => theme.isDark? `linear-gradient(0deg, rgba(43,28,0,1) 5%, rgba(16,16,16,1) 100%)` : theme.colors.modal};
`

const GuildpadContainer = styled(Flex)`
    margin: 25px;
`

const BackButton = styled(Link)`
    display: flex;
    align-items: center;
    color: ${({theme}) => theme.colors.text};
`

const Pad: React.FC <RouteComponentProps<{guildpadId?: string}>> = ({match: {params: {guildpadId}}}) => {
    const data = useSetGuildpad(guildpadId);
    const { selected: guildpad } = useGuildpads();
    const { title } = guildpad
    const status = guildpad.status === STATE.active? 'ONGOING' : 'COMPLETED'

    return (    
        <>
            <Container>
                <GuildpadContainer>
                <Breadcrumbs>
                    <Link to="/launchpad">
                    <Text>MetaGaming Guild</Text>
                    </Link>
                    <Text>{status}</Text>
                    <Text>{title}</Text>
                </Breadcrumbs>
                </GuildpadContainer>
            </Container>
            <Footer />
        </>
    )
}

export default Pad;