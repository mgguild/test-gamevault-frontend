import { useEffect, useState } from 'react'
import { SPARKSWAP_API, API_ASSETS, API_SUMMARY, API_LIQUIDITY, API_LASTPRICE, API_DATA } from 'config'
import useWeb3 from 'hooks/useWeb3'
import BigNumber from 'bignumber.js/bignumber'
import { getBalanceNumber } from 'utils/formatBalance'

export const usePoolPrice = (stakingTokenAddress: string, rewardTokenAddress: string) => {
    const [stakingPrice, setStakingPrice] = useState(0)
    const [rewardPrice, setRewardPrice] = useState(0)

    const web3 = useWeb3()
    let _stakingTokenAddress
    let _rewardTokenAddress
    try{
        _stakingTokenAddress = web3.utils.toChecksumAddress(stakingTokenAddress)
        _rewardTokenAddress = web3.utils.toChecksumAddress(rewardTokenAddress)
    }
    catch{
        console.error('Invalid staking and reward address')
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            let assets = await fetch(SPARKSWAP_API.concat(API_ASSETS))
            assets = await assets.json();
            const lastPrice = "last_price"
            
            setStakingPrice(assets[_stakingTokenAddress][lastPrice])
            setRewardPrice(assets[_rewardTokenAddress][lastPrice])
        } catch (error) {
          console.error('Unable to fetch data:', error)
        }
      }
  
      fetchData()
    }, [setStakingPrice, setRewardPrice,_stakingTokenAddress, _rewardTokenAddress])

    return {stakingPrice, rewardPrice}
}

export const useFarmPrice = (lpTotalSupply: number, token1Address: string, token2Address: string, rewardTokenAddress: string, stakingAddress: string, token1Balance: BigNumber, token2Balance: BigNumber) => {
    const [LPPrice, setLPPrice] = useState(0)
    const [rewardPrice, setRewardPrice] = useState(0)

    const web3 = useWeb3()
    let _token1Address
    let _token2Address
    let _rewardTokenAddress
    let _stakingAddress
    try{
        _token1Address = web3.utils.toChecksumAddress(token1Address)
        _token2Address = web3.utils.toChecksumAddress(token2Address)
        _rewardTokenAddress = web3.utils.toChecksumAddress(rewardTokenAddress)
        _stakingAddress = web3.utils.toChecksumAddress(stakingAddress)
    }
    catch{
        console.error('Invalid staking and reward address')
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            let assetsRewardToken = await fetch(SPARKSWAP_API.concat(API_ASSETS,"/",_rewardTokenAddress))
            assetsRewardToken = await assetsRewardToken.json()

            let assetsToken1 = await fetch(SPARKSWAP_API.concat(API_ASSETS,"/",_token1Address))
            assetsToken1 = await assetsToken1.json()

            let assetsToken2 = await fetch(SPARKSWAP_API.concat(API_ASSETS,"/",_token2Address))
            assetsToken2 = await assetsToken2.json()

            console.log(_token1Address.concat("-",getBalanceNumber(token1Balance, 18).toString()))
            const pairLiquidity = ( getBalanceNumber(token1Balance, 18) * assetsToken1[API_DATA][API_LASTPRICE] ) + ( getBalanceNumber(token2Balance, 18) * assetsToken2[API_DATA][API_LASTPRICE] )

            setLPPrice( pairLiquidity / getBalanceNumber(new BigNumber(lpTotalSupply), 18)  )
            setRewardPrice(assetsRewardToken[API_DATA][API_LASTPRICE])
        } catch (error) {
          console.error('Unable to fetch data:', error)
        }
      }
  
      fetchData()
    }, [setLPPrice, setRewardPrice, lpTotalSupply, _token1Address, _token2Address, _rewardTokenAddress, _stakingAddress, token1Balance, token2Balance])

    return {LPPrice, rewardPrice}
}

export default usePoolPrice