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

type SocialsProps = {
  socials: Socials
  size?: number
  color?: string | null
  center?: boolean
}

export const RenderSocials: React.FC<SocialsProps> = ({socials, size = 16, color = null, center}) => {
  const theme = useContext(ThemeContext)
  const colour = color ?? theme.colors.text;

  return(
    <>
      <Flex style={{justifyContent: center ? 'center' : 'left'}}>
        {socials?.website && (
          <Anchor href={socials?.website}>
            <Globe size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.twitter && (
          <Anchor href={socials?.twitter}>
            <Twitter size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.telegram && (
          <Anchor href={socials?.telegram}>
            <Send size={`${size}px`}  color={colour} />
          </Anchor>
        )}
        {socials?.discord && (
          <Anchor href={socials?.discord}>
            <SiDiscord size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.medium && (
          <Anchor href={socials?.medium}>
            <SvgIcon width={size} Icon={MediumIcon} fill={colour}/>
          </Anchor>
        )}
        {socials?.youtube && (
          <Anchor href={socials?.youtube}>
          <SiYoutube size={`${size}px`} color={colour} />
        </Anchor>
        )}
      </Flex>
    </>
  )
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
          <RenderSocials socials={socMeds} size={socMedsSize}/>
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
