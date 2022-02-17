import BigNumber from 'bignumber.js'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';


const socials = {
    website: 'https://acknoledger.com/',
    twitter: 'https://twitter.com/acknoledger',
    telegram: 'https://t.me/acknoledgercommunity',
    medium: 'https://medium.com/@acknoledger'
}

const guildpad: GuildpadConfig = {
    id: 4,
    title: 'Acknoledger',
    description: ' AcknoLedger is the NFT Search Engine for Metaverses & Gaming Platforms. It is a Global Consortium that maps, monetizes, and distributes Web 3.0 Digital Assets Seamlessly across all the Metaverses and Gaming NFTs.',
    // date: 'February 15, 2022  1:00 PM UTC',
    socials,
    type: TYPE.INO,
    distribution: DISTRIBUTION.AIRDROP,
    status: GUILDPAD_STATUS.upcoming,
    contractAddress: {
      97: '0x003',
      56: '0x003',
    },
    buyingCoin: tokens.wbnb,
    sellingCoin: tokens.acknoledger,
    inoDetails: {
        ratio: '1:1',
        price: '0.99'
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
    buyLimit: '0',
}

export default guildpad
