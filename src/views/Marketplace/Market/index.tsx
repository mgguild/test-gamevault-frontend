import React from 'react'
import { Grid } from '@mui/material'
import { NftData } from 'config/constants/Marketplace'
import Link from 'components/Link'
import useTheme from 'hooks/useTheme'
import { BgPage, Section } from '../styled'
import Filters from '../components/Filters'
import NftCard from '../components/NFT/card'



// Temp details 


const RenderNftCards = () => {
  return NftData.map((nft) => (
    <Grid key={nft.name} item>
      <Link href={`/marketplace/nft-market/${nft.id}`}>
        <NftCard {...nft} />
      </Link>
    </Grid>
  ))
}

const MarketPage: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <div style={{ margin: '10rem 0', position: 'relative', zIndex: 2, minHeight: '100vh' }}>
          <Filters>
            <Grid container>
            {RenderNftCards()}
            </Grid>
          </Filters>
        </div>
      </BgPage>
    </Section>
  )
}

export default MarketPage
