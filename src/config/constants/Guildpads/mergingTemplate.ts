import BigNumber from 'bignumber.js'
import { GuildpadConfig, GUILDPAD_STATUS, TYPE, DISTRIBUTION } from "../types";
import tokens from '../tokens';



const guildpad = {
    description: 'MERGING TEMPLATE',
    type: TYPE.INO,
    round: '1',
    distribution: DISTRIBUTION.AIRDROP,
    status: GUILDPAD_STATUS.completed,
    contractAddress: {
      97: '0x002',
      56: '0x002',
    },
    buyingCoin: tokens.wbnb,
    sellingCoin: tokens.mgg,
    inoDetails: {
        price: 'TBA',
    },
    date: {
        start: 'TBA',
        end: 'TBA'
    },
    hasEnded: true,
}

export default guildpad
