import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'

/**
 * Returns the total amount of tokens stored by the contract.
 *
 * @param tokenAbi
 * @param tokenAddress
 * @returns {undefined}
 */
export function useTokenTotalSupply(tokenAbi, tokenAddress) {
  const { account, library } = useEthers()
  const [totalSupply, setTotalSupply] = useState()

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadTotalSupply() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);
        const totalSupply = await contract.methods.totalSupply().call();

        setTotalSupply(totalSupply)

      } catch (e) {
        console.log(e);
      }
    }
    loadTotalSupply();

  }, [account, library, tokenAbi, tokenAddress])

  return totalSupply
}

