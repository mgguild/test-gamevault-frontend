import { Heading } from '@metagg/mgg-uikit';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import React from 'react'
import Card from './components/Card';
import { Section } from './styled';

const InfoSection:React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section bgColor={theme.isDark ? '#00011c': theme.colors.MGG_mainBG} justify='center' align='center' padding='20px'>
      <Heading size="xl" color={theme.colors.primary} style={{textAlign: 'center'}}>Create, buy , sell, swap, and farm NFTs</Heading>
      <CardGroup>
        <Card />
        <Card />
        <Card />
        <Card />
      </CardGroup>
    </Section>
  )
}

export default InfoSection;

const CardGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  ${props => props.theme.mediaQueries.sm} {
    flex-direction: row;
  }
`