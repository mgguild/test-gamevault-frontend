import React, { SVGAttributes, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { SvgProps } from 'components/SvgIcon/types'
import { ReactComponent as TierTwoIcon } from 'assets/Tiers/Tier2Uncommon.svg'
import SvgIcon from 'components/SvgIcon'

const Icon: React.FC<SvgProps> = (props) => {
  return <SvgIcon width={118.8} Icon={TierTwoIcon} />
}

export default Icon
