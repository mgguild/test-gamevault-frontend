import React, { useContext, useState } from 'react'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'
import { GuildpadConfig, TYPE }  from 'config/constants/types'
import useMedia from 'use-media'
import { Header, SaleContainer, SaleRow, PostBody, PostContainer, PostHeader, TokenProperty, Details, NavOption, PadTitles, PadActions } from './styled'
import TokenLogo from './Logo'

const Content: React.FC<{guildpad: GuildpadConfig; }>= ({guildpad}) => {
  const theme = useContext(ThemeContext)
  const [active, setActive] = useState(1)

  const renderDescription = () => {
   const description = guildpad.description !== '' ? guildpad.description : 'No description'

    return (
      <Text color="textSubtle" margin="10px 0px" style={{ lineHeight: '2em' }}>
        {description}
      </Text>
    )
  }

  const renderSale = () => {
    const price = `${guildpad.type === TYPE.INO ? guildpad.inoDetails.price : guildpad.idoDetails.price}`
    const ratio = guildpad.inoDetails.ratio && guildpad.inoDetails.ratio
    const start = guildpad.date ?? 'TBA'
    const end = 'TBA'
    const distribution = guildpad.distribution
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'

    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <Text>
              {price !== 'TBA'? `${price} ${guildpad.buyingCoin.symbol}` : price}
            </Text>
          </SaleRow>
          {ratio && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Ratio</Text>
              <Text>
                {guildpad.inoDetails.ratio}
              </Text>
            </SaleRow>
          )}
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Start Time</Text>
            <Text>{start}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale End Time</Text>
            <Text>{end}</Text>
          </SaleRow>
        </Flex>
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">{guildpad.type === TYPE.INO? 'NFT' : 'TOKEN'} Distribution</Text>
            <Text>{distribution}</Text>
          </SaleRow>
          { guildpad.type === TYPE.IDO && (
            <>
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Initial Market Cap</Text>
              <Text>{initMarketCap}</Text>
            </SaleRow>
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Initial Token Circulation</Text>
              <Text>{initTokenCirc}</Text>
            </SaleRow>
            </>
          )}
        </Flex>
      </SaleContainer>
    )
  }

  return (
    <PostBody>
      <Flex
        alignItems="center"
        margin="10px 0px 20px 0px"
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
      >
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Description
        </NavOption>
        <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
          {guildpad.type === TYPE.INO? 'NFT' : 'TOKEN'} Sale
        </NavOption>
      </Flex>
      {active === 1 ? renderDescription() : active === 2 && renderSale()}
    </PostBody>
  )
}

const Post: React.FC<{guildpad?: GuildpadConfig}> = ({guildpad}) => {
  const [toggle, setToggle] = React.useState(false)
  const sites = guildpad.socials
  const isMobile = useMedia({ maxWidth: 500 })

  const { buyingCoin, sellingCoin, description, type } = guildpad
  const pair = `${buyingCoin.symbol}/${sellingCoin.symbol}`
  const guildSymbol = sellingCoin.symbol
  const srcs = `/images/guildpad-assets/${sellingCoin.symbol}.png`

  return (
    <PostContainer>
      <PostHeader background={srcs}>
        <PadTitles
          alignItems="center"
          style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
        >
          <TokenLogo
           tokenName={guildpad.title}
           nameSize='xl'
           primaryToken={sellingCoin}
           padding="0px"
           socMeds={sites}
           socMedsSize={22}
          />
          {/* <TokenProperty>
            <Text bold>{pair}</Text>
          </TokenProperty>
          <TokenProperty>
            <Text bold>{guildSymbol}</Text>
          </TokenProperty> */}
        </PadTitles>
        <PadActions>
        <TokenProperty>
            <Text bold>{type}</Text>
          </TokenProperty>
        <Details onClick={() => setToggle(!toggle)}>
          Details &nbsp; {toggle ? <ChevronUp /> : <ChevronDown />}
        </Details>
        </PadActions>
      </PostHeader>
      {toggle && <Content guildpad={guildpad}  />}
    </PostContainer>
  )
}

export default Post
