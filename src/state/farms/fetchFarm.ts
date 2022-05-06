import { Farm } from 'state/types'
import fetchPublicFarmData from './fetchPublicFarmData'

const fetchFarm = async (farm: Farm, chain: string): Promise<Farm> => {
  const farmPublicData = await fetchPublicFarmData(farm, chain)

  return { ...farm, ...farmPublicData }
}

export default fetchFarm
