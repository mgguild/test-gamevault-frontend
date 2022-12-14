import { Heading } from '@metagg/mgg-uikit';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import React from 'react'
import { Grid } from '@mui/material';
import Card from './components/Card';
import { Section } from './styled';
import { IconName } from './components/Feathers';

const temp: {icn: IconName, title: string, desc: string}[] = [
  {
    icn: 'ShoppingCart',
    title: 'Create',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate possimus sequi itaque, repudiandae cum voluptas corrupti eveniet ex! Odio ipsum delectus blanditiis nisi.'
  }, 
  {
    icn: 'HardDrive',
    title: 'Trade',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate possimus sequi itaque, repudiandae cum voluptas corrupti eveniet ex! Odio ipsum delectus blanditiis nisi impedit nihil consequatur.'
  },
  {
    icn: 'Repeat',
    title: 'Swap',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate possimus sequi itaque, repudiandae cum voluptas corrupti eveniet ex! Odio ipsum delectus blanditiis nisi impedit nihil consequatur.'
  },
  {
    icn: 'Home',
    title: 'Farm',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur cupiditate possimus sequi itaque, repudiandae cum voluptas corrupti eveniet ex! Odio ipsum delectus blanditiis nisi impedit nihil consequatur.'
  }
]

const InfoSection:React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section bgColor={theme.isDark ? '#00011c': theme.colors.MGG_mainBG}  padding='3rem' height='60vh' justify='space-evenly'>
      <Heading size="xl" color={theme.colors.primary} style={{textAlign: 'center'}}>Create, buy , sell, swap, and farm NFTs</Heading>
      <div style={{marginTop: '2rem'}}>
      <Grid container justifyContent='center' spacing={{sm: 2}}>
        {
          temp.map((x) => {
            return (
              <Grid item xs={12} sm={5} md={5} lg={3}>
                <Card title={x.title} description={x.desc} icn={x.icn} />
              </Grid>
            )
          })
        }
      </Grid>
      </div>
    </Section>
  )
}

export default InfoSection;

const CardGroup = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  // flex-wrap: wrap;
  ${props => props.theme.mediaQueries.sm} {
    flex-direction: row;
  }
`