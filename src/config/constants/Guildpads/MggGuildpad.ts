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
    id: 1,
    title: 'MGG',
    description: 'Lorem Ipsum',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: GUILDPAD_STATUS.ongoing,
    contractAddress: {
      97: '0xE673E67bD59A7390725ED98cBead9A5928F6f51E',
      56: '0x73fbf9DF2807CDfc050276ef2EfFcA72B5BDE05A',
    },
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.mgg,
    available: '100',
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
    epochEndDate: 1645246800000,
    totalSold: '0',
    totalRaise: '0',
    buyLimitEnabled: false,
    buyLimit: '0'
}

export default guildpad;
