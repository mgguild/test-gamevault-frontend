import React, { useState } from 'react';
import { Guildpad } from 'state/types';
import { Flex, Text } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material';

const IdoCard:React.FC<{ guildpad: Guildpad, userDataLoaded: boolean }> = ({guildpad, userDataLoaded}) => {
    const details = guildpad.description

    return (
        <Grid>
            <Flex>
                {details}
            </Flex>
        </Grid>
    )
}

export default IdoCard;