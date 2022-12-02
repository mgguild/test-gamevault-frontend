import { Button, Flex, IconButton, Text } from '@metagg/mgg-uikit'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useMedia } from 'use-media'
import useTheme from 'hooks/useTheme'
import { ChevronDown, RotateCw } from 'react-feather'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Input from '../Input'
import Checkbox from '../Checkbox'
import Container, { FilterContainer, FilterMenu, FilterCard, FilterSection, Main } from './styled'
import SearchField from '../Input/SearchField'
import SelectComponent from '../Select'
import { BlockChain, Status1, Status2 } from './config'

const Filters = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useTheme()
  const [boxValue, setBoxValue] = useState({})
  const [rangeValue, setRangeValue] = useState({ min: 0, max: 100, value: 0 })
  const mobileS = useMedia({ maxWidth: 375 })
  const [searchFilter, setSearchFilter] = useState<string>('')
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value)
  }
  const handleClear = () => {
    setBoxValue({})
  }
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoxValue({ ...boxValue, [e.target.name]: e.target.checked })
  }

  const handleRangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue({ ...rangeValue, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <FilterContainer>
        <FilterMenu>
          <Text fontSize="1.75em" bold>
            FILTERS
          </Text>
          <Button onClick={() => handleClear()} style={{ border: 'none' }} variant="secondary">
            Clear All
          </Button>
        </FilterMenu>
        <FilterCard>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `1px solid ${theme.colors.MGG_accent2}`,
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="1.75em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                STATUS
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <Checkbox items={Status1} handleCheck={handleCheck} boxValue={boxValue} />
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `1px solid ${theme.colors.MGG_accent2}`,
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="1.75em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                PRICE
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <Flex justifyContent="space-between">
                <div style={{ width: '45%' }}>
                  <Input
                    handleChange={handleRangeInput}
                    name="min"
                    defaultValue={rangeValue.min}
                    min={rangeValue.min}
                  />
                </div>
                <div style={{ width: '45%' }}>
                  <Input
                    handleChange={handleRangeInput}
                    name="max"
                    defaultValue={rangeValue.max}
                    max={rangeValue.max}
                  />
                </div>
              </Flex>
              <Input
                name="value"
                handleChange={handleRangeInput}
                inputType="range"
                min={rangeValue.min}
                max={rangeValue.max}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `1px solid ${theme.colors.MGG_accent2}`,
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="1.75em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                COLLECTION
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ marginBottom: '1rem' }}>
                <SearchField handleChange={handleSearch} placeHolder='Search'/>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="1.75em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                STATUS
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <Checkbox
                items={Status2}
                handleCheck={handleCheck}
                boxValue={boxValue}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="1.75em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                BLOCKCHAINS
              </Text>
            </AccordionSummary>
            <AccordionDetails>
            <Checkbox
                items={BlockChain}
                handleCheck={handleCheck}
                boxValue={boxValue}
              />
            </AccordionDetails>
          </Accordion>
        </FilterCard>
      </FilterContainer>
      <Main>
        <Flex flexDirection="column" flexWrap="wrap">
          <Grid container marginBottom='2rem'>
            <Grid container item spacing={2} justifyContent='flex-end'>
              <Grid item alignItems="center">
                {!mobileS && (
                  <Text fontSize="1.75em" bold>
                    Sort by
                  </Text>
                )}
              </Grid>
              <Grid item>
                <SelectComponent />
              </Grid>
              <Grid item>
                <IconButton style={{ borderRadius: '50px' }}>
                  <RotateCw color="black" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
          {children}
        </Flex>
      </Main>
    </Container>
  )
}

export default Filters

Filters.defaultProps = {
  children: '',
}
