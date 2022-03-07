import React from 'react'
import { Text, Flex, Image, RowType, Toggle } from '@metagg/mgg-uikit'
import PageHeader from 'components/PageHeader'
import styled from 'styled-components'
import tokens from 'config/constants/tokens'
import { Token } from 'config/constants/types'
import { getAddress } from 'utils/addressHelpers'

const getImageUrlFromToken = (token: Token) => {
  const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
  return `/images/tokens/${address}.${token.iconExtension?? 'svg'}`
}

const StakeCards = styled.div<{src? : string, bgColor? : string}>`
  position: relative;
  min-width: 35rem;
  min-height: 15rem;
  background-color: ${({bgColor}) => bgColor ?? '#a30404b8'};
  ${({src, bgColor}) => src &&
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
  position: relative;
  padding: 0.3rem 1rem;
  background: linear-gradient(0deg,rgb(0 0 0) 0%,rgb(0 0 0 / 50%) 25%,rgba(36,121,9,0) 75%);
  width: 100%;
  height: 100%;
  z-index: 2;
`

const NewFarms: React.FC = () => {
  return (
    <>
      <div style={{
        padding: '5rem',
      }}>
        <Text>
          NEW FARMS
        </Text>
        <div style={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'space-evenly',
          columnGap: '2rem',
          rowGap: '2rem'
        }}>
          <StakeCards src='./MGG.png' bgColor='#030f62'>
            <StakeCardContainer>
              <Text>
                test
              </Text>
            </StakeCardContainer>
          </StakeCards>
          <StakeCards src='./MGG.png'>
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