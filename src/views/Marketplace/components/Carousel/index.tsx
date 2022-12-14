import React from 'react'
import styled from 'styled-components'
import { ArrowRight, ArrowLeft } from 'react-feather'
import { Heading, Flex, Button } from '@metagg/mgg-uikit'
import Carousel from 'react-elastic-carousel'
import { BreakPointsConfig } from '../../config'

const AppCarousel: React.FC<{ children: React.ReactNode; breakpoints?: BreakPointsConfig[] }> = ({
  children,
  breakpoints,
}) => {
  const CustomArrows = ({ type, onClick, isEdge }) => {
    const pointer = type !== 'PREV' ? <ArrowRight width="3rem" /> : <ArrowLeft />
    return (
      <ArrowButtons onClick={onClick} disabled={isEdge}>
        <Heading size="xxl"> {pointer}</Heading>
      </ArrowButtons>
    )
  }
  return (
    <StyledCarousel
      isRTL={false}
      renderArrow={CustomArrows}
      breakPoints={breakpoints}
      showEmptySlots
      easing="cubic-bezier(1,.15,.55,1.54)"
      tiltEasing="cubic-bezier(0.110, 1, 1.000, 0.210)"
      transitionMs={700}
    >
      {children}
    </StyledCarousel>
  )
}

export default AppCarousel

const StyledCarousel = styled(Carousel)`
  & .rec-pagination {
    & > * {
      border: 1px solid ${(props) => props.theme.colors.primary};
      &:hover {
        background-color: ${(props) => props.theme.colors.primary};
      }
      &.rec-dot_active {
        background-color: ${(props) => props.theme.colors.primary};
        border: 1px solid black;
        box-shadow: none;
      }
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`
const CarouselItem = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const PaginationComponent = styled(Button)<{ active?: boolean }>`
  width: 15px !important;
  height: 15px;
  border-radius: 50%;
  ${(props) =>
    props.active &&
    `
    background-color: ${props.theme.colors.primary};
  `}
`

const ArrowButtons = styled.button`
  background-color: transparent;
  border: none;
  & > ${Heading} {
    color: ${(props) => props.theme.colors.primary};
  }
  & :hover {
    background-color: transprent;
    color: white;
  }
`
