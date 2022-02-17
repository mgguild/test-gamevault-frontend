
import { IGuildpad, STATE, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';


const socials = {
    website: 'https://demole.io/',
    twitter: 'https://twitter.com/demoleio',
    telegram: 'https://t.me/Demoleio',
    discord: 'https://discord.com/invite/demole',
    youtube: 'https://www.youtube.com/channel/UCs69Rvm26wDYf7-r3YX2Bzw'
}

const guildpad: IGuildpad = {
    title: 'Demole',
    description: 'Demole is a 3D Metaverse Game that allows players to walk through 3 different modes of the world Metaverse from Station, RPG, and MOBA.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: STATE.upcoming,
    address: '0x002', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.demole,
    inoDetails: {
        price: 'TBA',
    },
    date: {
        start: 'TBA',
        end: 'TBA'
    }
}

export default guildpad