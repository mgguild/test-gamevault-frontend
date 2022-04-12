import styled, { ThemeContext } from 'styled-components'
import { animated } from 'react-spring'

export const Bar = styled.div`
  position: relative;
  width: 100%;
  height: 1.5rem;
  justifycontent: center;
  align-items: center;
`

export const Fill = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #cc830280;
`
export const Gauge = styled(animated.div)<{ hide? }>`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  flex: 1;
  visibility: ${({ hide }) => (hide === 'true' ? 'hidden' : 'visible')};
  text-align: center;
  justify-content: center;
`
export const GaugeR = styled.div`
  clip-path: polygon(0 0, 100% 0%, 50% 100%, 0% 100%);
  position: absolute;
  width: 1rem;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  right: -8px;
`
export const GaugeL = styled.div`
  clip-path: polygon(50% 0, 100% 0%, 100% 100%, 0 100%);
  position: absolute;
  width: 1rem;
  height: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.MGG_accent1};
  left: -8px;
`
export const AnimText = styled(animated.div)<{ color?: string; size?: string }>`
  color: ${({ theme, color }) => color ?? theme.colors.text};
  font-size: ${({ size }) => size ?? '1rem'};
  font-weight: 400;
  line-height: 1.5;
  z-index: 3;
`
