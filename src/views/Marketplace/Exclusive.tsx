import { Heading, Text, Flex, Button } from '@metagg/mgg-uikit'
import { ArrowRight } from 'react-feather'
import NftAlbumImg from 'assets/marketplace/0.png'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import React from 'react'
import { Carousel1Data } from 'config/constants/Marketplace'
import Images from './fetchImage'
import { BgPage, BgSection, TextWrap } from './styled'
import AppCarousel from './components/Carousel'
import { Car1breakpoints } from './config'

const ExclusiveSection: React.FC = () => {
  const { theme } = useTheme()

  const NftAlbum = () => <img alt="nft-album" src={NftAlbumImg} style={{ width: '400px' }} />
  const NftImage = ({ title, description, image }: { title: string; description: string; image: string }) => {
    return (
      <NftImg src={image}>
        <TextWrap textAlign="center">
          <Text fontSize="1.5em">{title}</Text>
          <Text fontSize="0.9em">{description}</Text>
        </TextWrap>
      </NftImg>
    )
  }
  const Carousel1 = () => {
    const renderItems = () => {
      return Carousel1Data.map((data) => {
        const icn = Images[data.image]
        return <NftImage key={data.title} title={data.title} description={data.description} image={icn} />
      })
    }
    return (
      <Flex flexDirection="column" style={{ overflow: 'hidden' }}>
        <TextWrap textAlign="left" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text fontSize="2em">Lorem Ipsum Dolor</Text>
          <Button variant="secondary" style={{ border: 'none', color: theme.colors.MGG_accent2 }}>
            View all <ArrowRight />
          </Button>
        </TextWrap>
        <div style={{ marginTop: '3rem' }}>
          <AppCarousel components={[renderItems]} breakpoints={Car1breakpoints} />
        </div>
      </Flex>
    )
  }

  return (
    <BgSection
      justify="start"
      bgColor={theme.isDark ? '#140937' : theme.colors.MGG_container}
      padding="0"
      height="auto"
    >
      <BgPage>
        <div style={{ position: 'relative', zIndex: 2, margin: '10rem 0' }}>
          <TextWrap>
            <Heading size="xl" color={theme.colors.primary} style={{ textAlign: 'center' }}>
              Exclusive on MGG
            </Heading>
          </TextWrap>
          <NftAlbumWrapper margin="2em 0" flexWrap="wrap">
            <NftBox>
              {NftAlbum()}
              <InfoBox>
                <TextWrap>
                  <Text fontSize="1.25em" color={theme.colors.MGG_accent2}>
                    Lorem Ipsum
                  </Text>
                  <Text fontSize="0.7em">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe est accusantium, magnam, pariatur
                    laudantium itaque.
                  </Text>
                </TextWrap>
              </InfoBox>
            </NftBox>
            <NftBox>
              {NftAlbum()}
              <InfoBox>
                <TextWrap>
                  <Text fontSize="1.25em" color={theme.colors.MGG_accent2}>
                    Lorem Ipsum
                  </Text>
                  <Text fontSize="0.7em">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe est accusantium, magnam, pariatur
                    laudantium itaque.
                  </Text>
                </TextWrap>
              </InfoBox>
            </NftBox>
            <NftBox>
              {NftAlbum()}
              <InfoBox>
                <TextWrap>
                  <Text fontSize="1.25em" color={theme.colors.MGG_accent2}>
                    Lorem Ipsum
                  </Text>
                  <Text fontSize="0.7em">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe est accusantium, magnam, pariatur
                    laudantium itaque.
                  </Text>
                </TextWrap>
              </InfoBox>
            </NftBox>
          </NftAlbumWrapper>
          {Carousel1()}
        </div>
      </BgPage>
    </BgSection>
  )
}

export default ExclusiveSection

const NftImg = styled.div<{ src?: string }>`
  display: flex;
  align-items: flex-end;
  border-radius: 12px;
  justify-content: center;
  padding: 12px;
  width: 300px;
  height: 300px;
  position: relative;
  text-align: center;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    background-image: url(${(props) => props.src});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`

const NftAlbumWrapper = styled(Flex)`
  flex-direction: column;
  ${(props) => props.theme.mediaQueries.lg} {
    flex-direction: row;
  }
`

const NftBox = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 1;
  position: relative;
  min-height: 350px;
  opacity: 0.5;
  ${(props) => props.theme.mediaQueries.xl} {
    min-height: 415px;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
    & > div {
      transform: scale(1.2);
    }
  }
`

const InfoBox = styled.div`
  border: 1px inset ${(props) => props.theme.colors.MGG_accent2};
  min-height: 150px;
  padding: 15px;
  width: 50%;
  position: absolute;
  bottom: 0;
  background-color: #0c012c;
  transition: transform 0.2s;
  ${(props) => props.theme.mediaQueries.xl} {
    padding: 24px;
  }
`
