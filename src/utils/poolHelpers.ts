import { Pool } from '../state/types'

const getPoolStatus = (pool: Pool) => {
  if (pool.comingSoon) {
    return 'COMING SOON...'
  }
  if (pool.isFinished) {
    return 'ENDED...'
  }

  return ''
}

// export const calcuLateApy = () => {
//
// }

export default getPoolStatus
