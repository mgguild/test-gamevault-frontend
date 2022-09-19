import * as IconModule from 'react-icons/fa'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Flex } from '@metagg/mgg-uikit'
import { Socials } from 'config/constants/types'
import Anchor from './Anchor'

type SocialsProps = {
  socials: Socials
  size?: number
  color?: string | null
  center?: boolean
}

export const SocIcons = IconModule as unknown as { [key: string]: React.FC<{ iconName?: string }> }

const RenderSocials: React.FC<SocialsProps> = ({ socials, size, color, center }) => {
  const theme = useContext(ThemeContext)
  const colour = color ?? theme.colors.text

  return (
      <Flex style={{ justifyContent: center ? 'center' : 'left' }}>
       { 
        Object.entries(socials).map((value, key) => {
          const iconName = value[0].charAt(0).toUpperCase() + value[0].slice(1)
          const Icon = SocIcons[`Fa${iconName}`] ?? IconModule.FaRocket
          const iconElement = <Icon color='white' size={size} /> 
          const identifier = key + 1
          return (
            <Anchor key={identifier} href={value[1]}>
              {iconElement}
            </Anchor>
          )
        })
       }
      </Flex>
  )
}

export default RenderSocials
