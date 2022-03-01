import { DISTRIBUTION, GUILDPAD_STATUS, TYPE } from '../types'
import tokens from '../tokens'

const socials = {
  website: 'https://wizardia.io/',
  twitter: 'https://twitter.com/PlayWizardia',
  telegram: 'https://t.me/Wizardia',
  medium: 'https://medium.com/@wizardia'
}
const guildpad = {
  description: 'Wizardia is a Play-to-Earn online role-playing strategy game with unique NFTs at its core. It’s built on three core gameplay pillars: innovative turn-based combat, player-decision driven game evolution and upgrade-based character progression. $WZRD is the Solana-powered utility token that also acts as in-game currency and can be spent as well as earned or exchanged by every player inside and outside of the game. Wizardia rewards those who contribute to the game’s metaverse and its real-valued economy system so there are no one-way investments.',
  socials,
  type: TYPE.IGO,
  round: '1',
  distribution: DISTRIBUTION.VESTING,
  status: GUILDPAD_STATUS.upcoming,
  contractAddress: {
    97: '0x002',
    56: '0x002',
  },
  buyingCoin: tokens.busd,
  sellingCoin: tokens.Wizardia,
  inoDetails: {
    price: '$0.08'
  },
  date: {
    start: 'March 9, 2022 9PM UTC',
    end: 'March 10, 2022 9PM UTC'
  },
  // boxDetails:{
  //   redeemInfo: 'Mystery Box can be later redeemed for Tanks after the Game Official Launch.',
  //   rewardList: [ // made into array in case tokens & nfts are both rewards
  //     {
  //       description: 'There are 5 different tank rarity levels:',
  //       rarityLevels: [
  //         '5923 Common Tanks',
  //         '2200 Uncommon Tanks',
  //         '1100 Rare Tanks',
  //         '555 Epic Tanks',
  //         '222 Legendary Tanks',
  //       ]
  //     }
  //   ]
  // },
  // projectTokenEquivalent: '1425 WBOND',
  // asOfPriceInProjectToken: 1645362000000,
  epochEndDate: 1646946000000,
  nextRoundDate: 1646946000000
}

export default guildpad