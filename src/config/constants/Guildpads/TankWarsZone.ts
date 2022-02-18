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
  distribution: DISTRIBUTION.AIRDROP,
  status: GUILDPAD_STATUS.ongoing,
  contractAddress: {
    97: '0xE673E67bD59A7390725ED98cBead9A5928F6f51E',
    56: '0xf99869Fb775456e84Aa980f1fC104297694b8c47',
  },
  buyingCoin: tokens.wbnb,
  sellingCoin: tokens.TankWarsZone,
  inoDetails: {
    price: 'TBA',
    boxes: '300',
  },
  date: {
    start: 'February 18, 2022 1PM UTC',
    end: 'February 19, 2022 1PM UTC'
  },
  boxDetails:{
    redeemInfo: 'Mystery Box can be later redeemed for Tanks after the Game Official Launch.',
    rewardList: [ // made into array in case tokens & nfts are both rewards
      {
        description: 'There are 5 different tank rarity levels:',
        rarityLevels: [
          '5923 Common Tanks',
          '2200 Uncommon Tanks',
          '1100 Rare Tanks',
          '555 Epic Tanks',
          '222 Legendary Tanks',
        ]
      }
    ]
  },
  epochEndDate: 1645246800000,
  nextRoundDate: 1645275600000
}

export default guildpad
