import { Flex, Heading, Text } from '@sparkpointio/sparkswap-uikit'
import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Globe, Send, Twitter } from 'react-feather'
import Anchor from './Anchor'
import { ReactComponent as MediumIcon } from './icons/MediumIcon.svg'
import SvgIcon from './SvgIcon'

const TokenLogo = styled.img<{ size?: string }>`
  border-radius: 50%;
  height: ${({ size }) => (!size ? '60px' : size)};
  width: ${({ size }) => (!size ? '60px' : size)};
  margin-right: 15px;
  z-index: 2;
  @media (max-width: 500px) {
    height: ${({ size }) => (!size ? '50px' : size)};
    width: ${({ size }) => (!size ? '50px' : size)};
  }
`

const Logo: React.FC<{ tokenName: string; image: string; subtitle?: string; socMeds?: string[]; padding?: string }> = ({
  tokenName,
  image,
  subtitle,
  socMeds,
  padding = '24px',
}) => {
  const theme = useContext(ThemeContext)
  const srcs = `${process.env.PUBLIC_URL}/images/tokens/${image}.png`
  return (
    <Flex padding={padding}>
      <TokenLogo src={srcs} />
      <Flex flexDirection="column" justifyContent="center" alignItems="flex-start">
        <Heading size="l">{tokenName}</Heading>
        {socMeds ? (
          <Flex>
            <Anchor href={socMeds?.[0]}>
              <Globe size="16px" color={theme.colors.text} />
            </Anchor>
            <Anchor href={socMeds?.[1]}>
              <Twitter size="16px" color={theme.colors.text} />
            </Anchor>
            <Anchor href={socMeds?.[2]}>
              <Send size="16px" color={theme.colors.text} />
            </Anchor>
            <Anchor href={socMeds?.[3]}>
              <SvgIcon width={16} Icon={MediumIcon} />
            </Anchor>
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
