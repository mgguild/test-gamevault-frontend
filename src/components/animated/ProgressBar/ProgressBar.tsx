import React, { useState, useEffect } from 'react'
import { Spring, useSpringRef, useSpring, animated, SpringRef  } from 'react-spring'
import styled, { ThemeContext } from 'styled-components'
import { Flex, Heading, Text, Button } from '@metagg/mgg-uikit'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 1rem;
`
const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 1.5rem;
  justifyContent: center;
  align-items: center;
`

const Fill = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #CC830280;
`
const Gauge = styled(animated.div)<{hide?: boolean}>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  flex: 1;
  // margin-right: 0.8rem;
  visibility: ${({hide}) => (hide ? 'visible' : 'hidden')};
  text-align: center;
  justify-content: center;
`
const GaugeR = styled.div`
  clip-path: polygon(0 0, 100% 0%, 50% 100%, 0% 100%);
  position: absolute;
  width: 1rem;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  right: -8px;
`
const GaugeL = styled.div`
  clip-path: polygon(50% 0, 100% 0%, 100% 100%, 0 100%);
  position: absolute;
  width: 1rem;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  left: -8px;
`

const ProgressBar:React.FC<{progress: number}> = ({progress}) => {
  const [soldOut, setSoldOut] = useState(false)
  const [gauges, setGauges] = useState([false, false, false, false , false])
  const [mergeGauges, apiMGauges] = useSpring(() => ({
    from:{
      margin: '0 0.8rem 0 0',
    },
    to:{
      margin: '0 0 0 0',
    }
  }))

  const [props, apiGauges] = useSpring(() => ({
    from:{
      width: '0%',
      height: 0
    },
    to: {
      width: `${progress}%`,
      height: progress
    },
    config:{
      duration: 1500
    },
    onChange:(styles) => {
      const temp = [...gauges]
      if(styles.value.height > 20){
        temp[0] = true
        setGauges(temp)
      }
      if(styles.value.height > 40){
        temp[1] = true
        setGauges(temp)
      }
      if(styles.value.height > 60){
        temp[2] = true
        setGauges(temp)
      }
      if(styles.value.height > 80){
        temp[3] = true
        setGauges(temp)
      }
      if(styles.value.height >= 100){
        temp[4] = true
        setGauges(temp)
      }
    },
    onRest:() => {
      if(progress >= 100){
        setTimeout(()=>{
          apiMGauges.start()
        }, 1200)
        console.log('bruh start')
      }
    }
  }))
  
  apiGauges.start()

  return(
    <>
      <Bar>
        <Fill style={{width: props.width}} />
        <Flex style={{flexFlow: 'row', rowGap: '1rem', padding: '0.2rem'}}>
            <Gauge style={mergeGauges} className={gauges[0] ? 'puff-in-center' : ''} hide={gauges[0]}>
              <Text fontSize="12px" color='black' style={{zIndex: 3}}>20%</Text>
              <GaugeR />
            </Gauge>
            <Gauge style={mergeGauges} className={gauges[1] ? 'puff-in-center' : ''} hide={gauges[1]}>
              <Text fontSize="12px" color='black' style={{zIndex: 3}}>40%</Text>
              <GaugeL />
              <GaugeR />
            </Gauge>
            <Gauge style={mergeGauges} className={gauges[2] ? 'puff-in-center' : ''} hide={gauges[2]}>
              <Text fontSize="12px" color='black' style={{zIndex: 3}}>60%</Text>
              <GaugeL />
              <GaugeR />
            </Gauge>
            <Gauge style={mergeGauges} className={gauges[3] ? 'puff-in-center' : ''} hide={gauges[3]}>
              <Text fontSize="12px" color='black' style={{zIndex: 3}}>80%</Text>
              <GaugeL />
              <GaugeR />
            </Gauge>
            <Gauge className={gauges[4] ? 'puff-in-glow' : ''} hide={gauges[4]} style={{margin: 0}}>
              <Text fontSize="12px" color='black' style={{zIndex: 3}}>SOLD OUT</Text>
              <GaugeL />
            </Gauge>
          </Flex>
      </Bar>
    </>
  )
}

export default ProgressBar