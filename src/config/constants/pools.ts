import { MAINNET_CHAIN_ID, TESTNET_CHAIN_ID } from 'config'
import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'
import farmsUIProps from './LP-BP-UIProps'

const pools: PoolConfig[] = [
  {
    isMain: true,
    sousId: 9,
    name: 'MetaGaming Guild',
    chain: MAINNET_CHAIN_ID,
    stakingToken: tokens.mgg,
    earningToken: tokens.mgg,
    contractAddress: {
      97: '0x131E4A6743C942c1c564fB124fD069f96e44629B',
      56: '0x6506b58CEFecA9820debC9485Fc2A49E3310C869',
    },
    poolCategory: PoolCategory.CORE,
    harvest: true,
    tokenPerBlock: '154320987654320987',
    sortOrder: 999,
    isFinished: false,
    UIProps: farmsUIProps.PBmggMgg,
  },
  {
    // Fixed APR mainnet contract test
    isMain: true,
    comingSoon: false,
    sousId: 11,
    name: 'Test Fixed APR',
    chain: MAINNET_CHAIN_ID,
    stakingToken: tokens.ttk,
    earningToken: tokens.ttk,
    contractAddress: {
      97: '0xe2762cf0174e9a6c91b2c040dd9b7fc892130de1',
      56: '0x062728dA390EeccE90571EBfce1361aB9Afc04E5',
    },
    poolCategory: PoolCategory.FIXEDAPR,
    harvest: true,
    tokenPerBlock: '154320987654320987',
    sortOrder: 998,
    isFinished: false,
    UIProps: farmsUIProps.PBmggMgg,
    fixedAprConfigs: {
      tiers: [
        {
          id: '0',
          duration: 0,
          APR: 0,
        },
        {
          id: '1',
          duration: 30,
          APR: 7,
        },
        {
          id: '2',
          duration: 90,
          APR: 12,
        },
        {
          id: '3',
          duration: 180,
          APR: 16,
        },
        {
          id: '4',
          duration: 365,
          APR: 25,
        },
      ],
      maxFine: 10,
    },
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
