import tokens from './tokens'
import { FarmConfig } from './types'
import { CAKE_INFO_URL, PANCAKE_ADD_LIQUIDITY_URL } from '../index'

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
  {
    pid: 251,
    lpSymbol: 'SRKb-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xD581CdF609DD50fbaa25118583c6EE31b39662F9',
    },
    stakingAddresses: {
      97: '',
      56: '0xCec445174D6f4e87d38d43d4b13E36dd55CC56A1',
    },
    token: tokens.srkb,
    pairToken: tokens.wbnb,
    quoteToken: tokens.srkb,
  },
  {
    pid: 252,
    lpSymbol: 'OWN-BNB LP',
    lpAddresses: {
      97: '',
      56: '0xB31F2F7939108D9a518f6152689Dc1463091Ee7b',
    },
    stakingAddresses: {
      97: '',
      56: '0x0Fe376032276Ad5fc55e782D6AB1f85Ce0669BFB',
    },
    token: tokens.own,
    pairToken: tokens.wbnb,
    quoteToken: tokens.own,
  },

  /**
   * EXTERNAL STAKING POOLS
   */
  {
    isMain: true,
    pid: 260,
    lpSymbol: 'MGG-BUSD LP',
    lpAddresses: {
      97: '',
      56: '0xaaf827e2eaf72c62e77047458cbd40e7f30f1896',
    },
    stakingAddresses: {
      97: '',
      56: '0x5a870495971ed55bd377fc390f46ab1b96bcd6b4',
    },
    token: tokens.mgg,
    pairToken: tokens.busd,
    quoteToken: tokens.busd,
    isPromoted: 1
  },

]

export default farms
