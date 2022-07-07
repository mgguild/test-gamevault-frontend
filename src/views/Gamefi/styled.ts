import styled from 'styled-components'
import { Button, Flex } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material'

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ButtonA = styled(Button)`
  width: 10rem;
`
export const ButtonB = styled(Button)<{ isGrid: boolean }>`
  padding: 1rem;
  background-color: ${({ isGrid, theme }) => (isGrid ? theme.colors.MGG_active : theme.colors.MGG_container)};
`
export const FilterItem = styled(Flex)`
  align-items: center;
  text-align: center;
  flex-flow: row;
  column-gap: 0.5rem;
`

export const Section = styled(Flex)`
  flex-flow: row-wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const HeaderSection = styled(Section)``
export const BodySection = styled(Section)`
  flex-direction: column;
  min-height: 35vh;
  // justifty-content: center;
`
export const StakeSection = styled(Flex)`
  width: 100%;
  align-items: center;
`

export const FilterButton = styled(Button)`
  background-color: ${({theme}) => theme.colors.MGG_active};
  border-radius: 5px;
  width: 200px;
`