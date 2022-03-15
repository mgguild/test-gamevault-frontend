import React, { useContext } from 'react'
import Countdown, { calcTimeDelta} from 'react-countdown'
import 'css/styleFX.css'
import { Text, Flex, Heading, } from '@metagg/mgg-uikit'
import styled, { ThemeContext } from 'styled-components'
import { GUILDPAD_STATUS } from '../../config/constants/types'

type dateSettingsProps = {
    isStart?: any;
    end?: number
}

type TimerProps = {
    status?: string;
    Renderer: (days?:number, hours?: number, minutes?:number, seconds?: number) => JSX.Element;
    dateSettings?: dateSettingsProps;
}

const Timer: React.FC<TimerProps> = ({status, Renderer, dateSettings}) => {
    const { isStart, end } = dateSettings
    const theme = useContext(ThemeContext)
    return (
        <Countdown
        date={end}
        onStop={() => {
            <Text>Upcoming</Text>
        }}
        renderer={({ days, hours, minutes, seconds, completed, api}) => {
          if (completed || status === GUILDPAD_STATUS.completed) {
            return (
              <>
                <div style={{position: 'relative'}}>
                  <Flex style={{
                    margin: '1rem 0rem',
                    padding: '1rem',
                    justifyContent: 'center'
                  }}
                  >
                    <Heading className='puff-in-center' size='xl' textTransform='uppercase' style={{whiteSpace: 'nowrap', letterSpacing: ' 0.2rem'}}>
                      「 Round Ended 」
                    </Heading>
                  </Flex>
                </div>
              </>
            )
          }
          if (isStart  && status !== GUILDPAD_STATUS.completed) {
              return Renderer(days,hours,minutes,seconds)
          }
          return ''
        }}
      />
    )
}

export default Timer;
