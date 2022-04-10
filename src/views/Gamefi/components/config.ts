import BigNumber from 'bignumber.js'
import { Farm } from 'state/types'

export interface FarmWithStakedValue extends Farm {
  apr?: number
  liquidity?: BigNumber
}
