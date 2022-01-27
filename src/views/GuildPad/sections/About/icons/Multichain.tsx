import React, { SVGAttributes, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { SvgProps } from 'components/SvgIcon/types'
import { ReactComponent as MultiChainIcon } from 'assets/About/Multichain.svg'
// import { ReactComponent as LaunchpadtreasurylightIcon } from 'assets/About/Launchpadtreasury_light.svg'
import SvgIcon from 'components/SvgIcon'

const Icon: React.FC<SvgProps> = (props) => {
  const theme = useContext(ThemeContext)

  return <SvgIcon width={115} Icon={MultiChainIcon} />
}

export default Icon
