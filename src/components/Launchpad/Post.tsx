import React, { useContext, useState, useEffect } from 'react'
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import { getBalanceAmount, toBigNumber } from 'utils/formatBalance'
import styled, { ThemeContext } from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE } from 'config/constants/types'
import { Guildpad } from 'state/types'
import { useFetchBanner } from 'utils/assetFetch'
import useMedia from 'use-media'
import {
  Header,
  SaleContainer,
  SaleRow,
  PostBody,
  PostContainer,
  PostHeader,
  TokenProperty,
  Details,
  NavOption,
  PadTitles,
  PadActions,
} from './styled'
import TokenLogo from './Logo'
import Content from './Content'

const DetailsM = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.MGG_mainBG};
`

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 425px) {
    flex-direction: column;
  }
`

const Post: React.FC<{ guildpad?: Guildpad }> = ({ guildpad }) => {
  const theme = useContext(ThemeContext)
  const [rarityId, setRarityId] = useState('1')
  const [toggle, setToggle] = React.useState(false)
  const sites = guildpad.socials
  const isMobile = useMedia({ maxWidth: 600 })
  const { buyingCoin, sellingCoin, description, type } = guildpad
  const srcs = useFetchBanner(sellingCoin.symbol)
  const hasRemainingSupply = new BigNumber(
    new BigNumber(guildpad.totalSupply).minus(new BigNumber(guildpad.totalSold)),
  ).isGreaterThan(0)
  const hasToClaimNow = toBigNumber(guildpad.userData.vesting.availableToClaim).gt(0)
  const USER_CLAIMABLE: 'USER_CLAIMABLE' | 'NOT_USER_CLAIMABLE' =
    guildpad.userData.vesting.hasClaimable || hasToClaimNow ? 'USER_CLAIMABLE' : 'NOT_USER_CLAIMABLE'
  return (
    <PostContainer style={{ position: 'relative', overflow: 'hidden' }}>
      <PostHeader background={srcs}>
        <Container style={{ margin: isMobile ? '0 0 2rem 0' : '0 0 0 0' }}>
          <PadTitles
            alignItems="center"
            style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
          >
            <TokenLogo
              tokenName={guildpad.title}
              nameSize="xl"
              primaryToken={sellingCoin}
              padding="0px"
              socMeds={sites}
              socMedsSize={22}
              color="white"
            />
            {/* <TokenProperty>
              <Text bold>{pair}</Text>
            </TokenProperty>
            <TokenProperty>
              <Text bold>{guildSymbol}</Text>
            </TokenProperty> */}
          </PadTitles>
          <PadActions>
            {guildpad.type !== TYPE.INO && guildpad.status === GUILDPAD_STATUS.completed && (
              <TokenProperty claimable={USER_CLAIMABLE}>
                <Text>Claimable</Text>
              </TokenProperty>
            )}
            <div style={{ display: 'grid', gridRowGap: '0.4rem' }}>
              {!hasRemainingSupply && guildpad.status === GUILDPAD_STATUS.completed && (
                <TokenProperty style={{ backgroundColor: '#29b213' }}>
                  <Text bold>SOLD OUT</Text>
                </TokenProperty>
              )}
            </div>
            <TokenProperty>
              <Text>{type === TYPE.IDO ? TYPE.IGO : TYPE.INO}</Text>
            </TokenProperty>
            {!isMobile && (
              <Details onClick={() => setToggle(!toggle)}>
                <Text bold>Details</Text> &nbsp;{' '}
                <Text style={{ display: 'flex', alignItems: 'center' }}>
                  {toggle ? <ChevronUp /> : <ChevronDown />}
                </Text>
              </Details>
            )}
          </PadActions>
        </Container>
        {isMobile && (
          <DetailsM onClick={() => setToggle(!toggle)}>
            <Text bold>Details</Text> &nbsp;{' '}
            <Text style={{ display: 'flex', alignItems: 'center' }}>{toggle ? <ChevronUp /> : <ChevronDown />}</Text>
          </DetailsM>
        )}
      </PostHeader>
      {toggle && <Content guildpad={guildpad} component="post" />}
    </PostContainer>
  )
}

export default Post
