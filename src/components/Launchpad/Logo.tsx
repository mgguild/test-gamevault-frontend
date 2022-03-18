import { Flex, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Globe, Send, Twitter } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import { Socials, Token } from 'config/constants/types'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'
import { getImageUrlFromToken } from 'utils/assetFetch'
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

const Logo: React.FC<LogoProps> = ({projName, tokenSize, tokenName, nameSize = 'l', subSize = '12px', primaryToken, subtitle, socMeds, socMedsSize = 16, padding = '24px', color = null}) => {
  const theme = useContext(ThemeContext)
  const colour = color ?? theme.colors.text;
  return (
    <Flex padding={padding} style={{alignItems: 'center'}}>
      <TokenLogo size={tokenSize} src={getImageUrlFromToken(primaryToken)} />
      <Flex flexDirection="column" justifyContent="center" alignItems="flex-start">
        <Heading color={colour} size={nameSize}>{
          projName && !tokenName.includes(projName.substring(0, 5)) ?
          projName : tokenName
        }</Heading>
        {socMeds ? (
          <Flex>
            {socMeds?.website && (
              <Anchor href={socMeds?.website}>
                <Globe size={`${socMedsSize}px`} color={colour} />
              </Anchor>
            )}
            {socMeds?.twitter && (
              <Anchor href={socMeds?.twitter}>
                <Twitter size={`${socMedsSize}px`} color={colour} />
              </Anchor>
            )}
            {socMeds?.telegram && (
              <Anchor href={socMeds?.telegram}>
                <Send size={`${socMedsSize}px`}  color={colour} />
              </Anchor>
            )}
            {socMeds?.discord && (
              <Anchor href={socMeds?.discord}>
                <SiDiscord size={`${socMedsSize}px`} color={colour} />
              </Anchor>
            )}
            {socMeds?.medium && (
              <Anchor href={socMeds?.medium}>
                <SvgIcon width={socMedsSize} Icon={MediumIcon} fill={colour}/>
              </Anchor>
            )}
            {socMeds?.youtube && (
              <Anchor href={socMeds?.youtube}>
              <SiYoutube size={`${socMedsSize}px`} color={colour} />
            </Anchor>
            )}
          </Flex>
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
