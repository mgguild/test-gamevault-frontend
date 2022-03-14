import React from 'react'
import styled from 'styled-components'
import { Heading, Flex, Text } from '@metagg/mgg-uikit'

const TimerBox = styled(Flex)`
  display: grid;
  position: relative;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr;
  align-items: center;
  text-align: center;
  & > * {
    flex: 1;
    margin-right: 0px;
  }
`

const TimerContainer = styled(Flex)`
  z-index: 1;
  //background-color: rgba(41, 178, 19, 1);
`

const Box = styled.div`
  height: 100%;
  min-width: 100px;
`
const HOrbitron = styled(Heading)`
  display: flex;
  justify-content: center;
  text-align: center;
  font-family: Orbitron !important;
  line-height: 0.7em;
  color: grey;
`
const TimeSpan = styled.div`
  margin: 1rem 0 1.5rem 0;
`

interface TimerRendererProps {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    round: string;
}

const TimerRenderer = ({days, hours, minutes, seconds, round}: TimerRendererProps) => {
    return (
        <div>
        <Heading color='white' style={{textAlign: 'center', paddingTop: '0.5rem'}} size="l">ROUND {round} ENDS IN</Heading>
        <TimerContainer>
        <TimerBox>
            <Box>
              <TimeSpan>
                <HOrbitron size="xl" className='glow'>{days}</HOrbitron>
              </TimeSpan>
              <Text color='white' fontSize="1rem"> DAYS </Text>
            </Box>
            <Box>
              <TimeSpan>
                <HOrbitron size="xl" className='glow'>{hours}</HOrbitron>
              </TimeSpan>
              <Text color='white' fontSize="1rem"> HOURS </Text>
            </Box>
            <Box>
              <TimeSpan>
                <HOrbitron size="xl" className='glow'>{minutes}</HOrbitron>
              </TimeSpan>
              <Text color='white' fontSize="1rem"> MINUTES</Text>
            </Box>
            <Box>
              <TimeSpan>
                <HOrbitron size="xl" className='glow'>{seconds}</HOrbitron>
              </TimeSpan>
              <Text color='white' fontSize="1rem"> SECONDS</Text>
            </Box>
          </TimerBox>
        </TimerContainer>
        </div>
    )
}

export default TimerRenderer;
