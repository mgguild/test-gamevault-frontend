import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useAppDispatch } from 'state'
import { MAINNET_CHAIN_ID } from 'config'
import { updateUserBalance, updateUserPendingReward } from 'state/actions'
import { soushHarvest, soushHarvestBnb, harvest, claim } from 'utils/callHelpers'
import { useLPStakingContract, useMasterchef, useSousChef } from './useContract'

export const useClaim = (stakingContract: string) => {
  const { account } = useWeb3React()
  const contract = useLPStakingContract(stakingContract)

  const handleClaim = useCallback(async () => {
    const txHash = await claim(contract, account)
    return txHash
  }, [account, contract])

  return { onReward: handleClaim }
}

export const useHarvest = (farmPid: number) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    return txHash
  }, [account, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useSousHarvest = (sousId, isUsingBnb = false) => {
  const dispatch = useAppDispatch()
  const { account, chainId } = useWeb3React()
  const sousChefContract = useSousChef(sousId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (sousId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingBnb) {
      await soushHarvestBnb(sousChefContract, account)
    } else {
      await soushHarvest(sousChefContract, account)
    }
    const chain = chainId ? chainId.toString() : MAINNET_CHAIN_ID
    dispatch(updateUserPendingReward(sousId, account, chain))
    dispatch(updateUserBalance(sousId, account, chain))
  }, [account, dispatch, isUsingBnb, masterChefContract, sousChefContract, sousId, chainId])

  return { onReward: handleHarvest }
}
