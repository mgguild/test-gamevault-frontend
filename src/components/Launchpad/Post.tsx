import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
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
import Content from './Content'

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