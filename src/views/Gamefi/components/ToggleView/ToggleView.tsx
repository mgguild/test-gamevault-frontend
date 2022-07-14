import React from 'react'
import styled from 'styled-components'
import { ListViewIcon, CardViewIcon, IconButton } from '@pancakeswap/uikit'

export enum ViewMode {
  'TABLE' = 'TABLE',
  'CARD' = 'CARD',
}

interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled.div`
  margin-right: 0px;
  margin-left: -8px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 0;
    margin-right: 16px;
  }
`

const StyledIconButton = styled(IconButton)<{ active?: boolean }>`
  border-radius: 5px;
  ${({ active, theme }) =>
    active &&
    `
  background-color: ${theme.colors.primary};
`}
`

const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }

  return (
    <Container>
      <StyledIconButton
        active={viewMode === ViewMode.CARD}
        variant="text"
        scale="sm"
        id="clickPoolCardView"
        onClick={() => handleToggle(ViewMode.CARD)}
      >
        <CardViewIcon color={viewMode === ViewMode.CARD ? 'white' : 'textDisabled'} />
      </StyledIconButton>
      <StyledIconButton
        active={viewMode === ViewMode.TABLE}
        variant="text"
        scale="sm"
        id="clickPoolTableView"
        onClick={() => handleToggle(ViewMode.TABLE)}
      >
        <ListViewIcon color={viewMode === ViewMode.TABLE ? 'white' : 'textDisabled'} />
      </StyledIconButton>
    </Container>
  )
}

export default ToggleView
