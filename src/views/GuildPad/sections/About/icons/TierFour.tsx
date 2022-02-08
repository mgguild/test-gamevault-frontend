import React, { SVGAttributes, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { SvgProps } from 'components/SvgIcon/types'
import { ReactComponent as TierFourIcon } from 'assets/Tiers/Tier4Epic.svg'
import TierIcon from 'assets/Tiers/Tier4Epic.png'
import SvgIcon from 'components/SvgIcon'

const Icon: React.FC<SvgProps> = (props) => {
  return <SvgIcon width={118.8} Img={TierIcon} />
}

export default Icon
