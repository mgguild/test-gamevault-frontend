import React from 'react'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import { BgPage, Section } from '../styled'
import Filters from '../components/Filters'

const MarketPage: React.FC = () => {
  const { theme } = useTheme()
  return (
    <Section padding="0" bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}>
      <BgPage>
        <div style={{ margin: '10rem 0', position: 'relative', zIndex: 2, minHeight: '100vh' }}>
          <Filters />
        </div>
      </BgPage>
    </Section>
  )
}

export default MarketPage
