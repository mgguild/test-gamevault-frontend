import React from 'react'
import { Flex, Heading, Text } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import Timer from '../../views/GuildPad/components/Timer'

const TimerContainer = styled(Flex)`
  z-index: 1;
  //background-color: rgba(41, 178, 19, 1);
`

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

const CountDown: React.FC<{ round: string, start?:boolean, end?:number}> = ({round, start, end}) => {
  const endDate = end
  const isStart = start;

  const Renderer = (days?: number, hours?: number, minutes?: number, seconds?: number) => {
    return(
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

  return (
    <TimerContainer justifyContent="right" padding={isStart? '10px':'0px'}>
      { isStart ? (
        <Timer
          dateSettings={{ isStart, end: endDate }}
          Renderer={Renderer}
        />
      ) : (
        <Heading className='glow' size='xl' color='white' textTransform='uppercase' style={{whiteSpace: 'nowrap', letterSpacing: ' 0.2rem'}}>
          「 Round Ended 」
        </Heading>
      )}
    </TimerContainer>
  )
}


export default CountDown;
