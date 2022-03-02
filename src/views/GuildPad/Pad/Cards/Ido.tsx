import React, { useState } from 'react';
import styled from 'styled-components';
import { Guildpad } from 'state/types';
import { Flex, Text } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material';
import { ContainerBoxCard, MarketCard } from './styled';

const IdoCard:React.FC<{ guildpad: Guildpad, userDataLoaded: boolean }> = ({guildpad, userDataLoaded}) => {
    const details = guildpad.description

    return (
        <ContainerBoxCard >
            <Grid container spacing={2}>
                <Grid item xs={4} md={6}>
                    {details}
                </Grid>
                <Grid item md={6}>
                    <MarketCard>
                        test
                    </MarketCard>
                </Grid>
            </Grid>
        </ContainerBoxCard>
    )
}

export default IdoCard;