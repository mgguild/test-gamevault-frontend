import { Heading } from '@metagg/mgg-uikit';
import useTheme from 'hooks/useTheme';
import React from 'react'
import Card from './components/Card';
import { Section } from './styled';

const InfoSection:React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section bgColor='#00011c' justify='start' align='center'>
      <Heading size="xl" color={theme.colors.primary}>Create, buy , sell, swap, and farm NFTs</Heading>
      <div>
        <Card />
      </div>
    </Section>
  )
}

export default InfoSection;