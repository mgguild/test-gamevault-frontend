import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Container from 'components/layout/Container'
import { AboutColumn as Column, TwoColumn, TierColumns } from 'components/Column'
import { Socials, GuildpadConfig, GUILDPAD_STATUS, Token } from 'config/constants/types'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import Anchor from 'components/Launchpad/Anchor'
import SvgIcon from 'components/Launchpad/SvgIcon'
import { ReactComponent as MediumIcon } from 'components/Launchpad/icons/MediumIcon.svg'
import { Card as SCard, CardHeader as SCardHeader, Text, Heading, Flex, Button, Progress } from '@metagg/mgg-uikit'
import { getAddress } from 'utils/addressHelpers'
import TokenLogo from 'components/Launchpad/Logo'
import tokens from 'config/constants/tokens'
import { color } from '@mui/system'
import { getImageUrlFromToken } from 'utils/assetFetch'

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
 padding: '1rem';
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
    margin: 3px 0px;
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

const ProgressBar: React.FC<{token: string; guildpad: GuildpadConfig}> = ({token, guildpad}) => {
  const theme = useContext(ThemeContext)
  const price = guildpad.inoDetails ? guildpad.inoDetails.price: '-' 
  const userPurchase = '250';
  const maxPurchase = guildpad.totalSupply;
  console.log(guildpad)
  return(
    <div style={{height: '100%', width: '100%'}}>
      <ColumnTwo>
        <Text>Price per Box:</Text>
        <JustifyR>
          <BoxImg size="1.8rem" src={token} alt='BNB' />
          <Text>{price} BNB</Text>
        </JustifyR>
      </ColumnTwo>
      <Progress
        variant='round'
        primaryStep={0}
      />
      <GridThree>
        <Text>0%</Text>
        <Text small color={theme.colors.textSubtle}>You own <span style={{color: 'white'}}>0</span> boxes</Text>
        <Text small style={{textAlign: 'right'}} color={theme.colors.textSubtle}>{`${userPurchase}/${maxPurchase}`} boxes</Text>
      </GridThree>
    </div>
  )
}


const BoxCard: React.FC<{guildpad: GuildpadConfig, imgProps: ImgProps}> = ({guildpad, imgProps}) => {
  const [percent, setPercent] = useState(20)

  const theme = useContext(ThemeContext)
  const {src, size} = imgProps
  const img = `/images/guildpad-assets/${src}`
  const val = true
  const handleChangePercent = (sliderPercent: number) => {
    setPercent(20);
  }

 const wbnbAddress = getImageUrlFromToken(tokens.wbnb)


  return (
      <GCard>
        <div style={{padding: '1rem 2.5rem'}}>
          <Cont>
            <BoxImg src={img} size={size}/>
          </Cont>
          <Flex style={{paddingTop: '2rem'}}>
            <Heading size='lg' color={theme.colors.primary}>Sample Box 1</Heading>
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
            <ProgressBar token={wbnbAddress} guildpad={guildpad}/>
          </Flex>
          <Flex style={{padding: '1rem 0 0 0'}}>
            <GridTwo>
              <input placeholder='Qty.'/>
              <JustifyR>
                <Button>BUY</Button>
              </JustifyR>
            </GridTwo>
          </Flex>
        </div>
      </GCard>
  )
}

export default BoxCard
