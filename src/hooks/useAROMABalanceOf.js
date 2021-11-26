import { useBalanceOf } from './useBalanceOf'
import { AROMA_DECIMALS, NETWORKS, TARGET_CHAIN } from '../web3/constants'
import tokenAbi from '../web3/abi/AROMATokenMatic.json'

/**
 * Returns the balance of an AROMA token for an address
 *
 * @param targetAccount
 * @returns {undefined}
 */
export function useAROMABalanceOf(targetAccount) {
  const tokenAddress = NETWORKS[TARGET_CHAIN].contractAroma;

  return useBalanceOf(tokenAbi, tokenAddress, AROMA_DECIMALS, targetAccount)
}

