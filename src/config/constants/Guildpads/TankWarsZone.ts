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
    description: 'Tank wars zone is a metaverse-ready exciting and visually refreshing action game built on blockchain technology. Being the first blockchain game on Fantom & invested by the Fantom Foundation, the game will have very low transactions fees, the lowest time confirmations, and supportive communities for players. With various gameplays, you can play solo, or gather your friends, form a team, and battle with others while being able to earn money just by playing or staking your NFTs.',
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
    rewardInfo:[
      {
        description: 'There are 5 different tank rarity levels:',
        list: [
          '5923 Common Tanks',
          '2200 Uncommon Tanks',
          '1100 Rare Tanks',
          '555 Epic Tanks',
          '222 Legendary Tanks',
        ]
      }
    ],
    totalSold: '0',
    totalRaise: '0',
    buyLimitEnabled: false,
    buyLimit: '0'
}

export default guildpad
