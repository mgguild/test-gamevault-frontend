import { UIProps } from './types'
import tokensSocials from './tokensSocials'

interface farmUIProps{
  [key: string]: UIProps
}

const farmsUIProps: farmUIProps = {
  mgg: {
    socials: tokensSocials.mgg,
    contain: true,
  },
  mgg2: {
    socials: tokensSocials.mgg,
    contain: true,
    bgColor: '#b10303d6',
  },
}

export default farmsUIProps

