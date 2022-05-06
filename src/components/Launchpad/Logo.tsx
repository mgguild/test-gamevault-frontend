import { Flex, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Socials, Token } from 'config/constants/types'
import { getImageUrlFromToken } from 'utils/assetFetch'
import RenderSocials from './SocialGroup'

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
  projName?: string
  tokenName?: string
  tokenSize?: string
  nameSize?: string
  subSize?: string
  primaryToken: Token
  subtitle?: string
  socMeds?: Socials
  socMedsSize?: number
  padding?: string
  color?: string
}

const Logo: React.FC<LogoProps> = ({
  projName,
  tokenSize,
  tokenName,
  nameSize = 'l',
  subSize = '12px',
  primaryToken,
  subtitle,
  socMeds,
  socMedsSize = 16,
  padding = '24px',
  color = null,
}) => {
  const theme = useContext(ThemeContext)
  const colour = color ?? theme.colors.text
  return (
    <Flex padding={padding} style={{ alignItems: 'center' }}>
      <TokenLogo size={tokenSize} src={getImageUrlFromToken(primaryToken)} />
      <Flex flexDirection="column" justifyContent="center" alignItems="flex-start">
        <Heading color={colour} size={nameSize}>
          {projName && !tokenName.includes(projName.substring(0, 5)) ? projName : tokenName}
        </Heading>
        {socMeds ? (
          <RenderSocials socials={socMeds} size={socMedsSize} />
        ) : (
          <Text fontSize={subSize} color="textSubtle">
            {subtitle}
          </Text>
        )}
      </Flex>
    </Flex>
  )
}

export default Logo
