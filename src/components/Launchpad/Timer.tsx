import React, { useContext } from 'react'
import Countdown, { calcTimeDelta} from 'react-countdown'
import 'css/styleFX.css'
import { Text, Flex, Heading, } from '@metagg/mgg-uikit'
import styled, { ThemeContext } from 'styled-components'

type dateSettingsProps = {
    isStart?: any;
    end?: number
}

type TimerProps = {
    Renderer: (days?:number, hours?: number, minutes?:number, seconds?: number) => JSX.Element;
    dateSettings?: dateSettingsProps;
}

const Timer: React.FC<TimerProps> = ({Renderer, dateSettings}) => {
    const { isStart, end } = dateSettings
    const theme = useContext(ThemeContext)
    return (
        <Countdown
        date={end}
        onStop={() => {
            <Text>Upcoming</Text>
        }}
        renderer={({ days, hours, minutes, seconds, completed, api}) => {
            if (isStart) {
                return Renderer(days,hours,minutes,seconds)
            }
          if (completed) {
            return (
              <>
                <div style={{position: 'relative'}}>
                  <Flex style={{
                    backgroundColor: theme.colors.MGG_container,
                    margin: '1rem 0rem',
                    padding: '1rem',
                    justifyContent: 'center'
                  }}
                    className='crt inset-shadow'
                  >
                    <Heading className='puff-in-center' size='lg' textTransform='uppercase' style={{whiteSpace: 'nowrap', letterSpacing: ' 0.2rem'}}>
                      「 Round Ended 」
                    </Heading>
                  </Flex>
                </div>
              </>
            )
          }
          return ''
        }}
      />
    )
}

export default Timer;