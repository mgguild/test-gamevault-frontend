import BigNumber from 'bignumber.js'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';

const socials = {
    website: 'https://www.tankwars.zone/',
    twitter: 'https://twitter.com/TankWarsZone',
    telegram: 'https://t.me/TankWarsZone',
    discord: 'https://discord.com/invite/82jCm7QyRA',
    medium: 'https://tankwarszone.medium.com/'
}

const guildpad: GuildpadConfig = {
    id: 2,
    title: 'TankWars Zone',
    description: 'TANK WARS ZONE IS A METAVERSE-READY EXCITING AND VISUALLY REFRESHING ACTION GAME BUILT ON BLOCKCHAIN TECHNOLOGY.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.VESTING,
    status: GUILDPAD_STATUS.upcoming,
    contractAddress: {
      97: '0x001',
      56: '0x001',
    },
    buyingCoin: tokens.wbnb,
    sellingCoin: tokens.TankWarsZone,
    inoDetails: {
        price: 'TBA',
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
