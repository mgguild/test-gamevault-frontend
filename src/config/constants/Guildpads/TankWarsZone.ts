
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
    title: 'TankWars Zone',
    description: 'TANK WARS ZONE IS A METAVERSE-READY EXCITING AND VISUALLY REFRESHING ACTION GAME BUILT ON BLOCKCHAIN TECHNOLOGY.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.VESTING,
    status: STATE.upcoming,
    address: '0x001', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.mgg
}

export default guildpad