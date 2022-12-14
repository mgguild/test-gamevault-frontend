import { Heading, Text, Flex, Button } from '@metagg/mgg-uikit'
import { ArrowLeftCircle, ArrowRight, ArrowRightCircle } from 'react-feather'
import NftAlbumImg from 'assets/marketplace/0.png'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import { Carousel1Data } from 'config/constants/Marketplace'
import Images from './fetchImage'
import { BgPage, BgSection, CarouselCardContainer, TextWrap } from './styled'
import AppCarousel from './components/Carousel'
import { Car1breakpoints, Car2breakpoints, Car3breakpoints } from './config'

const ExclusiveSection: React.FC = () => {
  const { theme } = useTheme()

  const NftAlbum = () => <img alt="nft-album" src={NftAlbumImg} style={{ width: '400px' }} />
  const NftImage = ({
    title,
    description,
    image,
    size,
  }: {
    title: string
    description: string
    image: string
    size?: string
  }) => {
    return (
      <NftImg src={image} size={size}>
        <TextWrap textAlign="center">
          <Text fontSize="1.5em" color="#fff">
            {title}
          </Text>
          <Text fontSize="0.9em" color="#fff">
            {description}
          </Text>
        </TextWrap>
      </NftImg>
    )
  }
  NftImage.defaultProps = {
    size: '',
  }

  const Carousel1 = () => {
    const [showAll, setShowAll] = useState<boolean>(false)
    const renderItems = () => {
      return Carousel1Data.map((data, ind) => {
        const key = ind + 1
        const icn = Images[data.image]
        return <NftImage key={key} title={data.title} description={data.description} image={icn} size="200px" />
      })
    }
    return (
      <Flex flexDirection="column" style={{ overflow: 'hidden' }}>
        <TextWrap textAlign="left" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text fontSize="1.5em">Lorem Ipsum Dolor</Text>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="secondary"
            style={{ border: 'none', color: theme.colors.MGG_accent2 }}
          >
            {!showAll ? (
              <>
                {' '}
                View all &nbsp; <ArrowRightCircle />{' '}
              </>
            ) : (
              <>
                <ArrowLeftCircle /> &nbsp; Back
              </>
            )}
          </Button>
        </TextWrap>
        <div style={{ marginTop: '3rem' }}>
          {!showAll ? (
            <AppCarousel breakpoints={Car1breakpoints}>{renderItems()}</AppCarousel>
          ) : (
            <CarouselCardContainer>{renderItems()}</CarouselCardContainer>
          )}
        </div>
      </Flex>
    )
  }
  const Carousel2 = () => {
    const [showAll, setShowAll] = useState<boolean>(false)
    const renderItems = () => {
      return Carousel1Data.map((data, ind) => {
        const key = ind + 1
        const icn = Images[data.image]
        return <NftImage key={key} title={data.title} description={data.description} image={icn} size="150px" />
      })
    }
    return (
      <Flex flexDirection="column" style={{ overflow: 'hidden' }}>
        <TextWrap textAlign="left" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text fontSize="1.5em">Lorem Ipsum Dolor</Text>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="secondary"
            style={{ border: 'none', color: theme.colors.MGG_accent2 }}
          >
            {!showAll ? (
              <>
                {' '}
                View all &nbsp; <ArrowRightCircle />{' '}
              </>
            ) : (
              <>
                <ArrowLeftCircle /> &nbsp; Back
              </>
            )}
          </Button>
        </TextWrap>
        <div style={{ marginTop: '3rem' }}>
          {!showAll ? (
            <AppCarousel breakpoints={Car2breakpoints}>{renderItems()}</AppCarousel>
          ) : (
            <Flex flexWrap="wrap" justifyContent="space-between" alignItems="space-between">
              {renderItems()}
            </Flex>
          )}
        </div>
      </Flex>
    )
  }
  const Carousel3 = () => {
    const [showAll, setShowAll] = useState<boolean>(false)
    const renderItems = () => {
      return Carousel1Data.map((data, ind) => {
        const key = ind + 1
        const icn = Images[data.image]
        return <NftImage key={key} title={data.title} description={data.description} image={icn} size="150px" />
      })
    }
    return (
      <Flex flexDirection="column" style={{ overflow: 'hidden' }}>
        <TextWrap textAlign="left" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text fontSize="1.5em">Lorem Ipsum Dolor</Text>
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="secondary"
            style={{ border: 'none', color: theme.colors.MGG_accent2 }}
          >
            {!showAll ? (
              <>
                {' '}
                View all &nbsp; <ArrowRightCircle />{' '}
              </>
            ) : (
              <>
                <ArrowLeftCircle /> &nbsp; Back
              </>
            )}
          </Button>
        </TextWrap>
        <div style={{ marginTop: '3rem' }}>
          {!showAll ? (
            <AppCarousel breakpoints={Car3breakpoints}>{renderItems()}</AppCarousel>
          ) : (
            <Flex flexWrap="wrap" justifyContent="space-between" alignItems="space-between">
              {renderItems()}
            </Flex>
          )}
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
                  <Text fontSize="0.7em" color="#fff">
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
                  <Text fontSize="0.7em" color="#fff">
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
                  <Text fontSize="0.7em" color="#fff">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe est accusantium, magnam, pariatur
                    laudantium itaque.
                  </Text>
                </TextWrap>
              </InfoBox>
            </NftBox>
          </NftAlbumWrapper>
          {Carousel1()}
          {Carousel2()}
          {Carousel3()}
        </div>
      </BgPage>
    </BgSection>
  )
}

export default ExclusiveSection

const NftImg = styled.div<{ src?: string; size?: string }>`
  display: flex;
  align-items: flex-end;
  border-radius: 15px;
  justify-content: center;
  padding: 12px;
  margin: 2rem 0;
  ${(props) => `
    width: ${props.size ?? '250px'};
    height: ${props.size ?? '250px'};
  `}
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
  &:hover {
    &:before {
      opacity: 1;
    }
  }
  @media screen and (min-width: 768px) {
    ${(props) => `
      width: calc(${props.size} + 100px);
      height: calc(${props.size} + 100px);
  `}
  }
  @media screen and (min-width: 2560px) {
    ${(props) => `
      width: calc(${props.size} + 200px);
      height: calc(${props.size} + 200px);
  `}
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
