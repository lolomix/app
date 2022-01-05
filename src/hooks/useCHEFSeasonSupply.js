import { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import tokenAbi from '../web3/abi/CryptoChefsERC721Facet.json'

/**
 * Returns the total amount of CHEFs in the Season.
 *
 * @returns {undefined}
 */
export function useCHEFSeasonSupply() {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  const { account, library } = useEthers()
  const [seasonSupply, setSeasonSupply] = useState()

  useEffect(() => {

    // early return if no connection to blockchain
    if (!account || !library) {
      return
    }

    async function loadSeasonSupply() {
      try {
        const contract = new library.eth.Contract(tokenAbi, tokenAddress);
        const seasonSupply = await contract.methods.getCryptoChefSeasonSupply().call();

        setSeasonSupply(seasonSupply)

      } catch (e) {
        console.log(e);
      }
    }
    loadSeasonSupply();

  }, [account, library, tokenAddress])

  return seasonSupply
}

