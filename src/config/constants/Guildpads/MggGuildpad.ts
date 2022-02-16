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
      97: '0xd9B59A1277Bd9953D3764168B004f35534cf805B',
      56: '0x482d9F053bF1D38Cd77EC6F2289c38FE22f6f4C1',
    },
    buyingCoin: tokens.wbnb,
    sellingCoin: tokens.mgg,
    available: '1000000',
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
    totalRaise: '0'
}

export default guildpad;
