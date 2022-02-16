import { GuildpadConfig } from 'config/constants/types'
import fetchGuildpad from './fetchGuildpad'
import { isAddress } from '../../utils'
import { getAddress } from '../../utils/addressHelpers'

const fetchGuildpads = async (guildpadsToFetch: GuildpadConfig[]) => {
  const data = await Promise.all(
    guildpadsToFetch.map(async (guildpadConfig) => {

      if (isAddress(getAddress(guildpadConfig.contractAddress))) {
        const guildpad = await fetchGuildpad(guildpadConfig)
        return guildpad
      }

      return guildpadConfig
    }),
  )
  return data
}

export default fetchGuildpads
