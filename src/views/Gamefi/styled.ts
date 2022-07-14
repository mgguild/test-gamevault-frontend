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
  margin: 0.5rem 5px;
`

export const Section = styled(Flex)`
  flex-flow: row-wrap;
  justify-content: space-between;
  margin-bottom: 2rem;
`

export const HeaderSection = styled(Section)`
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0rem;
  }
`
export const BodySection = styled(Section)`
  flex-direction: column;
  min-height: 35vh;
`
export const StakeSection = styled(Flex)`
  width: 100%;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

export const FilterButton = styled(Button)`
  background-color: ${({ theme }) => theme.colors.MGG_mainBG};
  border-radius: 5px;
  width: 200px;
  border: 2px solid ${({ theme }) => theme.colors.MGG_active};
`

export const Layout = styled.div`
  padding: 0rem;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 3.5rem;
  }
`
