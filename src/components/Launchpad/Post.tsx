import React, { useContext, useState } from 'react'
import { Text, Flex, Button } from '@sparkpointio/sparkswap-uikit'
import styled, { ThemeContext } from 'styled-components'
import { ChevronUp, ChevronDown } from 'react-feather'
import useMedia from 'use-media'
import { Header } from './styled'
import TokenLogo from './Logo'

const PostHeader = styled(Header)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url('/images/icons/oreBG6.png');
  background-position: 50% 78%;
  background-size: cover;
  background-repeat: no-repeat;
`
const PostBody = styled(Flex)`
  width: 100%;
  padding: 20px 30px;
  background-color: ${({ theme }) => theme.card.background};
  flex-direction: column;
`
const PostContainer = styled.div`
  width: 100%;
`

const TokenProperty = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 25px;
  min-width: 60px;
  margin: 0px 10px;
  justify-content: center;
  & > * {
    font-size: 12px;
    font-weight: bold;
    margin: 5px 10px;
  }
  // @media (max-width: 500px) {
  //   width: auto;
  //   min-width: auto;
  // }
`

const Details = styled(Button)`
  border-radius: 10px;
  height: 40px;
  @media (max-width: 500px) {
    width: 40%;
  }
`

const NavOption = styled(Button)<{ activeIndex: boolean }>`
  background-color: transparent;
  color: ${({ theme, activeIndex }) => (activeIndex ? theme.colors.text : theme.colors.textSubtle)};
  border-bottom: ${({ theme, activeIndex }) => activeIndex && `3px solid ${theme.colors.primary}`};
`
const SaleContainer = styled(Flex)`
  margin: 10px 0px;
  & > * {
    width: 45%;
  }
`

const SaleRow = styled(Flex)`
  margin: 10px 0px;
`

const Content: React.FC = () => {
  const theme = useContext(ThemeContext)
  const [active, setActive] = useState(1)

  const renderDescription = () => {
    const description =
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.'

    return (
      <Text color="textSubtle" margin="10px 0px" style={{ lineHeight: '2em' }}>
        {description}
      </Text>
    )
  }

  const renderSale = () => {
    const price = '1 ORE = $0.13'
    const start = 'November 24th 2021, 1:00PM UTC'
    const end = 'November 30th 2021, 1:PM UTC'
    const distribution = 'November 30th 2021, 2:PM UTC'
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

const Post: React.FC = () => {
  const [toggle, setToggle] = React.useState(false)
  const sites = ['socmeds', 'socmeds', 'socmeds', 'socmeds']
  const isMobile = useMedia({ maxWidth: 500 })

  return (
    <PostContainer>
      <PostHeader>
        <Flex
          alignItems="center"
          style={isMobile ? { flexDirection: 'column', rowGap: '1.5px' } : { flexDirection: 'row' }}
        >
          <TokenLogo tokenName="Outrace" image="ore.png" padding="0px" socMeds={sites} />
          <TokenProperty>
            <Text>ORE/BNB</Text>
          </TokenProperty>
          <TokenProperty>
            <Text>ORE</Text>
          </TokenProperty>
        </Flex>
        <Details onClick={() => setToggle(!toggle)}>
          {' '}
          Details &nbsp; {toggle ? <ChevronUp /> : <ChevronDown />}{' '}
        </Details>
      </PostHeader>
      {toggle && <Content />}
    </PostContainer>
  )
}

export default Post
