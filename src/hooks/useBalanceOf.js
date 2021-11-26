import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

/**
 * Returns the current price of an ERC20 token
 *
 * @param tokenAbi
 * @param tokenAddress
 * @param tokenDecimals
 * @param targetAccount
 * @returns {undefined}
 */
export function useBalanceOf(tokenAbi, tokenAddress, tokenDecimals, targetAccount) {
  const { account, library } = useWeb3React()
  const [balance, setBalance] = useState()

  targetAccount = targetAccount ?? account

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadPrice() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);
        const balance = await contract.methods.balanceOf(targetAccount).call({ from: account });

        setBalance(balance / tokenDecimals)

      } catch (e) {
        console.log(e);
      }
    }
    loadPrice();

  }, [account, library, tokenAbi, tokenAddress, tokenDecimals, targetAccount])

  return balance
}

