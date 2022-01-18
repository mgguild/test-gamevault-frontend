import React from 'react';
import { Card, Heading, Text } from '@metagg/mgg-uikit';
import styled from 'styled-components';


const Container = styled(Card)`
    width: 100%;
    background-color: ${(({theme}) => theme.colors.MGG_container)};
`

const Form: React.FC = () => {
    return (
        <Container>
            <Heading>MGG to be Staked</Heading>
            
        </Container>
    )
}

export default Form;