
import { IGuildpad, STATE } from "../types";
import tokens from '../tokens';

const guildpad: IGuildpad = {
    title: 'MGG',
    description: 'Lorem Ipsum',
    distribution: 'vesting',
    status: STATE.active,
    address: '0x001', // Contract address
    buyingCoin: tokens.bnb,
    sellingCoin: tokens.mgg
}

export default guildpad