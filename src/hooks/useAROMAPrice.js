import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import tokenAbi from '../web3/abi/CryptoChefsERC721Facet.json'

/**
 * Returns the current price of AROMA token
 *
 * @returns {undefined}
 */
export function useAROMAPrice() {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  const { account, library } = useEthers()
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

  }, [account, library, tokenAddress])

  return price
}

