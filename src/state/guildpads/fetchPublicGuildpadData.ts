import { getAddress } from 'utils/addressHelpers'
import { Guildpad } from '../types'
import { isAddress } from '../../utils'
import fetchINODetails, { fetchIDODetails } from './guildpadDataHelpers'


const fetchPublicGuildpadData = async (guildpad: Guildpad) => {
  const { contractAddress } = guildpad
  const guildpadAddress = getAddress(contractAddress)

  if (!isAddress(guildpadAddress)) {
    return guildpad
  }

  let data = {}

  switch (guildpad.type) {
    case 'IDO':
      data = await fetchIDODetails(guildpad)
      break
    case 'IGO':
      return guildpad
      break
    default:
      data = await fetchINODetails(guildpad)
  }
  return {
    ...data,
  }
}

export default fetchPublicGuildpadData
