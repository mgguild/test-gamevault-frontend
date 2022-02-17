import React from 'react'
import Countdown, { calcTimeDelta} from 'react-countdown'
import { Text } from '@metagg/mgg-uikit'

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
            return <Text>Round Ended</Text>
          }
          return ''
        }}
      />
    )
}

export default Timer;