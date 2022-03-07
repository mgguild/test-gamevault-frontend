import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import { useWeb3React } from '@web3-react/core'
import { Button, useWalletModal, Text, Flex } from '@metagg/mgg-uikit'
import useAuth from 'hooks/useAuth'
import BigNumber from 'bignumber.js'
import { getBalanceAmount } from 'utils/formatBalance'
import styled, { ThemeContext } from 'styled-components'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE } from 'config/constants/types'
import { SaleContainer, SaleRow, PostBody, NavOption } from './styled'

const Content: React.FC<{ guildpad: GuildpadConfig; rarity?: string }> = ({ guildpad, rarity = '1' }) => {
  const theme = useContext(ThemeContext)
  const [active, setActive] = useState(1)
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
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

    if (guildpad.type === TYPE.INO) {
      price = guildpad.boxInfo[rarity].price !== '0' ? guildpad.boxInfo[rarity].price : guildpad.inoDetails.price
      price = price !== 'TBA' ? `${price} ${guildpad.buyingCoin.symbol}` : price
    }
    if (guildpad.type === TYPE.IDO) {
      price = guildpad.igoDetails.price ?? 'TBA'
    }
    return price
  }

  const renderSale = () => {
    const start = guildpad.date.start ?? 'TBA'
    const distribution = guildpad.distribution
    const initMarketCap = 'TBA'
    const initTokenCirc = 'TBA'
    const inoPrice = guildpad.inoDetails ? guildpad.inoDetails.priceFiat : 'TBA'
    const asOfPriceTime = guildpad.asOfPriceInProjectToken
      ? moment(guildpad.asOfPriceInProjectToken).utc().format('MMM DD, YYYY h A')
      : null
    const end = guildpad.epochEndDate ? `${moment(guildpad.epochEndDate).utc().format('LLL')} UTC` : 'TBA'

    return guildpad.type === TYPE.INO ? (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <div style={{ textAlign: 'right' }}>
              <Text>
                {guildpadPrice()}
                {guildpadPrice() !== 'TBA' && guildpad.projectTokenEquivalent && `(${guildpad.projectTokenEquivalent})`}
              </Text>
              {asOfPriceTime && (
                <Text fontSize="12px">
                  (<em>as of {asOfPriceTime} UTC</em>)
                </Text>
              )}
            </div>
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
          {guildpad.type === TYPE.INO && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Boxes for Sale</Text>
              <Text>{guildpad.totalSupply}</Text>
            </SaleRow>
          )}
          {guildpad.type === TYPE.IGO && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Buying Coin</Text>
              <Text>{guildpad.buyingCoin.symbol}</Text>
            </SaleRow>
          )}
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Token Distribution</Text>
            <div style={{ textAlign: 'right' }}>
              <Text>{distribution}</Text>
              {guildpad.distributionDesc && (
                <Text fontSize="12px">
                  (<em>{guildpad.distributionDesc}</em>)
                </Text>
              )}
            </div>
          </SaleRow>
          {guildpad.type === TYPE.INO && inoPrice && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">INO Price</Text>
              <Text>{inoPrice}</Text>
            </SaleRow>
          )}
          {guildpad.type === TYPE.INO && (
            <SaleRow justifyContent="space-between">
              <Text color="textSubtle">Boxes Sold</Text>
              <Text>
                {guildpad.totalSold} / {guildpad.totalSupply}
              </Text>
            </SaleRow>
          )}
        </Flex>
      </SaleContainer>
    ) : (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Token Name</Text>
            <Text>{guildpad.title}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Ticker</Text>
            <Text>{guildpad.sellingCoin.symbol}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Price</Text>
            <div style={{ textAlign: 'right' }}>
              <Text>
                {guildpadPrice()}
                {guildpadPrice() !== 'TBA' && guildpad.projectTokenEquivalent && `(${guildpad.projectTokenEquivalent})`}
              </Text>
              {asOfPriceTime && (
                <Text fontSize="12px">
                  (<em>as of {asOfPriceTime} UTC</em>)
                </Text>
              )}
            </div>
          </SaleRow>
        </Flex>
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Buying Coin</Text>
            <Text>{guildpad.buyingCoin.symbol}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Funds to be Raised</Text>
            <Text>{guildpad.FundstoRaise ?? 'TBA'}</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Token Distribution</Text>
            <Text>{guildpad.distribution}</Text>
          </SaleRow>
        </Flex>
      </SaleContainer>
    )
  }

  const renderSchedule = () => {
    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale Start Time</Text>
            <Text>TBA</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Sale End Time</Text>
            <Text>TBA</Text>
          </SaleRow>
        </Flex>
      </SaleContainer>
    )
  }

  const renderAllocation = () => {
    return (
      <SaleContainer justifyContent="space-between">
        <Flex flexDirection="column">
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Wallet Address:</Text>
            <Text
              color={theme.colors.primary}
              onClick={!account && onPresentConnectModal}
              style={{ cursor: !account && 'pointer' }}
            >
              {account ?? 'Please connect wallet.'}
            </Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Allocation</Text>
            <Text>TBA</Text>
          </SaleRow>
          <SaleRow justifyContent="space-between">
            <Text color="textSubtle">Distribution Mode</Text>
            <Text>{guildpad.distribution}</Text>
          </SaleRow>
        </Flex>
      </SaleContainer>
    )
  }

  const renderTabs = (tab) => {
    switch (tab) {
      case 1:
        return renderSale()
      case 2:
        return renderSchedule()
      case 3:
        return renderAllocation()
      default:
        return (
          <Flex>
            <Text margin="0px auto">Coming Soon</Text>
          </Flex>
        )
    }
  }

  return (
    <PostBody>
      {guildpad.type === TYPE.INO ? (
        <>
          <Flex
            alignItems="center"
            margin="10px 0px 20px 0px"
            style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
          >
            <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
              Description
            </NavOption>
            <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
              NFT Sale
            </NavOption>
          </Flex>
          {active === 1 ? renderDescription() : active === 2 && renderSale()}
        </>
      ) : (
        <>
          <Flex
            alignItems="center"
            margin="10px 0px 20px 0px"
            style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
          >
            <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
              Token Sale
            </NavOption>
            <NavOption onClick={() => setActive(2)} activeIndex={active === 2}>
              Schedule
            </NavOption>
            <NavOption onClick={() => setActive(3)} activeIndex={active === 3}>
              Allocation
            </NavOption>
          </Flex>
          {renderTabs(active)}
        </>
      )}
    </PostBody>
  )
}

export default Content
