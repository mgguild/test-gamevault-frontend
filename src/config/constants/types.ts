import { TranslatableText } from 'state/types'

export interface Address {
  97?: string
  56: string
}

export interface Token {
  symbol: string
  address?: Address
  decimals?: number
  projectLink?: string
  busdPrice?: string
  iconExtension?: string | 'svg'
}

export enum PoolIds {
  poolBasic = 'poolBasic',
  poolUnlimited = 'poolUnlimited',
}

export type IfoStatus = 'idle' | 'coming_soon' | 'live' | 'finished'

interface IfoPoolInfo {
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  distributionRatio: number // Range [0-1]
}

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  currency: Token
  token: Token
  releaseBlockNumber: number
  articleUrl: string
  campaignId: string
  tokenOfferingPrice: number
  version: number
  [PoolIds.poolBasic]?: IfoPoolInfo
  [PoolIds.poolUnlimited]: IfoPoolInfo
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
}

export interface FarmConfig {
  isMain?: true
  pid: number
  lpSymbol: string
  lpAddresses: Address
  stakingAddresses: Address
  token: Token
  pairToken: Token
  quoteToken: Token
  multiplier?: string
  isCommunity?: boolean
  liquidityUrl?: string
  infoURL?: string
  isPromoted?: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  isMain?: boolean
  sousId: number
  earningToken: Token
  stakingToken: Token
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  isComingSoon?: boolean
  enableEmergencyWithdraw?: boolean
  isAddTokenDisabled?: boolean
  isDepositDisabled?: boolean
  isWithdrawDisabled?: boolean
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type NftImages = {
  blur?: string
} & Images

export type NftVideo = {
  webm: string
  mp4: string
}

export type NftSource = {
  [key in NftType]: {
    address: Address
    identifierKey: string
  }
}

export enum NftType {
  PANCAKE = 'pancake',
  MIXIE = 'mixie',
}

export type Nft = {
  description: string
  name: string
  images: NftImages
  sortOrder: number
  type: NftType
  video?: NftVideo

  // Uniquely identifies the nft.
  // Used for matching an NFT from the config with the data from the NFT's tokenURI
  identifier: string

  // Used to be "bunnyId". Used when minting NFT
  variationId?: number | string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo' | 'teambattle'

export type Campaign = {
  id: string
  type: CampaignType
  title?: TranslatableText
  description?: TranslatableText
  badge?: string
}

export type PageMeta = {
  title: string
  description?: string
  image?: string
}

export type Status = 'active' | 'upcoming' | 'completed' | null;
export type Type = 'INO' | 'IGO';
export type Distribution = 'VESTING' | 'SELF-CLAIM';
export const STATE: { active: Status; upcoming: Status; completed: Status } = {
  active: 'active',
  upcoming: 'upcoming',
  completed: 'completed',
}
export const TYPE: { INO: Type; IGO: Type } = { INO: 'INO', IGO: 'IGO' }
export const DISTRIBUTION: { VESTING: Distribution; SELF_CLAIM: Distribution } = {
  VESTING: 'VESTING',
  SELF_CLAIM: 'SELF-CLAIM',
} 

export interface Socials {
  website?: string;
  twitter?: string;
  telegram?: string;
  medium?: string;
  discord?: string;
}

interface GuildPadInformation {
  title: string;
  description: string;
  distribution?: string;
  type?: Type;
  date?: string;
  status: Status;
  socials?: Socials;
}


export interface IGuildpad extends GuildPadInformation {
  address?: string;
  FundstoRaise?: string;
  buyingCoin?: Token;
  sellingCoin?:  Token;
  available?: string;
}