import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from './types'

const GuildpadsLaunched: GuildpadConfig[] = [
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
  }
]

export default GuildpadsLaunched