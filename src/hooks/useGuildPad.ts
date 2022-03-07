import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { approve, approveWithAmount, buyBox, buyIgo, stake } from 'utils/callHelpers'
import { useTranslation } from 'contexts/Localization'
import {
  useCake,
  useCakeVaultContract,
  useIgoContract,
  useInoContract,
  useLottery,
  useMasterchef,
  useSousChef,
} from './useContract'
import useToast from './useToast'
import useLastUpdated from './useLastUpdated'
import { Address } from '../config/constants/types'

export const useBoxSold = (lpContract: Contract, contractAddress: Contract) => {
  //
}


export const useBuyBox = (contractAddress: string) => {
  const { account } = useWeb3React()
  const inoContract = useInoContract(contractAddress)

  const handleBuyBox = useCallback(
    async (rarity: string, quantity, contract?: Contract) => {
      const txHash = await buyBox(contract?? inoContract, rarity, account, quantity)
      console.info(txHash)
    },
    [account, inoContract],
  )

  return { onBuyBox: handleBuyBox }
}

export const useBuyIgo = (contractAddress: string) => {
  const { account } = useWeb3React()
  const igoContract = useIgoContract(contractAddress)

  const handleBuyIgo = useCallback(
    async (quantity, contract?: Contract) => {
      console.info(quantity)
      const txHash = await buyIgo(contract?? igoContract, account, quantity)
      console.info(txHash)
    },
    [account, igoContract],
  )

  return { onBuyIgo: handleBuyIgo }
}
