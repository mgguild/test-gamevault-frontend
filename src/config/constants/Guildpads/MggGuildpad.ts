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
      56: '0xfE0DcaF0C01FE4f839A08450F6c402af5e055139',
    },
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.mgg,
    available: '100',
    epochEndDate: 1645246800000,
}

export default guildpad;
