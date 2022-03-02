import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import { getBalanceAmount } from 'utils/formatBalance'
import styled, { ThemeContext } from 'styled-components'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE }  from 'config/constants/types'
import { SaleContainer, SaleRow, PostBody, NavOption } from './styled'

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

  const guildpadPrice = () => {
    let price = 'TBA'

    if(guildpad.type === TYPE.INO){
      price = guildpad.boxInfo[rarity].price !== '0' ? guildpad.boxInfo[rarity].price : guildpad.inoDetails.price
      price = price !== 'TBA' ? `${price} ${guildpad.buyingCoin.symbol}` : price
    }
    if(guildpad.type === TYPE.IGO){
      price = guildpad.igoDetails.price
    }
    return(price)
  }

  const renderSale = () => {
    // const price = guildpad.boxInfo[rarity].price !== '0' ? guildpad.boxInfo[rarity].price : guildpad.inoDetails.price
    // const ratio = guildpad.inoDetails.ratio && guildpad.inoDetails.ratio
    // const boxes = guildpad.inoDetails.boxes ?? 'TBA'
    const start = guildpad.date.start ?? 'TBA'
    const end = guildpad.date.end ?? 'TBA'
    const distribution = guildpad.distribution
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'
    const inoPrice = guildpad.inoDetails ? guildpad.inoDetails.priceFiat : 'TBA'

    const asOfPriceTime = guildpad.asOfPriceInProjectToken ? moment(guildpad.asOfPriceInProjectToken).format('MMM DD, YYYY h A') : null

    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <div style={{textAlign: 'right'}}>
              <Text>
                {guildpadPrice()}
                {guildpad.projectTokenEquivalent && `(${guildpad.projectTokenEquivalent})`}
              </Text>
              { asOfPriceTime &&
                <Text fontSize='12px'>
                  (<em>as of {asOfPriceTime} UTC</em>)
                </Text> }
            </div>
          </SaleRow>
          {/* {ratio && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Ratio</Text>
              <Text>{guildpad.inoDetails.ratio}</Text>
            </SaleRow>
          )} */}
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
              <Text>{guildpad.boxInfo[rarity].supply}</Text>
            </SaleRow>
          )}
          {guildpad.type === TYPE.IGO &&
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Buying Coin</Text>
              <Text>{guildpad.buyingCoin.symbol}</Text>
            </SaleRow>
          }
          { guildpad.type === TYPE.IGO && guildpad.igoDetails.fundsTarget &&
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Funds to be raised</Text>
              <Text>{guildpad.igoDetails.fundsTarget}</Text>
            </SaleRow>
          }
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">{guildpad.type === TYPE.INO ? 'NFT' : 'Token'} Distribution</Text>
            <div style={{textAlign: 'right'}}>
              <Text>{distribution}</Text>
              { guildpad.distributionDesc &&
                <Text fontSize='12px'>
                  (<em>{guildpad.distributionDesc}</em>)
                </Text>
              }
            </div>
          </SaleRow>
          {guildpad.type === TYPE.INO &&
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">INO Price</Text>
              <Text>{inoPrice}</Text>
            </SaleRow>
          }
          {/* <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Boxes Sold</Text>
            <Text>{guildpad.boxInfo[rarity].supply} / {guildpad.boxInfo[rarity].sold}</Text>
          </SaleRow> */}
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
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%'}}
      >
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Description
        </NavOption>
        <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
          {guildpad.type === TYPE.INO? 'NFT' : 'Token'} Sale
        </NavOption>
      </Flex>
      {active === 1 ? renderDescription() : active === 2 && renderSale()}
    </PostBody>
  )
}

export default Content