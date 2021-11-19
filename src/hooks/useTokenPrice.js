import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

/**
 * @param tokenAbi
 * @param tokenAddress
 * @returns {undefined}
 */
export function useTokenPrice(tokenAbi, tokenAddress) {
  const { account, library } = useWeb3React()
  const [price, setPrice] = useState()

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadPrice() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);
        const price = await contract.methods.getAROMAPrice().call({ from: account });

        setPrice(price)

      } catch (e) {
        console.log(e);
      }
    }
    loadPrice();

  }, [account, library, tokenAbi, tokenAddress])

  return price
}

