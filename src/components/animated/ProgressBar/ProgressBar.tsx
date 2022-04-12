import React, { useState, useEffect } from 'react'
import { useSpringRef, useSpring, useChain, useTransition } from 'react-spring'
import { Flex, Text } from '@metagg/mgg-uikit'
import { Bar, Fill, Gauge, GaugeR, GaugeL, AnimText } from './styles'

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const [points, setPoints] = useState([20, 40, 60, 80, 100])

  const apiMergeGauges = useSpringRef()
  const { marginRight } = useSpring({
    ref: apiMergeGauges,
    from: {
      marginRight: '0.8rem',
    },
    to: {
      marginRight: '0rem',
    },
  })

  const apiOpacities = useSpringRef()
  const { opacity1, opacity2, translateY } = useSpring({
    ref: apiOpacities,
    from: {
      opacity1: 1,
      opacity2: 0,
      translateY: '0rem',
    },
    to: {
      opacity1: 0,
      opacity2: 1,
      translateY: '-1rem',
    },
  })

  const apiGauges = useSpringRef()
  const props = useSpring({
    ref: apiGauges,
    from: {
      width: '0%',
      height: 0,
    },
    to: {
      width: `${progress}%`,
      height: progress,
    },
    config: {
      duration: 1500,
    },
    onRest: () => {
      if (progress >= 100) {
        setTimeout(() => {
          apiMergeGauges.start()

          setTimeout(function () {
            apiOpacities.start()
          }, 400)
        }, 850)
      }
    },
  })

  const apiPoints = useSpringRef()
  const gauges = useTransition(points, {
    ref: apiPoints,
    trail: 1500 / points.length,
    from: { opacity: 0, scale: 2, marginRight: '0.8rem', filter: 'blur(4px)' },
    enter: { opacity: 1, scale: 1, marginRight: '0.8rem', filter: 'blur(0px)' },
    leave: {},
    config: { duration: 500 },
  })
  useChain([apiGauges, apiPoints], [0, 0.5])

  return (
    <>
      <Bar>
        <Fill style={{ width: props.width }} />
        <Flex style={{ flexFlow: 'row', rowGap: '1rem', padding: '0.2rem' }}>
          {gauges((style, gauge) => (
            <Gauge style={{ ...style, marginRight: gauge !== 100 ? marginRight : '0' }} hide={`${progress < gauge}`}>
              <AnimText color="black" size="12px" style={{ opacity: opacity1, zIndex: 3, translateY }}>
                {gauge}%
              </AnimText>
              {gauge === 20 && <GaugeR />}
              {gauge > 20 && gauge < 100 && (
                <>
                  <GaugeL />
                  <GaugeR />
                </>
              )}
              {gauge === 100 && <GaugeL />}
            </Gauge>
          ))}
        </Flex>
        <Flex
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AnimText color="black" size="12px" style={{ opacity: opacity2, fontWeight: 1000 }}>
            SOLD OUT
          </AnimText>
        </Flex>
      </Bar>
    </>
  )
}

export default ProgressBar
