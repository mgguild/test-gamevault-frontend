import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { approve, approveWithAmount } from 'utils/callHelpers'
import { useTranslation } from 'contexts/Localization'
import { useCake, useCakeVaultContract, useLottery, useSousChef } from './useContract'
import useToast from './useToast'
import useLastUpdated from './useLastUpdated'

export const useBoxSold = (lpContract: Contract, contractAddress: Contract) => {
  const { account } = useWeb3React()
  const handleApprove = useCallback(async () => {
    try {
      return await approve(lpContract, contractAddress, account)
    } catch (e) {
      return false
    }
  }, [account, lpContract, contractAddress])

  return { onApprove: handleApprove }
}


// Approve an IFO
export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
  const { account } = useWeb3React()
  const onApprove = useCallback(async () => {
    const tx = await tokenContract.methods.approve(spenderAddress, ethers.constants.MaxUint256).send({ from: account })
    return tx
  }, [account, spenderAddress, tokenContract])

  return onApprove
}
