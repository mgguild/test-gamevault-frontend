import { UIProps } from './types'
import tokensSocials from './tokensSocials'

interface farmUIProps{
  [key: string]: UIProps
}

const farmsUIProps: farmUIProps = {
  mgg: {
    socials: tokensSocials.mgg,
    contain: false,
  },
  mgg2: {
    socials: tokensSocials.mgg,
    contain: false,
    bgColor: '#b10303d6',
  },
}

export default farmsUIProps

