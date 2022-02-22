import { TranslatableText } from 'state/types'
import BigNumber from 'bignumber.js'

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

export interface Ino {
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

export type Status = 'ongoing' | 'upcoming' | 'completed' | null;
export type Type = 'INO' | 'IDO';
export type Distribution = 'VESTING' | 'SELF-CLAIM' | 'AIRDROP';
export const GUILDPAD_STATUS: { ongoing: Status; upcoming: Status; completed: Status } = {
  ongoing: 'ongoing',
  upcoming: 'upcoming',
  completed: 'completed',
}
export const TYPE: { INO: Type; IDO: Type } = { INO: 'INO', IDO: 'IDO' }
export const DISTRIBUTION: { VESTING: Distribution; SELF_CLAIM: Distribution; AIRDROP: Distribution} = {
  VESTING: 'VESTING',
  SELF_CLAIM: 'SELF-CLAIM',
  AIRDROP: 'AIRDROP'
}

export interface Socials {
  website?: string;
  twitter?: string;
  telegram?: string;
  medium?: string;
  discord?: string;
  youtube?: string;
}

type InoDetails = {
  price?: string;
  ratio?: string;
  boxes?: string;
}

type IdoDetails = {
  price?: string;
}

interface GuildPadInformation {
  title: string;
  description: string;
  distribution?: string;
  round: string;
  type?: Type;
  date?: {start: string, end: string};
  status: Status;
  hasStarted?: boolean;
  hasEnded?: boolean;
  totalSupply?: string;
  totalSold?: string;
  totalRaise?: string;
  buyLimitEnabled?: boolean,
  whitelistEnabled?: boolean,
  nextRoundID?: number,
  nextRoundDate?: number,
  buyLimit?: string,
  socials?: Socials;
  inoDetails?: InoDetails;
  idoDetails?: IdoDetails;
  epochEndDate?: number
}


export interface GuildpadConfig extends GuildPadInformation {
  id: number,
  contractAddress?: Address;
  FundstoRaise?: string;
  buyingCoin?: Token;
  sellingCoin?:  Token;
  projectTokenEquivalent?: string;
  asOfPriceInProjectToken?: number;
  available?: string;
  boxDetails?: any;
  boxInfo?: {
    1: {
      price: string,
      supply: string,
      sold: string
    }
  };
}