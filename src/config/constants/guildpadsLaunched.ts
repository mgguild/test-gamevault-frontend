import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from './types'

const GuildpadsLaunched: GuildpadConfig[] = [
  {
        id: 1,
        title: "Wizardia",
        isStatic: true,
        nextRoundID: 0,
        description: "Wizardia is a Play-to-Earn online role-playing strategy game with unique NFTs at its core. It’s built on three core gameplay pillars: innovative turn-based combat, player-decision driven game evolution and upgrade-based character progression. $WZRD is the Solana-powered utility token that also acts as in-game currency and can be spent as well as earned or exchanged by every player inside and outside of the game. Wizardia rewards those who contribute to the game’s metaverse and its real-valued economy system so there are no one-way investments.",
        socials: {
            website: "https://wizardia.co/35ObEcS",
            twitter: "https://twitter.com/PlayWizardia",
            telegram: "https://t.me/Wizardia",
            medium: "https://medium.com/@wizardia"
        },
        type: TYPE.IDO,
        round: "MERGED Wizardia",
        distribution: DISTRIBUTION.VESTING,
        distributionDesc: "20% TGE and 20% per month for next 4 months",
        status: GUILDPAD_STATUS.completed,
        contractAddress: {
            56: "0x76B5FE982860573B5a872eE1303b32a68c8CA4A6",
            97: "0x002"
        },
        vestingAddress: {
            97: '0x002',
            56: '0xf7fc784cE9a478686c0EF484263AeDDdAa70FDDa',
          },
        buyingCoin: {
            symbol: "BUSD",
            address: {
                56: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                97: ""
            },
            decimals: 18,
            projectLink: "https://www.paxos.com/busd/"
        },
        sellingCoin: {
            symbol: "WZRD",
            address: {
                56: "Wizardia",
                97: "Wizardia"
            },
            iconExtension: "png",
            decimals: 18,
            projectLink: "https://wizardia.io//"
        },
        igoDetails: {
            price: "0.12 USD",
            fundsTarget: "60,000 USD"
        },
        date: {
            start: "March 9, 2022 1:00 PM UTC",
            end: "March 11, 2022 1:00 PM UTC"
        },
        epochEndDate: 1647003600000,
        nextRoundDate: 1646917200000,
        totalSold:  "500000",  // "400808",
        totalRaise: "60000",  // "48096.95852760736092",
        hasStarted: true,
        hasEnded: true,
        totalSupply: "500000",
        boxInfo: {
            1: {
                price: "0",
                supply: "0",
                sold: "0"
            }
        },
        buyLimitEnabled: false,
        buyLimit: "0",
        startTime: "1646830680",
        totalParticipants: "36",
        expectedSales: "60000",
        remainingSupply: "99192.012269938659000006",
        tokenRate: "0.12",
        percentage: "100",  // "73.3226",
        display: true
  },
  {
      id: 0,
      isStatic: true,
      title: "TankWars Zone",
      nextRoundID: 0,
      description: "Tank wars zone is a metaverse-ready exciting and visually refreshing action game built on blockchain technology. Being the first blockchain game on Fantom & invested by the Fantom Foundation, the game will have very low transactions fees, the lowest time confirmations, and supportive communities for players. With various gameplays, you can play solo, or gather your friends, form a team, and battle with others while being able to earn money just by playing or staking your NFTs.",
      socials: {
          website: "https://www.tankwars.zone/",
          twitter: "https://twitter.com/TankWarsZone",
          telegram: "https://t.me/TankWarsZone",
          discord: "https://discord.com/invite/82jCm7QyRA",
          medium: "https://tankwarszone.medium.com/"
      },
      type: TYPE.INO,
      round: "completed",
      distribution: DISTRIBUTION.AIRDROP,
      status: GUILDPAD_STATUS.completed,
      contractAddress: {
          56: "0xf99869Fb775456e84Aa980f1fC104297694b8c47",
          97: "0xE673E67bD59A7390725ED98cBead9A5928F6f51E"
      },
      buyingCoin: {
          symbol: "BNB",
          projectLink: "https://www.binance.com/"
      },
      sellingCoin: {
          symbol: "TankWarsZone",
          address: {
              56: "tankwarszone",
              97: "tankwarszone"
          },
          iconExtension: "png",
          decimals: 18,
          projectLink: "https://www.tankwars.zone/"
      },
      inoDetails: {
          price: "0.3073",
          boxes: "300",
          priceFiat: "126 USD"
      },
      date: {
          start: "February 18, 2022 1:00 PM UTC",
          end: "February 19, 2022 1:00 PM UTC"
      },
      boxDetails: {
          redeemInfo: "Mystery Box can be later redeemed for Tanks after the Game Official Launch.",
          rewardList: [
              {
                  description: "There are 5 different tank rarity levels:",
                  rarityLevels: [
                      "5923 Common Tanks",
                      "2200 Uncommon Tanks",
                      "1100 Rare Tanks",
                      "555 Epic Tanks",
                      "222 Legendary Tanks"
                  ]
              }
          ]
      },
      projectTokenEquivalent: "1425 WBOND",
      asOfPriceInProjectToken: 1645362000000,
      epochEndDate: 1645362000000,
      nextRoundDate: 1645275600000,
      totalSold: "300",
      totalRaise: "92.19",
      hasStarted: true,
      hasEnded: true,
      totalSupply: "300",
      boxInfo: {
          1: {
              price: "0.3073",
              supply: "300",
              sold: "300",
              percentSold: "100"
          }
      },
      buyLimitEnabled: true,
      buyLimit: "5",
      whitelistEnabled: true,
      remainingSupply: "0",
      display: true
  },
]

export default GuildpadsLaunched