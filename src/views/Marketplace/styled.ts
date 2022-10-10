/* eslint-disable import/prefer-default-export */

import styled from 'styled-components'
import GridGradient from 'assets/background/gridwgradient.png'
import GridGradientFlipped from 'assets/background/gridwgradientFlipped.png'

const padding = '24px';

export const Section = styled.section<{ direction?: string; bgColor?: string; justify?: string; align?: string}>`
  min-height: calc(90vh - 64px);
  display: flex;
  padding: ${padding};
  width: 100%;
  align-items: ${props => props.align};
  justify-content: ${props => props.justify ?? 'center'};
  flex-direction: ${(props) => props.direction ?? 'column'};
  background-color: ${(props) => props.bgColor};
`

export const TextWrap = styled.div`
  font-size: 12px;
  ${(props) => props.theme.mediaQueries.lg} {
    font-size: 16px;
  }
`

export const BgSection = styled(Section)<{ src?: string }>`
  background-image: ${(props) => `url(${props.src})`};
  background-repeat: no-repeat;
  background-position: center;
  backround-size: contain;

`

export const BgPage = styled.div`
  padding: 5rem;
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  background-image: url(${GridGradient});
  background-repeat: no-repeat;
  background-position: center top;
  background-size: contain;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-image: url(${GridGradientFlipped});
    background-repeat: no-repeat;
    background-position: center bottom;
    background-size: contain;
  }

  @media screen and (max-width: 500px) {
    padding: 0.5rem;
  }
`
