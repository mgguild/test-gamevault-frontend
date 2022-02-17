
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
    description: 'Tank wars zone is a metaverse-ready exciting and visually refreshing action game built on blockchain technology. Being the first blockchain game on Fantom & invested by the Fantom Foundation, the game will have very low transactions fees, the lowest time confirmations, and supportive communities for players. With various gameplays, you can play solo, or gather your friends, form a team, and battle with others while being able to earn money just by playing or staking your NFTs.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: STATE.upcoming,
    address: '0x001', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.TankWarsZone,
    inoDetails: {
        price: 'TBA',
        boxes: '300'
    },
    date: {
        start: 'February 18, 2022 1PM UTC',
        end: 'February 19, 2022 1PM UTC'
    }
}

export default guildpad