import BigNumber from 'bignumber.js'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';


const socials = {
    website: 'https://demole.io/',
    twitter: 'https://twitter.com/demoleio',
    telegram: 'https://t.me/Demoleio',
    discord: 'https://discord.com/invite/demole',
    youtube: 'https://www.youtube.com/channel/UCs69Rvm26wDYf7-r3YX2Bzw'
}

const guildpad: GuildpadConfig = {
    id: 3,
    title: 'Demole',
    description: 'Demole is a 3D Metaverse Game that allows players to walk through 3 different modes of the world Metaverse from Station, RPG, and MOBA.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: GUILDPAD_STATUS.upcoming,
    contractAddress: {
      97: '0x002',
      56: '0x002',
    },
    buyingCoin: tokens.wbnb,
    sellingCoin: tokens.demole,
    inoDetails: {
        price: 'TBA',
    },
    date: {
        start: 'TBA',
        end: 'TBA'
    },
    hasStarted: false,
    hasEnded: false,
    totalSupply: '0',
    boxInfo: {
      1: {
        price: '0',
        supply: '0',
        sold: '0'
      }
    },
    totalSold: '0',
    totalRaise: '0',
    buyLimitEnabled: false,
    buyLimit: '0'
}

export default guildpad
