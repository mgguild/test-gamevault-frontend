import React, { useContext, useState } from 'react'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'
import { IGuildpad } from 'config/constants/types'
import useMedia from 'use-media'
import { Header, SaleContainer, SaleRow, PostBody, PostContainer, PostHeader, TokenProperty, Details, NavOption } from './styled'
import TokenLogo from './Logo'

const Content: React.FC<{details: string}>= ({details}) => {
  const theme = useContext(ThemeContext)
  const [active, setActive] = useState(1)

  const renderDescription = () => {
   const description = details !== '' ? details : 'No description'

    return (
      <Text color="textSubtle" margin="10px 0px" style={{ lineHeight: '2em' }}>
        {description}
      </Text>
    )
  }

  const renderSale = () => {
    const price = 'TBA'
    const start = 'TBA'
    const end = 'TBA'
    const distribution = 'TBA'
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'

    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <Text>{price}</Text>
          </SaleRow>
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
            <Text color="textSubtle">Token Distribution</Text>
            <Text>{distribution}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Initial Market Cap</Text>
            <Text>{initMarketCap}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Initial Token Circulation</Text>
            <Text>{initTokenCirc}</Text>
          </SaleRow>
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
          Token Sale
        </NavOption>
      </Flex>
      {active === 1 ? renderDescription() : active === 2 && renderSale()}
    </PostBody>
  )
}

const Post: React.FC<{guildpad?: IGuildpad}> = ({guildpad}) => {
  const [toggle, setToggle] = React.useState(false)
  const sites = guildpad.socials
  const isMobile = useMedia({ maxWidth: 500 })
 
  const { buyingCoin, sellingCoin, description, type } = guildpad
  const pair = `${buyingCoin.symbol}/${sellingCoin.symbol}`
  const guildSymbol = sellingCoin.symbol
  const srcs = `/images/guildpad-assets/${sellingCoin.symbol}/${sellingCoin.symbol}.png`

  return (
    <PostContainer>
      <PostHeader background={srcs}>
        <Flex
          alignItems="center"
          style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
        >
          <TokenLogo tokenName={guildpad.title} primaryToken={sellingCoin} padding="0px" socMeds={sites} />
          <TokenProperty>
            <Text bold>{pair}</Text>
          </TokenProperty>
          <TokenProperty>
            <Text bold>{guildSymbol}</Text>
          </TokenProperty>
        </Flex>
        <Flex alignItems="center">
        <TokenProperty>
            <Text bold>{type}</Text>
          </TokenProperty>
        <Details onClick={() => setToggle(!toggle)}>
          Details &nbsp; {toggle ? <ChevronUp /> : <ChevronDown />}
        </Details>
        </Flex>
      </PostHeader>
      {toggle && <Content details={description}  />}
    </PostContainer>
  )
}

export default Post
