import React from 'react'
import useTheme from 'hooks/useTheme'
import { Text, Flex } from '@metagg/mgg-uikit'
import styled from 'styled-components'
import GrowthBg from 'assets/background/GrowthBG.png'
import Button from './components/Button'
import InfoSection from './InfoSection'
import { BgSection, TextWrap } from './styled'
import ExclusiveSection from './Exclusive'


const Marketplace: React.FC = () => {
  const { theme } = useTheme();
  return (
    <>
    <BgSection src={GrowthBg} bgColor={theme.isDark? '#140937' : theme.colors.MGG_container}>
      <TextWrap style={{ textAlign: 'center' }}>
        <Text fontSize="3rem" bold>
          Lorem. Ipsum. Dolor.
        </Text>
        <Text fontSize="1.5rem">Sit Amet adipiscing</Text>
        <ButtonWrapper flexDirection="column" alignItems="center" style={{ margin: '3rem 0' }}>
          <Button bg="#00f4fd" shadow>BROWSER NFTS</Button>
          <Button bg="#fdda00" shadow>CREATE NFTS</Button>
        </ButtonWrapper>
      </TextWrap>
    </BgSection>
    <InfoSection />
    <ExclusiveSection />
    </>
  )
}

export default Marketplace

const ButtonWrapper = styled(Flex)`
  & > * {
    margin: 0.8rem 0;
  }
`
