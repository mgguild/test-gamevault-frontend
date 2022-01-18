import React from 'react'
import { Flex, Heading, Text, Button } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import Form from './Form';
import { DetailsContainer } from './styled'

type DetailsProps = {
    apr: string;
    mggRewards: string;
}

const Details: React.FC<DetailsProps> = ({apr, mggRewards}) => {
    return (
        <DetailsContainer flexDirection='column' justifyContent='center'>
            <Flex flexDirection='column'>
                <Text color='textSubtle' fontSize='24px'>ESTIMATED APR</Text>
                <Heading size="xxl">{apr}</Heading>
            </Flex>
            <Flex flexDirection='column'>
                <Text color='textSubtle'>ESTIMATED TOTAL MGG REWARDS</Text>
                <Heading size="xxl">{mggRewards}</Heading>
            </Flex>
            <Button> BUY on SparkSwap </Button>
        </DetailsContainer>
    )
}

const Gamefi: React.FC = () => {
    return (
        <Page>
            <Flex style={{border: '1px solid red'}} justifyContent='space-betwee'>
                <Details apr='10%' mggRewards='10 MGG' />
                <Form />
            </Flex>
        </Page>
    )
}

export default Gamefi;