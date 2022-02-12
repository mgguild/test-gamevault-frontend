import { Flex, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import { Socials, Token } from 'config/constants/types'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import Anchor from './Anchor'
import { ReactComponent as MediumIcon } from './icons/MediumIcon.svg'
import SvgIcon from './SvgIcon'

const TokenLogo = styled.img<{ size?: string }>`
  border-radius: 50%;
  height: ${({ size }) => (!size ? '80px' : size)};
  width: ${({ size }) => (!size ? '80px' : size)};
  margin-right: 15px;
  z-index: 2;
  @media (max-width: 500px) {
    height: ${({ size }) => (!size ? '50px' : size)};
    width: ${({ size }) => (!size ? '50px' : size)};
  }
`

type LogoProps = {
  tokenName: string
  primaryToken: Token
  subtitle?: string
  socMeds?: Socials
  padding?: string
}

const Logo: React.FC<LogoProps> = ({ tokenName, primaryToken, subtitle, socMeds, padding = '24px' }) => {
  const theme = useContext(ThemeContext)

  const getImageUrlFromToken = (token: Token) => {
    const address = getAddress(token.symbol === 'BNB' ? tokens.wbnb.address : token.address)
    return `/images/tokens/${address}.${token.iconExtension ?? 'svg'}`
  }

  return (
    <Flex padding={padding}>
      <TokenLogo src={getImageUrlFromToken(primaryToken)} />
      <Flex flexDirection="column" justifyContent="center" alignItems="flex-start">
        <Heading size="l">{tokenName}</Heading>
        {socMeds ? (
          <Flex>
            {socMeds?.website && (
              <Anchor href={socMeds?.website}>
                <Globe size="16px" color={theme.colors.text} />
              </Anchor>
            )}
            {socMeds?.twitter && (
              <Anchor href={socMeds?.twitter}>
                <Twitter size="16px" color={theme.colors.text} />
              </Anchor>
            )}
            {socMeds?.telegram && (
              <Anchor href={socMeds?.telegram}>
                <Send size="16px" color={theme.colors.text} />
              </Anchor>
            )}
            {socMeds?.discord && (
              <Anchor href={socMeds?.discord}>
                <SiDiscord size="16px" color={theme.colors.text} />
              </Anchor>
            )}
            {socMeds?.medium && (
              <Anchor href={socMeds?.medium}>
                <SvgIcon width={16} Icon={MediumIcon} />
              </Anchor>
            )}  
            {socMeds?.youtube && (
              <Anchor href={socMeds?.youtube}>
              <SiYoutube width={16} color={theme.colors.text} />
            </Anchor>
            )}
          </Flex>
        ) : (
          <Text fontSize="12px" color="textSubtle">
            {subtitle}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default Logo
