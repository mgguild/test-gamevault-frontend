import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import BigNumber from 'bignumber.js'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Container from 'components/layout/Container'
import { AboutColumn as Column, TwoColumn, TierColumns } from 'components/Column'
import { Socials, GuildpadConfig, GUILDPAD_STATUS, Token } from 'config/constants/types'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import Anchor from 'components/Launchpad/Anchor'
import SvgIcon from 'components/SvgIcon'
import { ReactComponent as BoxCrate } from 'assets/InoCrates/INO2.svg'
import { ReactComponent as MediumIcon } from 'components/Launchpad/icons/MediumIcon.svg'
import { Card as SCard, CardHeader as SCardHeader, Text, Heading, Flex, Button, Progress } from '@metagg/mgg-uikit'
import { getAddress } from 'utils/addressHelpers'
import TokenLogo from 'components/Launchpad/Logo'
import tokens from 'config/constants/tokens'
import { color } from '@mui/system'
import { getImageUrlFromToken } from 'utils/assetFetch'
import { Guildpad } from '../../../../state/types'
import UnlockButton from '../../../../components/UnlockButton'
import useTokenBalance from '../../../../hooks/useTokenBalance'
import { getBalanceAmount } from '../../../../utils/formatBalance'
import { useBuyBox } from '../../../../hooks/useGuildPad'
import { useGuildpadData } from '../../../../state/hooks'
import { fetchGuildpadUserDataAsync, fetchPublicGuildpadDataAsync } from '../../../../state/guildpads'
import { useAppDispatch } from '../../../../state'
import useWeb3 from '../../../../hooks/useWeb3'
import useEthBalance from '../../../../hooks/useEthBalance'

export interface ImgProps {
  src: string
  size?: string
}

const GCard = styled(SCard)`
 background: ${(({theme}) => theme.colors.MGG_container)};
 border: 2px solid ${(({theme}) => theme.colors.MGG_active)};
 border-radius: 5px;
 width: 25rem;
 margin: 0px auto;
 padding: 1rem;
`

const Cont = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`

const BoxImg = styled.img<{ size?: string }>`
  width: ${({ size }) => (!size ? '80px' : size)};
  padding: 0 0.5rem 0 0;
  z-index: 2;
  @media (max-width: 500px) {
    width: ${({ size }) => (!size ? '50px' : size)};
  }
`

// const DescReward = styled.textarea<{ color?: string}>`
//   font-size: 1rem;
//   width: 100%;
//   background: ${(({theme}) => theme.colors.MGG_container)};
//   color: ${({ color }) => (!color ? '#fffff' : color)};
//   padding-top: 1.2rem;
//   resize: none;
//   border: none;
//   outline: none;
//   white-space: pre-wrap;
// `

const UnorderedList = styled.ul`
 &  li {
    font-size: 0.9rem;
    color: ${(({theme}) => theme.colors.textSubtle)};
 }
`

const JustifyR = styled(Flex)`
  justify-content: flex-end;
`

const ColumnTwo = styled(TwoColumn)`
  max-width: 100%;
`
const GridThree = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
const GridTwo = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
`

const ProgressBar: React.FC<{token: string, guildpad: Guildpad, rarity?: string}> = ({token, guildpad, rarity = '1'}) => {
  const theme = useContext(ThemeContext)
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const balance = useEthBalance()
  const tokenBalanceAmount = getBalanceAmount(balance, guildpad.buyingCoin.decimals)

  return(
    <div style={{height: '100%', width: '100%'}}>
      <ColumnTwo>
        <Text>Price per Box:</Text>
        <JustifyR>
          <BoxImg size="1.8rem" src={`/images/tokens/${token}.svg`} alt='BNB' />
          <Text>{guildpad.boxInfo[rarity].price} BNB</Text>
        </JustifyR>
      </ColumnTwo>
      <ColumnTwo>
        <Text>Balance:</Text>
        <JustifyR>
          <BoxImg size="1.8rem" src={`/images/tokens/${token}.svg`} alt='BNB' />
          <Text>{tokenBalanceAmount.toPrecision(6)} BNB</Text>
        </JustifyR>
      </ColumnTwo>
      <Progress
        variant='round'
        primaryStep={guildpad.boxInfo[rarity].percentSold}
      />
      <GridThree>
        <Text>{guildpad.boxInfo[rarity].percentSold}%</Text>
         <Text small color={theme.colors.textSubtle}>You own <span style={{color: 'white'}}>{guildpad.userData.boughtBoxes}</span> boxes</Text>
        <Text small style={{textAlign: 'right'}} color={theme.colors.textSubtle}>{guildpad.boxInfo[rarity].supply-guildpad.boxInfo[rarity].sold}/{guildpad.boxInfo[rarity].supply} boxes</Text>
      </GridThree>
    </div>
  )
}


const BoxCard: React.FC<{guildpad: GuildpadConfig, imgProps: ImgProps}> = ({guildpad, imgProps}) => {
  const [rarityId, setRarityId] = useState("1") // TODO: For dynamic in case there are multiple types of boxes for sale
  const [buyQuantity, setBuyQuantity] = useState(0)
  const { account } = useWeb3React()
  const theme = useContext(ThemeContext)
  const {src, size} = imgProps
  const img = `/images/guildpad-assets/${src}`
  const dispatch = useAppDispatch()
  const { onBuyBox } = useBuyBox(getAddress(guildpad.contractAddress));
  const handleBuy = async () => {
    const ids = [guildpad.id]
    await onBuyBox(rarityId, buyQuantity * guildpad.boxInfo[rarityId].price)
    dispatch(fetchPublicGuildpadDataAsync([guildpad.id]))
    dispatch(fetchGuildpadUserDataAsync({ account, ids }))
  }
  const onChange = (e) => {
    if (!e.target.value) {
      setBuyQuantity(0)
      return
    }
    setBuyQuantity(parseInt(e.target.value))
  }
  return (
      <GCard>
        <div style={{padding: '1rem 2.5rem'}}>
          <Cont>
            {/* <BoxImg src={img} size={size}/> */}
            <SvgIcon Icon={BoxCrate} />
          </Cont>
          <Flex style={{paddingTop: '2rem'}}>
            <Heading size='lg' color={theme.colors.primary}>Mystery Box</Heading>
          </Flex>
          <Flex>
            <div style={{padding: '1.2rem 0 5rem 0'}}>
              <UnorderedList>
                <li>
                  Each box contains 1 NFT (Generation 1)
                </li>
                <li>
                    There will be a total of 10,000 NFTs in the first generation of AcknoLedger Genesis NFTs.
                </li>
              </UnorderedList>
            </div>
          </Flex>
          <Flex>
            <ProgressBar token={getAddress(tokens.wbnb.address)} guildpad={guildpad} rarity={rarityId}/>
          </Flex>
          <Flex style={{padding: '1rem 0 0 0'}}>
              {!account ? (
                <UnlockButton fullWidth />
              ) : (
                <GridTwo>
                  <input placeholder='Qty.' name='buyQuantity' value={buyQuantity} onChange={onChange}/>
                    <JustifyR>
                      <Button disabled={buyQuantity <= 0} onClick={handleBuy} fullWidth style={{ backgroundColor: 'rgba(41, 178, 19, 1)', borderRadius: '5px' }}>
                        Buy
                      </Button>
                  </JustifyR>
                </GridTwo>
              )}
          </Flex>
        </div>
      </GCard>
  )
}

export default BoxCard
