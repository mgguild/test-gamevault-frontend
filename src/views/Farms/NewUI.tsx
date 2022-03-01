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

const NewFarms: React.FC = () => {
  return (
    <>
      <div style={{
        padding: '5rem'
      }}>
        <Text>
          NEW FARMS
        </Text>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: '2rem'
        }}>
          <div style={{
            padding: '0.3rem 1rem',
            borderStyle: 'solid',
            borderColor: 'red',
            borderWidth: 'thin',
            minWidth: '5rem',
            minHeight: '3rem'
          }}>
            <Text>
              test
            </Text>
          </div>
          <div style={{
            padding: '0.3rem 1rem',
            borderStyle: 'solid',
            borderColor: 'red',
            borderWidth: 'thin',
            minWidth: '5rem',
            minHeight: '3rem'
          }}>
            <Text>
              test
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewFarms