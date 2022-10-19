import { Button, Flex, Text } from '@metagg/mgg-uikit'
import React, { useState } from 'react'
import useTheme from 'hooks/useTheme'
import { ChevronDown } from 'react-feather'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Input from '../Input'
import Checkbox from '../Checkbox'
import Container, { FilterContainer, FilterMenu, FilterCard, FilterSection, Main } from './styled'

const Filters = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useTheme()

  const [ boxValue, setBoxValue] = useState({})

  const handleCheck = (e) => {
    setBoxValue({...boxValue, [e.target.name] : e.target.checked });
  }

  console.log(boxValue)
  return (
    <Container>
      <FilterContainer>
        <FilterMenu>
          <Text fontSize="2em" bold>
            FILTERS
          </Text>
          <Button style={{ border: 'none' }} variant="secondary">
            Clear All
          </Button>
        </FilterMenu>
        <FilterCard>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `2px solid ${theme.colors.MGG_accent2}`,
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="2.5em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                STATUS
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <Checkbox items={['On Sale', 'Verified']} handleCheck={handleCheck}/>
            </AccordionDetails>
          </Accordion>
          <Accordion
            defaultExpanded
            sx={{
              backgroundColor: 'transparent',
              borderBottom: `2px solid ${theme.colors.MGG_accent2}`,
              boxShadow: 'none',
            }}
          >
            <AccordionSummary expandIcon={<ChevronDown size="2.5em" color={theme.colors.MGG_accent2} />}>
              <Text fontSize="1.5em" bold>
                PRICE
              </Text>
            </AccordionSummary>
            <AccordionDetails>
              <Flex justifyContent='space-between'>
                <div style={{ width: '45%' }}>
                  <Input />
                </div>
                <div style={{ width: '45%' }}>
                  <Input />
                </div>
              </Flex>
            </AccordionDetails>
          </Accordion>
        </FilterCard>
      </FilterContainer>
      <Main>{children}</Main>
    </Container>
  )
}

export default Filters

Filters.defaultProps = {
  children: '',
}
