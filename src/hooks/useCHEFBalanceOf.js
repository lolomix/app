import { useBalanceOf } from './useBalanceOf'
import { NETWORKS, TARGET_CHAIN } from '../web3/constants'
import tokenAbi from '../web3/abi/CryptoChefsERC721Facet.json'

/**
 * Returns the balance of an CHEF NFTs for an address
 *
 * @param targetAccount
 * @returns {undefined}
 */
export function useCHEFBalanceOf(targetAccount) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractMaster;

  return useBalanceOf(tokenAbi, tokenAddress, null, targetAccount)
}

