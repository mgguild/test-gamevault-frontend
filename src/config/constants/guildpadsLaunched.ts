import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from './types'
import tokens from './tokens'

const GuildpadsLaunched: GuildpadConfig[] = [
  {
    id: 2,
    title: 'Ookeenga',
    isStatic: true,
    nextRoundID: 0,
    hasEnded: true,
    description:
      'Ookeenga (OKG) is 3D NFT gaming project which combines blockchain technology with breath-taking graphics, appealing world-building, and addictive gameplay to create a uniquely immersive play-to-earn experience developed by CROS Gamestudio and published by SPORES Network. OKG is set in a world where insects have evolved and built a massive civilization in an ancient forest called Glaik (The Sacred Forest), which divided into 2 factions: the Akhah (Pureblood) and the Ahika (Mixedblood).',
    socials: {
      website: 'https://ookeenga.io/',
      twitter: 'https://twitter.com/ookeenga',
      telegram: 'https://t.me/ookeenga_global',
      youtube: 'https://www.youtube.com/channel/UCqQpViSkkAq_aFP3hj3GL8w',
    },
    type: 'IGO',
    round: 'MERGED Ookeenga',
    distribution: DISTRIBUTION.VESTING,
    distributionDesc: '5% up-front at TGE, 3 month cliff, then quarterly vesting over 4 quarters',
    status: GUILDPAD_STATUS.completed,
    contractAddress: {
      56: '0x1858211ebb67b81cAa2ef740143a0D864B7339f3',
      97: '0x002',
    },
    vestingAddress: {
      97: '0x002',
      56: '0x682Eed4Ee750e23d80FDA04b7CA23b8D60C1487f',
    },
    buyingCoin: tokens.busd,
    sellingCoin: tokens.Ookeenga,
    igoDetails: {
      price: '0.04 USD',
      fundsTarget: '50,000 USD',
    },
    date: {
      start: 'March 25, 2022 1:00 PM UTC',
      end: 'March 27, 2022 1:00 PM UTC',
    },
    epochEndDate: 1648386000000,
    nextRoundDate: 1648299600000,
    totalSold: '1250003.3',
    totalRaise: '50000', // "49999.9887348728226"
    hasStarted: true,
    totalSupply: '1250000',
    boxInfo: {
      1: {
        price: '0',
        supply: '0',
        sold: '0',
      },
    },
    buyLimitEnabled: false,
    buyLimit: '0',
    startTime: '1648213080',
    totalParticipants: '20',
    expectedSales: '50000',
    remainingSupply: '0.281628179435',
    tokenRate: '0.04',
    percentage: '100.0000',
    display: true,
  },
  {
    id: 1,
    title: 'Wizardia',
    isStatic: true,
    nextRoundID: 0,
    description:
      'Wizardia is a Play-to-Earn online role-playing strategy game with unique NFTs at its core. It’s built on three core gameplay pillars: innovative turn-based combat, player-decision driven game evolution and upgrade-based character progression. $WZRD is the Solana-powered utility token that also acts as in-game currency and can be spent as well as earned or exchanged by every player inside and outside of the game. Wizardia rewards those who contribute to the game’s metaverse and its real-valued economy system so there are no one-way investments.',
    socials: {
      website: 'https://wizardia.co/35ObEcS',
      twitter: 'https://twitter.com/PlayWizardia',
      telegram: 'https://t.me/Wizardia',
      medium: 'https://medium.com/@wizardia',
    },
    type: TYPE.IDO,
    round: 'MERGED Wizardia',
    distribution: DISTRIBUTION.VESTING,
    distributionDesc: '20% TGE and 20% per month for next 4 months',
    status: GUILDPAD_STATUS.completed,
    contractAddress: {
      56: '0x76B5FE982860573B5a872eE1303b32a68c8CA4A6',
      97: '0x002',
    },
    vestingAddress: {
      97: '0x002',
      56: '0x2579635b510087F33b9FcC0085940558Ab95D7d6',
    },
    buyingCoin: tokens.busd,
    sellingCoin: tokens.Wizardia,
    igoDetails: {
      price: '0.12 USD',
      fundsTarget: '60,000 USD',
    },
    date: {
      start: 'March 9, 2022 1:00 PM UTC',
      end: 'March 11, 2022 1:00 PM UTC',
    },
    epochEndDate: 1647003600000,
    nextRoundDate: 1646917200000,
    totalSold: '500000', // "400808",
    totalRaise: '60000', // "48096.95852760736092",
    hasStarted: true,
    hasEnded: true,
    totalSupply: '500000',
    boxInfo: {
      1: {
        price: '0',
        supply: '0',
        sold: '0',
      },
    },
    buyLimitEnabled: false,
    buyLimit: '0',
    startTime: '1646830680',
    totalParticipants: '36',
    expectedSales: '60000',
    remainingSupply: '99192.012269938659000006',
    tokenRate: '0.12',
    percentage: '100', // "73.3226",
    display: true,
  },
  {
    id: 0,
    isStatic: true,
    title: 'TankWars Zone',
    nextRoundID: 0,
    description:
      'Tank wars zone is a metaverse-ready exciting and visually refreshing action game built on blockchain technology. Being the first blockchain game on Fantom & invested by the Fantom Foundation, the game will have very low transactions fees, the lowest time confirmations, and supportive communities for players. With various gameplays, you can play solo, or gather your friends, form a team, and battle with others while being able to earn money just by playing or staking your NFTs.',
    socials: {
      website: 'https://www.tankwars.zone/',
      twitter: 'https://twitter.com/TankWarsZone',
      telegram: 'https://t.me/TankWarsZone',
      discord: 'https://discord.com/invite/82jCm7QyRA',
      medium: 'https://tankwarszone.medium.com/',
    },
    type: TYPE.INO,
    round: 'completed',
    distribution: DISTRIBUTION.AIRDROP,
    status: GUILDPAD_STATUS.completed,
    contractAddress: {
      56: '0xf99869Fb775456e84Aa980f1fC104297694b8c47',
      97: '0xE673E67bD59A7390725ED98cBead9A5928F6f51E',
    },
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.TankWarsZone,
    inoDetails: {
      price: '0.3073',
      boxes: '300',
      priceFiat: '126 USD',
    },
    date: {
      start: 'February 18, 2022 1:00 PM UTC',
      end: 'February 19, 2022 1:00 PM UTC',
    },
    boxDetails: {
      redeemInfo: 'Mystery Box can be later redeemed for Tanks after the Game Official Launch.',
      rewardList: [
        {
          description: 'There are 5 different tank rarity levels:',
          rarityLevels: [
            '5923 Common Tanks',
            '2200 Uncommon Tanks',
            '1100 Rare Tanks',
            '555 Epic Tanks',
            '222 Legendary Tanks',
          ],
        },
      ],
    },
    projectTokenEquivalent: '1425 WBOND',
    asOfPriceInProjectToken: 1645362000000,
    epochEndDate: 1645362000000,
    nextRoundDate: 1645275600000,
    totalSold: '300',
    totalRaise: '92.19',
    hasStarted: true,
    hasEnded: true,
    totalSupply: '300',
    boxInfo: {
      1: {
        price: '0.3073',
        supply: '300',
        sold: '300',
        percentSold: '100',
      },
    },
    buyLimitEnabled: true,
    buyLimit: '5',
    whitelistEnabled: true,
    remainingSupply: '0',
    display: true,
  },
]

export default GuildpadsLaunched
