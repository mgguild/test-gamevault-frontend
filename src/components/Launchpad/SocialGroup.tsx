import { Globe, Send, Twitter, Linkedin } from 'react-feather'
import { SiDiscord, SiYoutube } from 'react-icons/si'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Flex } from '@metagg/mgg-uikit'
import { Socials } from 'config/constants/types'
import Anchor from './Anchor'
import SvgIcon from './SvgIcon'
import { ReactComponent as MediumIcon } from './icons/MediumIcon.svg'

type SocialsProps = {
  socials: Socials
  size?: number
  color?: string | null
  center?: boolean
}

const RenderSocials: React.FC<SocialsProps> = ({ socials, size = 16, color = null, center }) => {
  const theme = useContext(ThemeContext)
  const colour = color ?? theme.colors.text

  return (
    <>
      <Flex style={{ justifyContent: center ? 'center' : 'left' }}>
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
            <Send size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.discord && (
          <Anchor href={socials?.discord}>
            <SiDiscord size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.medium && (
          <Anchor href={socials?.medium}>
            <SvgIcon width={size} Icon={MediumIcon} fill={colour} />
          </Anchor>
        )}
        {socials?.youtube && (
          <Anchor href={socials?.youtube}>
            <SiYoutube size={`${size}px`} color={colour} />
          </Anchor>
        )}
        {socials?.linkedin && (
          <Anchor href={socials.linkedin}>
            <Linkedin size={`${size}px`} color={colour} />
          </Anchor>
        )}
      </Flex>
    </>
  )
}

export default RenderSocials
