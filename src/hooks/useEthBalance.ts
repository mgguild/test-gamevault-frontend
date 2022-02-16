import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
// eslint-disable-next-line import/no-unresolved
import useWeb3 from './useWeb3'
import useRefresh from './useRefresh'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useEthBalance = () => {
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const { slowRefresh } = useRefresh()
  const [ethBalance, setEthBalance] = useState(new BigNumber('0'))


  useEffect(() => {
    async function fetchEthBalance() {
      const balance = await web3.eth.getBalance(account)
      setEthBalance(new BigNumber(balance))
    }

    if (account) {
      fetchEthBalance()
    }
  }, [account, web3, slowRefresh])

  return ethBalance
}

export default useEthBalance
