import tokens from './tokens'
import { FarmConfig } from './types'
import { CAKE_INFO_URL, PANCAKE_ADD_LIQUIDITY_URL } from '../index'
import farmsUIProps from './farmsUIProps'

const farms: FarmConfig[] = [
  /**
   * These 3 farms (PID 0, 251, 252) should always be at the top of the file.
   */
  /* {
    pid: 0,
    lpSymbol: 'CAKE',
    lpAddresses: {
      97: '',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  */

  /**
   * INTERNAL STAKING POOLS
   */
  // OWN - BNB - OWN
  // {
  //   pid: 251,
  //   lpSymbol: 'SRKb-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xD581CdF609DD50fbaa25118583c6EE31b39662F9',
  //   },
  //   stakingAddresses: {
  //     97: '',
  //     56: '0xCec445174D6f4e87d38d43d4b13E36dd55CC56A1',
  //   },
  //   token: tokens.srkb,
  //   pairToken: tokens.wbnb,
  //   quoteToken: tokens.srkb,
  //   UIProps: farmsUIProps.mgg
  // },
  // {
  //   pid: 252,
  //   lpSymbol: 'OWN-BNB LP',
  //   lpAddresses: {
  //     97: '',
  //     56: '0xB31F2F7939108D9a518f6152689Dc1463091Ee7b',
  //   },
  //   stakingAddresses: {
  //     97: '',
  //     56: '0x0Fe376032276Ad5fc55e782D6AB1f85Ce0669BFB',
  //   },
  //   token: tokens.own,
  //   pairToken: tokens.wbnb,
  //   quoteToken: tokens.own,
  //   UIProps: farmsUIProps.mgg
  // },

  /**
   * EXTERNAL STAKING POOLS
   */
  {
    isMain: true,
    pid: 253,
    name: 'MetaGaming Guild',
    lpSymbol: 'MGG-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0x709eE9F39F1eC7aAcB05234C64d32b6DD5626309',
    },
    stakingAddresses: {
      97: '',
      56: '0xc5A228b9Ec0605944ee7a7cf5CBE528F310257DF',
    },
    token: tokens.mgg,
    pairToken: tokens.busd,
    quoteToken: tokens.mgg,
    isPromoted: 1,
    UIProps: farmsUIProps.mgg
  },
]

export default farms
