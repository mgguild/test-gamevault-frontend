
import { IGuildpad, STATE, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';


const socials = {
    website: 'https://acknoledger.com/',
    twitter: 'https://twitter.com/acknoledger',
    telegram: 'https://t.me/acknoledgercommunity',
    medium: 'https://medium.com/@acknoledger'
}

const guildpad: IGuildpad = {
    title: 'Acknoledger',
    description: ' AcknoLedger is the NFT Search Engine for Metaverses & Gaming Platforms. It is a Global Consortium that maps, monetizes, and distributes Web 3.0 Digital Assets Seamlessly across all the Metaverses and Gaming NFTs.',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: STATE.upcoming,
    address: '0x003', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.acknoledger,
    inoDetails: {
        ratio: '1:1',
        price: '0.99'
    }
}

export default guildpad