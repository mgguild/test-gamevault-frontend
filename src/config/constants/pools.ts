import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    isMain: true,
    sousId: 9,
    stakingToken: tokens.mgg,
    earningToken: tokens.mgg,
    contractAddress: {
      97: '0x131E4A6743C942c1c564fB124fD069f96e44629B',
      56: '0xa1a3f2c3d2b76926500b3f923ef997b64948a6ec',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '10000000000000000000',
    sortOrder: 999,
    isFinished: false,
  },
  // Dummy Contract #1
  // {
  //   sousId: 4,
  //   stakingToken: tokens.sfuel,
  //   earningToken: tokens.sfuel,
  //   contractAddress: {
  //     97: '0xa4bf8a4abb7fd91971854ac0aade50c61afd9f1a',
  //     56: '0x9c03326543bf9a927a5ff51c407fbc444f19ca1a',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '49603174603174603',
  //   sortOrder: 999,
  //   isFinished: true,
  //   isComingSoon: true,
  // },
  // Dummy Contract #2
  // {
  //   sousId: 5,
  //   stakingToken: tokens.srkb,
  //   earningToken: tokens.sfuel,
  //   contractAddress: {
  //     97: '0xa4bf8a4abb7fd91971854ac0aade50c61afd9f3a',
  //     56: '0x9c03326543bf9a927a5ff51c407fbc444f19ca3a',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   harvest: true,
  //   tokenPerBlock: '49603174603174603',
  //   sortOrder: 999,
  //   isFinished: true,
  //   isComingSoon: false,
  // }
]

export default pools
