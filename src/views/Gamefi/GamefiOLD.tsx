import BigNumber from 'bignumber.js';
import React from 'react'
import { Flex, Heading, Text, Button } from '@metagg/mgg-uikit'
import Page from 'components/layout/Page'
import Form from './components/Form';
import { DetailsContainer, MainContainer } from './components/styled'


type DetailsProps = {
    apr: string;
    mggRewards: string;
}

const Details: React.FC<DetailsProps> = ({apr, mggRewards}) => {
    return (
        <DetailsContainer flexDirection='column' justifyContent='flex-start'>
            <Flex flexDirection='column'>
                <Text color='textSubtle' fontSize='24px'>ESTIMATED APR</Text>
                <Heading size="xxl">{apr}</Heading>
            </Flex>
            <Flex flexDirection='column'>
                <Text color='textSubtle'>ESTIMATED TOTAL MGG REWARDS</Text>
                <Heading size="xxl">{mggRewards}</Heading>
            </Flex>
            <Button style={{borderRadius: '5px'}}> BUY on SparkSwap </Button>
        </DetailsContainer>
    )
}

const Gamefi: React.FC = () => {
    const zero = new BigNumber(0)
    return (
        <Page>
            <MainContainer justifyContent='space-evenly' >
                <Details apr='10%' mggRewards='10 MGG' />
                <Form max={zero}/>
            </MainContainer>
        </Page>
    )
}

export default Gamefi;