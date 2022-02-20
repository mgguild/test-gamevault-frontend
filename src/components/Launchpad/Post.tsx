import React, { useContext, useState, useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import { getBalanceAmount } from 'utils/formatBalance'
import styled, { ThemeContext } from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE }  from 'config/constants/types'
import { useFetchImage } from 'utils/assetFetch'
import useMedia from 'use-media'
import { Header, SaleContainer, SaleRow, PostBody, PostContainer, PostHeader, TokenProperty, Details, NavOption, PadTitles, PadActions } from './styled'
import TokenLogo from './Logo'

const Content: React.FC<{guildpad: GuildpadConfig, rarity?: string }>= ({guildpad, rarity = '1'}) => {
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
    const price = guildpad.boxInfo[rarity].price !== '0' ? guildpad.boxInfo[rarity].price : 'TBA'
    const ratio = guildpad.inoDetails.ratio && guildpad.inoDetails.ratio
    const boxes = guildpad.inoDetails.boxes ?? 'TBA'
    const start = guildpad.date.start ?? 'TBA'
    const end = guildpad.date.end ?? 'TBA'
    const distribution = guildpad.distribution
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'

    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <div style={{textAlign: 'right'}}>
              <Text>{price !== 'TBA' ? `${price} ${guildpad.buyingCoin.symbol} (1425 WBOND)` : price}</Text>
              { price !== 'TBA' && <Text fontSize='12px'>(<em>as of Feb 18, 2022 8PM GMT+8</em>)</Text> }
            </div>
          </SaleRow>
          {ratio && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Ratio</Text>
              <Text>{guildpad.inoDetails.ratio}</Text>
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
          {guildpad.type === TYPE.INO && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Boxes for Sale</Text>
              <Text>{boxes}</Text>
            </SaleRow>
          )}
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">{guildpad.type === TYPE.INO ? 'NFT' : 'TOKEN'} Distribution</Text>
            <Text>{distribution}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Boxes Sold</Text>
            <Text>{guildpad.boxInfo[rarity].supply} / {guildpad.boxInfo[rarity].sold}</Text>
          </SaleRow>
          {guildpad.type === TYPE.IDO && (
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
  const [rarityId, setRarityId] = useState('1')
  const [toggle, setToggle] = React.useState(false)
  const sites = guildpad.socials
  const isMobile = useMedia({ maxWidth: 500 })

  const { buyingCoin, sellingCoin, description, type } = guildpad
  const pair = `${buyingCoin.symbol}/${sellingCoin.symbol}`
  const guildSymbol = sellingCoin.symbol
  const srcs = useFetchImage(sellingCoin.symbol);
  const totalRaiseInBnb = getBalanceAmount(new BigNumber(guildpad.totalRaise), 18).toString();
  const hasRemainingSupply = (guildpad.boxInfo[rarityId].supply - guildpad.boxInfo[rarityId].sold) > 0

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
        <div style={{display: 'grid', gridRowGap: '0.4rem'}}>
          {!hasRemainingSupply && guildpad.status === GUILDPAD_STATUS.completed &&
            <TokenProperty style={{backgroundColor: '#29b213'}}>
              <Text bold>SOLD OUT</Text>
            </TokenProperty>
          }
        </div>
        <TokenProperty>
            <Text>{type}</Text>
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
