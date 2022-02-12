import { IGuildpad, STATE, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';

const socials = {
    website: 'https://www.tankwars.zone/',
    twitter: 'https://twitter.com/TankWarsZone',
    telegram: 'https://t.me/TankWarsZone',
    discord: 'https://discord.com/invite/82jCm7QyRA',
    medium: 'https://tankwarszone.medium.com/'
}
const guildpad: IGuildpad = {
    title: 'MGG',
    description: 'Lorem Ipsum',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.VESTING,
    status: STATE.active,
    address: '0x000', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.mgg,
    available: '1000000'
}

export default guildpad;
