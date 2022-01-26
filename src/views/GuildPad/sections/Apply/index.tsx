import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Text, Button, Flex } from '@metagg/mgg-uikit'
import ApplyIcon from 'assets/Apply/Mail_icon.svg'
import ProjectIcon from 'assets/Apply/Project_icon.svg'
import StyledContainer, { StyledHeading } from './styled'

const Actions = styled.div`
  width: 100%;
  max-width: 700px;
  display: flex;
  justify-content: space-around;
  padding: 15px;
  column-gap: 30px;
  @media (max-width: 500px) {
    flex-direction: column;
    row-gap: 10px;
  }
`

const Section: React.FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <StyledContainer>
      <StyledHeading size="lg" as="h2">
        Got a Project?
      </StyledHeading>
      <Text>Apply for an IDO on SparkLaunch, submit your project and get a response within 24 hours.</Text>
      <Actions>
        <Button as="a" href="https://forms.gle/hXZPr93vC8TEmsoh8" fullWidth style={{ borderRadius: '6px', backgroundColor: theme.colors.MGG_active }}>
          Apply Now
        </Button>
        <Button
          as="a"
          href="mailto: support@sparkpoint.io"
          fullWidth
          style={{ backgroundColor: theme.colors.MGG_accent2, borderRadius: '6px' }}
        >
          Contact Us
        </Button>
      </Actions>
    </StyledContainer>
  )
}

export default Section
