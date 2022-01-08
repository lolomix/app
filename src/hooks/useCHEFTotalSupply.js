import { useTokenTotalSupply } from './useTokenTotalSupply'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import abi from '../web3/abi/CryptoChefsERC721Facet.json'

/**
 * @returns {*}
 */
export function useCHEFTotalSupply () {
  const address = NETWORKS[TARGET_CHAIN].contractMaster

  return useTokenTotalSupply(address, abi)
}