import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Route, useLocation, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Flex, Image, RowType, Toggle } from '@pancakeswap/uikit'
import { Oval } from 'react-loading-icons'
import { Text, Heading } from '@metagg/mgg-uikit'
import styled, { ThemeContext } from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import useMedia from 'use-media'
import { SvgIcon } from '@material-ui/core'
import { useFarms, usePollFarmsData, usePriceCakeBusd } from 'state/hooks'
import usePersistState from 'hooks/usePersistState'
import { useFarmPrice } from 'hooks/price'
import usePrevious from 'utils/refHelpers'
import { Farm } from 'state/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import { getFarmApr, getFarmV2Apr } from 'utils/apr'
import useTokenBalance from 'hooks/useTokenBalance'
import { orderBy } from 'lodash'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'
import isArchivedPid from 'utils/farmHelpers'
import { latinise } from 'utils/latinise'
import PageHeader from 'components/PageHeader'
import SearchInput from 'components/SearchInput'
import Select, { OptionProps } from 'components/Select/Select'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema, ViewMode } from './components/types'
import { ReactComponent as FarmsDarkLogo } from './components/assets/farm-dark.svg'
import { ReactComponent as FarmsLightLogo } from './components/assets/farm-light.svg'

import '../../css/styleFX.css'

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/tokens/${address}.${token.iconExtension?? 'svg'}`
}

const StakeCards = styled.button<{src? : string, bgColor? : string}>`
  position: relative;
  min-width: 20rem;
  max-width: 40rem;
  min-height: 12rem;
  cursor: pointer;
  border: none;
  padding: 0;
  text-align: left;
  flex: 1;
  background-color: ${({bgColor}) => bgColor ?? '#a30404b8'};
  ${({src}) => src &&
    `&:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.2;
      width: 100%;
      height: 100%;
      z-index: 0;
      background-image: url(${src});
      background-repeat: no-repeat;
      // background-attachment: fixed;
      background-position: center;
      background-size: cover;
    }`
  }
`

const StakeCardContainer = styled.div`
  display: grid;
  position: relative;
  padding: 1rem 1.5rem;
  background: linear-gradient(0deg,rgb(0 0 0) 0%,rgb(0 0 0 / 50%) 25%,rgba(36,121,9,0) 75%);
  width: 100%;
  height: 100%;
  z-index: 2;
  grid-template-columns: 1fr 1fr;
`
const TokenLogo = styled.img<{ size?: string }>`
  border-radius: 50%;
  height: ${({ size }) => (!size ? '80px' : size)};
  width: ${({ size }) => (!size ? '80px' : size)};
  z-index: 2;
  @media (max-width: 500px) {
    height: ${({ size }) => (!size ? '50px' : size)};
    width: ${({ size }) => (!size ? '50px' : size)};
  }
`

const Badge = styled.div<{ type?: number}>`
  ${({type}) => type ?
    `
      padding: 0.2rem 0.5rem;
      border: thin solid white;
      border-radius: 0.3rem;
    `
    :
    `
      padding: 0.2rem 0.5rem;
      background-color: rgb(0,196,204);
      border-radius: 0.3rem;
    `
  }
`

const NUMBER_OF_FARMS_VISIBLE = 12

const NewFarms: React.FC = () => {

  return (
    <>
      <div style={{
        padding: '5rem',
      }}>
        <Heading size='xl'>
          Live Farms
        </Heading>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-evenly',
          columnGap: '2rem',
          rowGap: '2rem'
        }}>
          <StakeCards src='./MGG.png' bgColor='#030f62' className='shodow-pop'>
            <StakeCardContainer>
              <TokenLogo size='3.5rem' src={getImageUrlFromToken(tokens.mgg)} />
              <Flex style={{
                flexFlow: 'row wrap',
                columnGap: '0.5rem',
                justifyContent: 'end',
              }}>
                <div><Badge><Text color='white'>New</Text></Badge></div>
                <TokenLogo size='2rem' src={getImageUrlFromToken(tokens.wbnb)} />
                <div><Badge type={1}><Text color='white'>LP FARM</Text></Badge></div>
              </Flex>
              <Flex style={{alignItems: 'end'}}>
                <div>
                  <Text color='white'>MGG Token</Text>
                  <Heading color='white'>Metagaimng Guild</Heading>
                </div>
              </Flex>
              <Flex style={{justifyContent: 'end', alignItems: 'end'}}>
                <div style={{textAlign: 'end'}}>
                  <Text color='white'>APY 150%</Text>
                  <Heading color='white'>100 Days Left</Heading>
                </div>
              </Flex>
            </StakeCardContainer>
          </StakeCards>
          <StakeCards src='./MGG.png' className='shodow-pop'>
            <StakeCardContainer>
              <Text>
                test
              </Text>
            </StakeCardContainer>
          </StakeCards>
        </div>
      </div>
    </>
  )
}

export default NewFarms