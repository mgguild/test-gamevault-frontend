import { Flex, Text, Button } from '@metagg/mgg-uikit'
import { useWeb3React } from '@web3-react/core'
import { NavOption, PostBody, SaleContainer, SaleRow } from 'components/Launchpad/styled'
import UnlockButton from 'components/UnlockButton'
import useTheme from 'hooks/useTheme'
import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  description?: string
}

const Content: React.FC<{ details: Props }> = ({ details }) => {
  const { account } = useWeb3React()
  const [active, setActive] = useState<number>(0)
  const { theme } = useTheme()

  const renderDescription = () => {
    const description = details.description
    return (
      <Text color="textSubtle" padding="30px" style={{ lineHeight: '2em' }}>
        {' '}
        {description}{' '}
      </Text>
    )
  }

  const renderClaim = () => {
    return (
      <SaleContainer justifyContent="space-between" alignItems="space-between">
        <StyleSaleRow>
          <Text color="textSubtle">Total Allocation</Text>
          <Text>000 MGG</Text>
        </StyleSaleRow>
        <StyleSaleRow>
          <Text color="textSubtle">Claimed</Text>
          <Text>000 MGG</Text>
        </StyleSaleRow>
        <StyleSaleRow>
          <Text color="textSubtle">Available</Text>
          <Text>000 MGG</Text>
        </StyleSaleRow>
        <StyleSaleRow>
          <Text color="textSubtle">Next vesting date</Text>
          <Text>N/A</Text>
        </StyleSaleRow>
        {!account ? <UnlockButton margin="20px auto 0 auto" /> : <ClaimBtn disabled> Claim </ClaimBtn>}
      </SaleContainer>
    )
  }

  const renderTabs = (tab) => {
    switch (tab) {
      case 0:
        return renderDescription()
      case 1:
        return renderClaim()
      default:
        return 'coming soon'
    }
  }

  return (
    <PostBody>
      <Flex
        alignItems="center"
        margin="10px 0px 20px 0px"
        style={{ borderBottom: `0.5px solid ${theme.colors.primary}`, width: '100%' }}
      >
        <NavOption onClick={() => setActive(0)} activeIndex={active === 0}>
          Description
        </NavOption>
        <NavOption onClick={() => setActive(1)} activeIndex={active === 1}>
          Claim
        </NavOption>
      </Flex>
      {renderTabs(active)}
    </PostBody>
  )
}

Content.defaultProps = {
  details: {
    description: '',
  },
}

export default Content

const StyleSaleRow = styled(SaleRow)`
  justify-content: space-between;
`

const ClaimBtn = styled(Button)`
  margin: 20px auto 0 auto;
  background: ${({ theme }) => theme.colors.MGG_accent1}!important;
`
